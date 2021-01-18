import axios from 'axios'
import { Octokit } from '@octokit/rest'
require('dotenv').config()



export default class Github{
  constructor(){
    this.token = process.env.GITHUB_APIKEY
    this.defaultOrg = process.env.GITHUB_ORG
    
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
   * @param {String} org - Organization/owner to retrieve repo list 
   * @param {Array} list - List to be use if response has more 100 results 
   * @param {String} cursor - Next Page cursor to retrieve large arrays 
   */
  async getOrgRepos(org = this.defaultOrg, list = [], cursor){
    try{
      const cursorQuery = cursor ? ',after: "' + cursor + '"' : ''
      const query = `{
        organization(login: "${org}") {
          login
          repositories(first: 100 ${cursorQuery}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              name
            }
          }    
        }
      }`
      
      const response = await this.graphQlRequest(query).then(data => data.data)
      list = [...list, ...response.organization.repositories.nodes]
      if(response.organization.repositories.pageInfo.hasNextPage){
        const pointer = response.organization.repositories.pageInfo.endCursor
        return this.getOrgRepos(org, list, pointer)
      }
  
      return {
        organization: org,
        repositories: list
      }
    }
    catch(error){
      throw new Error(`Error on getOrgRepos: ${error.message}`)
    }
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
  
  async getRepositoriesForUser(org, token){
    org = org || process.env.DEFAULT_TOKEN
    token = token || process.env.DEFAULT_TOKEN
    const octo = new Octokit({
      auth: token,
    })
    const result = await octo.request('GET /orgs/{org}/repos', {
      org
    })
    const orgData =  result.data.filter((repo) =>{
      return repo.permissions.push == true || repo.permissions.admin == true
    })
    return orgData
  }

  
}  


