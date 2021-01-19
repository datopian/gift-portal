import { Client } from 'giftless-client'
import Permissions from './Permissions'
import Github from './Github'

require('dotenv').config()

export default class Download{
  
  constructor(){
    this.defaultOrg = process.env.ORGANISATION_REPO
    this.permissions = new Permissions()
    this.lfsServer = process.env.LFS_SERVER
    this.github = new Github()
    
  }

  /**
   * 
   * @param {String} dataset 
   * @param {String} username 
   */
  checkDatasetPermission(dataset, username){
    try{ 
      const datasetInfo = this.permissions.getDataset(dataset)
      const hasPermission = datasetInfo.readers.includes('PUBLIC') ||
      datasetInfo.readers.includes(username)
    
      return hasPermission
    }catch(error) {
      throw new Error(`Error on check Dataset Permission: ${error.message}`)
    }
  }

  /**
   * 
   * @param {String} resourceId resource:sha256 + size 
   */
  _parseResourceId(resourceId){
    try{
      const oid = resourceId.slice(0, 64)
      const size = parseInt(resourceId.slice(64))
    
      return { 
        oid,
        size
      }
    }
    catch(error){
      throw new Error(`Error on parser resource id: ${error.message}`)
    }
  }
  

  /**
   * 
   * @param {String} resource - resource file object 
   */
  parserResourceFile(resource){
    try{
      const oidRegex = new RegExp(/(?<=sha256:).*?($)/gmi)
      const sizeRegex = new RegExp(/(?<=size ).*?($)/gmi)

      const oid = oidRegex.exec(resource)[0]
      const size = parseInt(sizeRegex.exec(resource)[0])

      return {
        oid, size
      }
    }
    catch(error){
      throw new Error(`Error on parser Resource file: ${error.message}`)
    }
  }  

  /**
   * 
   * @param {String} content base64 string given by github api 
   */
  parserLfsServerInfo(content){
    try{
      const urlRegex = new RegExp(/(?<=url = )(?:\/\/|[^/]+)*/gmi)
      const lfsYml =  Buffer.from(content, 'base64').toString()
      const url = urlRegex.exec(lfsYml)[0]
      return url
    }
    catch(error){
      throw new Error(`Error on parser LFS Server: ${error.message}`)
    }
  }
  
  /**
   * 
   * @param {String} dataset - dataset to retrieve lfs server info
   * @param {String} org - dataset organization owner
   */
  async _getLfsServer(dataset, org = this.defaultOrg){
    try{
      const path = `/repos/${org}/${dataset}/contents/.lfsconfig`
      const lfsServerInfo = await this.github.restRequest(path)
    
      return lfsServerInfo
    }
    catch(error){
      throw new Error(`Error on get Lfs server info: ${error.message}`)
    }
  }

  /**
   * 
   * @param {String} dataset - dataset name
   * @param {String} resourcePath - resource full path
   * @param {String} resourceName - resource file name
   * @param {String} org - organization name
   */
  async _getDatasetMetadata(
    dataset, 
    resourcePath, 
    resourceName, 
    org = this.defaultOrg
  ){
   
    try{
      const resourceUrl = 
        `/repos/${org}/${dataset}/contents/${resourceName || ''}`
      const dataInfo = await this.github.restRequest(resourceUrl)
      const resourceInfo = dataInfo.find(item => item.path === resourcePath)
      if(resourceInfo) {
        const resourceBlob = 
        await this.github.restRequest(
          `/repos/${org}/${dataset}/git/blobs/${resourceInfo.sha}`
        )
        const content = Buffer.from(resourceBlob.content, 'base64').toString()
        return content
      }
    } 
    catch(error){
      throw new Error(`Error on get dataset metadata: ${error.message}`)
    }
  }
  

  /**
   * 
   * @param {String} dataset - dataset name 
   * @param {String} resource - resource file name
   * @param {String} org - organization name
   */
  async getResourceMetadata(dataset, resource, org = this.defaultOrg){
    try{
      const resourcePath = resource.split('/')
      if(resourcePath.length > 1){
        return this._getDatasetMetadata(
          dataset, 
          resource, 
          resourcePath[0], 
          org
        )
      }else {
        return this._getDatasetMetadata(dataset, resource, null, org)
      }
    }
    catch(error){
      throw new Error(`Error on get resource metadata: ${error.message}`)
    }
  }
  
  /**
   * 
   * @param {String} dataset dataset name
   * @param {String} resourceId resource string  = sha256 + size
   * @param {String} token user token
   */
  async getResourceDownloadUrl(
    dataset, 
    resourceId,
    lfsServer = this.lfsServer, 
    token ){
    try{
      const client = new Client(lfsServer, token)
      const prefix = `${this.defaultOrg}/${dataset}`
      const resourceObjects = [this._parseResourceId(resourceId)]
      const resourceData = await client.batch(
        prefix, 
        'download', 
        resourceObjects
      )
  
      return resourceData.data
    }
    catch(error){
      throw new Error(`Error on get resource download url: ${error.message}`)
    }
  }
  
  async getUrl(dataset, resourceId, username){
    try{
      const tokenData = { dataset, resourceId, username}
      const [token, lfsServer] = await Promise.all([
        this.permissions.generateToken(tokenData), 
        this._getLfsServer(dataset)
      ])
      const resourceUrl = await this.getResourceDownloadUrl(
        dataset, 
        resourceId, 
        lfsServer, 
        token
      )
      return resourceUrl.objects[0].actions.download.href
    }
    catch(error){
      throw new Error(`Error on get direct url: ${error.message}`)
    }
  }

}