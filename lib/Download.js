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
  
  async getUrl(){
   
  }

}