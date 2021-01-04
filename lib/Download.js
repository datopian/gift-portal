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

}