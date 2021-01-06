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

 

}