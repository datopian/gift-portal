import fs from 'fs'
import path from 'path'
import Github from '../lib/Github'

require('dotenv').config()

const github = new Github()

/**
 * Create Data Directory if not exists
 */
async function createDataDirIfNotExists(){
  const rootPath = path.resolve(process.cwd())
  const isDirExists = await fs.existsSync(`${rootPath}/data`)
  if(!isDirExists) await fs.mkdirSync(`${rootPath}/data`)
}

/**
 * 
 * @param {Object} data - Store data as JSON  
 */
async function createDataAsJson(data){
  const rootPath = path.resolve(process.cwd())
  fs.writeFileSync(`${rootPath}/data/datasets.json`, JSON.stringify(data, null, 2))
}

/**
 * Get Organization list and scopes
 */
async function getOrganizationScopes(){
  return github.getOrgRepos()
    .then(data => data.repositories.map(item => item.name))
    .then(data => data.map(item => github.getScopes(item)))
    .then(data => Promise.all(data)) 
}

/**
 * Script Workflow
 */
function run(){
  createDataDirIfNotExists()
  .then(getOrganizationScopes)
  .then(createDataAsJson)
}

run()
