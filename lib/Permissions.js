import jsonwebtoken from 'jsonwebtoken'
import { initializeApollo } from "./apolloClient"
import { PERMISSIONS } from './queries'

require('dotenv').config()

export default class Permissions{
  
  constructor(initialApolloState){
    this.apolloClient = initializeApollo(initialApolloState)
    this.defaultOrg = process.env.NEXT_PUBLIC_ORG_NAME
    this.datasets = (async ()=> {
      const repos = await this.apolloClient.readQuery({ query: PERMISSIONS })
      return this._parserPermissions(repos)
    })
  }
  
  /**
   * 
   * @param {String} dataset - Dataset name to be validated
   * @param {String} requestScope - Scope requested
   * @param {String} org - Organization/Owner dataset owner 
   */
  isValidScope(dataset, requestScope, org= this.defaultOrg){
    const validScopes = ['read', 'write', 'admin']
    if(!validScopes.includes(requestScope)) {
      throw new Error(
        // eslint-disable-next-line max-len
        `Invalid scope. Scope should be of "${org}/${dataset}:read/write/admin"`
      )
    }
  }

  /**
   * 
   * @param {Object} repoInfo - Repository Info 
   * @param {String} permission - permission to be filtered 
   */
  _filterRepoPermissions(repoInfo, permission){
    
    const array = []
    repoInfo.collaborators.edges.filter(userObject => {
      if(permission === 'READ'){
        if(userObject.permission === 'READ' || 
          userObject.permission === 'WRITE'|| 
          userObject.permission === 'ADMIN') array.push(userObject.node.login)
      }
      if(permission === 'WRITE'){
        if(userObject.permission === 'WRITE' || 
          userObject.permission === 'ADMIN') array.push(userObject.node.login)
      }
      if(permission === 'ADMIN'){
        if(userObject.permission === 'ADMIN') array.push(userObject.node.login)
      }

    })

    return array
  }

  /**
   * 
   * @param {Object} repos - Repository List 
   */
  _parserPermissions(repos){
    const repoList = repos.organization.repositories.nodes
    const parsedRepos = repoList.map(repo => {
      const repository = {
        dataset: repo.name,
        readers: this._filterRepoPermissions(repo, 'READ'),
        editors: this._filterRepoPermissions(repo, 'WRITE'),
        admins: this._filterRepoPermissions(repo, 'ADMIN')
      }

      if(!repo.isPrivate) repository.readers.unshift('PUBLIC', 'LOGGED_IN')
     
      return repository
    })
    
    return parsedRepos
  }



  /**
   * 
   * @param {String} user - username to check permission 
   * @param {String} dataset - dataset to check permission
   * @param {String} permission permission : read/write/delete
   */
  async userHasPermission(user, dataset, permission){
    const datasets = await this.datasets()
    const repo = datasets.find(item => item.dataset === dataset)
    if(!dataset) {
      throw new Error('Dataset not found.')
    }
    switch(permission){
    case 'read': 
      return repo.readers.includes(user)
    case 'write': 
      return repo.editors.includes(user)
    case 'delete': 
      return repo.admins.includes(user)
    }
  }



  /**
 * 
 * @param {String} dataset - Dataset to be found inside list 
 */
  async getDataset(dataset){
    try{
      const datasets = await this.datasets()
      const info =  datasets.find(item => item.dataset === dataset)
  
      if(!info){
        throw new Error('Invalid Dataset')
      }
  
      return info
    }
    catch(error){
      throw new Error(`Error on getDataset Information: ${error.message}`)
    }
  }

  /**
 * 
 * @param {Object} data - Information to be add to encrypt token 
 */
  generateToken(data){
    return jsonwebtoken.sign(
      data, 
      process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), { algorithm: 'RS256'}
    )
  }

  generateExpiresDate(){
    const now = new Date()
    const expiresDate = now.setSeconds(now.getSeconds() + 900)
    return new Date(expiresDate).toISOString()
  }

  /**
 * 
 * @param {String} user - username that will request token
 * @param {String} dataset - dataset to check permissions 
 * @param {String} scope - scope selected inside dataset
 * @param {String} org - organization/user dataset owner
 */
  async authorize(user, dataset, scope, org = this.defaultOrg){
    try{

      this.isValidScope(dataset, scope)
      
      const datasetScopes = this.getDataset(dataset)
      
      let scopesFiltered = []
      
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
    catch(error){
      throw new Error(`Error on Authorize: ${error.message}`)
    }

  }
}
  

