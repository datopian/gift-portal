import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
require('dotenv').config()

/**
 * 
 * @param {String} route - route to get github api data
 */
export async function fetchGithubApi(route){
 return axios({
    method: 'get',
    url: `https://api.github.com${route}`,
   
    headers: { 'Authorization': `bearer ${process.env.GITHUB_APIKEY}`}
  }).then(data => data.data)
}

/**
 * 
 * @param {String} org - Github organization name 
 * @param {String} repo - Github repository name
 */
export async function getRepositoryCollaborators(org, repo){
  const route = `/repos/${org}/${repo}/collaborators`
  
  const response = await fetchGithubApi(route)

  return response
}

/**
 * 
 * @param {String} organization - Github organization name
 * @param {String} repoName - Github  repository name (dataset)
 * @param {Array} collaborators - List of repository collaborators
 */
export function parserCollaboratorsList(organization, repoName, collaborators){
 const dataScope = {
     organization,
     dataset: repoName, 
     editors: [],
     readers: [],
     admin: []
   }

   collaborators.map(user => {
     if(user.permissions.push) dataScope.editors.push(user.login)
     if(user.permissions.pull) dataScope.readers.push(user.login)
     if(user.permissions.admin) dataScope.admin.push(user.login)
   })

   return dataScope
}

export function isValidScope(datasetScopes, requestScope){
 
}

export function generateToken(datasetScopes, requestScope, usename){
 
}

export async function getScopes(){

}