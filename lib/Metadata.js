import Github from './Github'
import Permissions from './Permissions'
import * as metastore from 'metastore-lib-js'


require('dotenv').config()

export default class Metadata{
  constructor(){
    this.github = new Github()
    this.permissions = new Permissions()
  }

 
  async createMetadata(objectId, userInfo, metadata, description){
    try{
     
      const user = { name: userInfo.name, email: userInfo.email}
      const config = {
        defaultAuthor: user, 
        token: process.env.GITHUB_APIKEY,
        org: process.env.GITHUB_ORG
      }
      const storage =  metastore.createMetastore('github', config)

      const response = await  storage.create({
        objectId,
        metadata,
        defaultAuthor: user,
        description,
      
      })

      return response
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async updateMetadata(objectId, userInfo, metadata, readMe){
    const user = { name: userInfo.name, email: userInfo.email}
    const config = {
      defaultAuthor: user, 
      token: process.env.GITHUB_APIKEY,
      org: process.env.GITHUB_ORG
    }
    const storage =  metastore.createMetastore('github', config)

    const response = await storage.update({ objectId, metadata, readMe})

    return response
  }

  
  
}