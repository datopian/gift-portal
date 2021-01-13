import Github from './Github'
import * as metastore from 'metastore-lib-js'


require('dotenv').config()

export default class Metadata{
  constructor(){
    this.github = new Github()
  }

 
  async createMetadata(objectId, userInfo, metadata, description){
    try{
      const user = { name: userInfo.name, email: userInfo.email}
      const config = {
        defaultAuthor: user, 
        token: userInfo.access_token,
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

  
  
}