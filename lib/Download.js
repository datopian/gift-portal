import { Client } from 'giftless-client'
import Permissions from './Permissions'
import Github from './Github'

require('dotenv').config()

export default class Download{
  
  constructor(){
    this.defaultOrg = process.env.GITHUB_ORG
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
    const datasetInfo = this.permissions.getDataset(dataset)
    const hasPermission = datasetInfo.readers.includes('PUBLIC') ||
      datasetInfo.readers.includes(username)
    
    return hasPermission
  }

  /**
   * 
   * @param {String} resourceId resource:sha256 + size 
   */
  parseResourceId(resourceId){
    const resource = resourceId.slice(0, 64)
    const size = parseInt(resourceId.slice(64))
    
    return { 
      resource,
      size
    }
  }
  

  /**
   * 
   * @param {String} resource - resource file object 
   */
  parserResourceFile(resource){
    const oidRegex = new RegExp(/(?<=sha256:).*?($)/gmi)
    const sizeRegex = new RegExp(/(?<=size ).*?($)/gmi)

    const oid = oidRegex.exec(resource)[0]
    const size = parseInt(sizeRegex.exec(resource)[0])

    return {
      oid, size
    }
  }  

  /**
   * 
   * @param {String} content base64 string given by github api 
   */
  parserLfsServerInfo(content){
    const urlRegex = new RegExp(/(?<=url = )(?:\/\/|[^/]+)*/gmi)
    const lfsYml =  Buffer.from(content, 'base64').toString()
    const url = urlRegex.exec(lfsYml)[0]
    return url
  }
  
  /**
   * 
   * @param {String} dataset - dataset to retrieve lfs server info
   * @param {String} org - dataset organization owner
   */
  async getLfsServer(dataset, org = this.defaultOrg){
    const path = `/repos/${org}/${dataset}/contents/.lfsconfig`
    const lfsServerInfo = await this.github.restRequest(path)
    
    return lfsServerInfo
  }

  /**
   * 
   * @param {String} dataset - dataset name
   * @param {String} resourcePath - resource full path
   * @param {String} resourceName - resource file name
   * @param {String} org - organization name
   */
  async getDatasetMetadata(
    dataset, 
    resourcePath, 
    resourceName, 
    org = this.defaultOrg
  ){
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
  

  /**
   * 
   * @param {String} dataset - dataset name 
   * @param {String} resource - resource file name
   * @param {String} org - organization name
   */
  async getResourceMetadata(dataset, resource, org = this.defaultOrg){
    const resourcePath = resource.split('/')
    if(resourcePath.length > 1){
      return this.getDatasetMetadata(dataset, resource, resourcePath[0], org)
    }else {
      return this.getDatasetMetadata(dataset, resource, null, org)
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

    const client = new Client(lfsServer, token)
    const prefix = `${this.defaultOrg}/${dataset}`
    const resourceObjects = [this.parseResourceId(resourceId)]
    const resourceData = await client.batch(
      prefix, 
      'download', 
      resourceObjects
    )

    return resourceData.data
  }
  
  async getUrl(){
   
  }

}