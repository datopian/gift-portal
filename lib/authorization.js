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

export async function getRepositoryCollaborators(org, repo){
 
}

export function parserCollaboratorsList(organization, repoName, collaborators){
 
}

export function isValidScope(datasetScopes, requestScope){
 
}

export function generateToken(datasetScopes, requestScope, usename){
 
}

export async function getScopes(){

}