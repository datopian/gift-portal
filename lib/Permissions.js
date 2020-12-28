import jsonwebtoken from 'jsonwebtoken'
import datasets from '../data/datasets.json'
require('dotenv').config()

export default class Permissions{
  
  constructor(){
    this.defaultOrg = process.env.GITHUB_ORG
  }
  /**
   * 
   * @param {String} requestScope - repository scope requested
   */
  isValidScope(dataset, requestScope, org= this.defaultOrg){
   const validScopes = ['read', 'write', 'admin']
    if(!validScopes.includes(requestScope)) {
      throw new Error(`Invalid scope. Scope should be of form "${org}/${dataset}:read/write/admin"`)
    }
  }

  getDataset(dataset){
    const info =  datasets.find(item => item.dataset === dataset)

    if(!info){
      throw new Error('Invalid Dataset')
    }

    return info
  }

  generateToken(data){
    return jsonwebtoken.sign(data, process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), { algorithm: 'RS256'})
  }

  generateExpiresDate(){
    const now = new Date()
    const expiresDate = now.setSeconds(now.getSeconds() + 900)
    return new Date(expiresDate).toISOString()
  }

  async authorize(user, dataset, scope, org = this.defaultOrg){
    this.isValidScope(dataset, scope)
    
    const datasetScopes = this.getDataset(dataset)
    
    let scopesFiltered = []
    let responseScope = ''
    if(scope === 'read'){
      if(datasetScopes.readers.includes(user)) scopesFiltered.push('read')
    }
    if(scope === 'write'){
       if(datasetScopes.editors.includes(user)) scopesFiltered.push('write')
    }
    if(scope === 'admins') {
      if(datasetScopes.admins.includes(user)) scopesFiltered.push('admin')
    }
    
    if(!scopesFiltered.includes(scope)){
      throw new Error('This user cannot perform this operation.')
    }

    const token = this.generateToken({user, dataset, scope})
    return {
      success: true,
      result: {
        requested_scopes: [`obj:${org}/${dataset}/*.${scope}`],
        granted_scopes: [`obj:${org}/${dataset}/*.${scope}`],
        token,
        user_id: user,
        expires_at: this.generateExpiresDate()
      }
    }

  }
}
  

