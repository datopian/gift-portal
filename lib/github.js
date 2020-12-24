import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
require('dotenv').config()

const { 
  GITHUB_APIKEY: githubApiKey, 
  GITHUB_ORG: githubOrg 
} = process.env


/**
 * 
 * @param {String} route - route to get github api data
 */
export async function fetchGithubApi(route){
 return axios({
    method: 'get',
    url: `https://api.github.com${route}`,
   
    headers: { 'Authorization': `bearer ${githubApiKey}`}
  }).then(data => data.data)
}

/**
 * 
 * @param {String} org - Github organization name 
 * @param {String} repo - Github repository name
 */
export async function getRepositoryCollaborators(repo){
  const route = `/repos/${githubOrg}/${repo}/collaborators`
  const response = await fetchGithubApi(route)

  return response
}

export async function getRepositoryInformation(repo){
  const route = `/repos/${githubOrg}/${repo}`
  const response = await fetchGithubApi(route)

  return response
}
/**
 * 
 * @param {String} repoName - Github  repository name (dataset)
 * @param {Array} collaborators - List of repository collaborators
 */
export function parserCollaboratorsList(repoName, collaborators){
 const dataScope = {
     organization: githubOrg,
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

/**
 * 
 * @param {String} requestScope - repository scope requested
 */
export function isValidScope(dataset, requestScope){
 const validScopes = ['read', 'write', 'admin']
  if(!validScopes.includes(requestScope)) {
    throw new Error(`Invalid scope. Scope should be of form "${githubOrg}/${dataset}:read/write/admin"`)
  }
}

/**
 * 
 * @param {String} dataset - Github depository name 
 * @param {String} user - Username logged in
 */
export async function getScopes(dataset, user){
  const scopes = await getRepositoryCollaborators(dataset)
    .then(data => parserCollaboratorsList(dataset, data))

  const response = scopes

  return response
}


/**
 * 
 * @param {*} datasetScopes 
 * @param {*} requestScope 
 * @param {*} usename 
 */
export function generateToken(datasetScopes, requestScope, usename){
  
}

