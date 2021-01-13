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
      if(!this.permissions.userHasPermission(
        userInfo.username, 
        objectId, 
        'write')) {
        throw new Error('Unauthorized')
      }
      
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