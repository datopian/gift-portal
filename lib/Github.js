/* eslint-disable max-len */
import axios from 'axios'

require('dotenv').config()

export default class Github{
  constructor(){
    this.token = process.env.APP_GITHUB_KEY
    this.defaultOrg = process.env.NEXT_PUBLIC_ORG_NAME
  }
  
  /**
   * 
   * @param {String} route - route to use on Github REST API
   */
  async restRequest(route){
    return axios({
      method: 'get',
      url: `https://api.github.com${route}`,
     
      headers: { 'Authorization': `bearer ${this.token}`}
    }).then(data => data.data)
      .catch(error => {
        throw new Error(`Error on REST API Request: ${error.message}`)
      })
  }

  /**
   * 
   * @param {String} query - GraphQl query  
   */
  async graphQlRequest(query){
    const response = await axios({
      method: 'post',
      url: 'https://api.github.com/graphql',
      headers: {
        'Authorization': `bearer ${this.token}`
      },
      data: {
        query
      }
    }).then(data => data.data)
      .catch(error => {
        throw new Error(`Error on GraphQl API Request: ${error.message}`)
      })


    return response
  }

  /**
   * 
   * @param {String} org - Github organization name 
   * @param {String} repo - Github repository name
   */
  async getRepositoryCollaborators(repo, org = this.defaultOrg){
    const route = `/repos/${org}/${repo}/collaborators`
    const response = await this.restRequest(route)
  
    return response
  }
  
  /**
   * 
   * @param {String} repo - Repository to retrieve information 
   * @param {*} org - organization/user repository owner
   */
  async getRepositoryInformation(repo, org = this.defaultOrg, ){
    const route = `/repos/${org}/${repo}`
    const response = await this.restRequest(route)
  
    return response
  }

  /**
 * 
 * @param {String} repo - Repository to get Information and Collaborators 
 * @param {String} org - Organization/Ower owner of the repository 
 */
  async getScopes(repo, org = this.defaultOrg){
    try{

      const [repoInfo, collaborators] = await Promise.all([
        this.getRepositoryInformation(repo, org), 
        this.getRepositoryCollaborators(repo, org)
      ])
      
      const isPrivate = repoInfo.private
  
      const scope = {
        readers: [],
        editors: [],
        admins: []
      }
  
      if(!isPrivate){
        scope.readers.push(...['PUBLIC', 'LOGGED_IN'])
      }
  
      collaborators.map(user => {
        if(user.permissions.pull) scope.readers.push(user.login) 
        if(user.permissions.push) scope.editors.push(user.login)
        if(user.permissions.admin) scope.admins.push(user.login)
      })
      return { 
        dataset: repo,
        ...scope
      }
    }catch(error){
      throw new Error(`Error on getScopes: ${error.message}`)
    }
  }
  
 
 


  async getRepositoriesForUser(){
    try{
      const query = `{
        viewer {
          organization(login: "gift-data") {
            repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
              totalCount
              pageInfo {
                endCursor
                hasNextPage
              }
              object(expression: "main:") {
                ... on Tree {
                  entries {
                    name
                    object {
                      ... on Blob {
                        oid
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    
      const result = await this.graphQlRequest(query)
      console.log(result);
      const { nodes } = result.data.viewer.organization.repositories
      const orgData =  nodes.filter((repo) =>{
        return repo.viewerPermission == 'ADMIN'
      })

      return orgData
    }
    catch(error){
      console.log(error);
      throw new Error(`Error on Get User Repositories: ${error.message}`)
    }
  }

  

  
}  



