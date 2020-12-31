import fs from 'fs';
import path from 'path';
import Github from '../lib/Github';
import chalk from 'chalk';
import ora from 'ora';
require('dotenv').config();

const spinner = new ora();
const github = new Github();

/**
 * Create Data Directory if not exists
 */
async function createDataDirIfNotExists(){
  try{
    const rootPath = path.resolve(process.cwd());
    const dataPath = `${rootPath}/data`;
    const isDirExists = await fs.existsSync(dataPath);
    if(!isDirExists) {
      console.log('Creating data folder @ dataPath \n');
      await fs.mkdirSync(dataPath);
    }else {
      console.log(`Using Already existing path: ${chalk.yellow(dataPath)} \n`);
    }
  }
  catch(error) {
    throw new Error(`Error on Create Data Directory: ${error.message}`);
  }
}

/**
 * 
 * @param {Object} data - Store data as JSON  
 */
async function createDataAsJson(data){
  try{
    const rootPath = path.resolve(process.cwd());
    console.log(`Organization Datasets stored at: ${chalk.yellow(rootPath,'/data/organization.json')} \n`);
    fs.writeFileSync(`${rootPath}/data/organization.json`, JSON.stringify(data, null, 2), { flag: 'w'});
    console.log('---------------------------------------------------------------------------- \n');
  }
  catch(error){
    throw new Error(`Error on Create Dataset files: ${error.message}`);
  }
}

/**
 * Get Organization list and scopes
 */
async function getOrganizationScopes(){
  try{
    console.log('Retrieving Organization repositories \n');
    spinner.start();
    const scopes = await github.getOrgRepos()
      .then(data => {
        spinner.stop();
        return data.repositories.map(item => item.name);
      })
      .then(data => data.map(item => github.getScopes(item)))
      .then(data => {
        console.log(`${chalk.green('Parsing Scopes')} \n`);
        spinner.start();
        return Promise.all(data);
      }); 
    spinner.stop();
    console.log(`Datasets found: ${chalk.blue(scopes.length)} \n`);
    return scopes;
  }
  catch(error){
    throw new Error(`Error on Get Repositories Scopes: ${error.message}`);
    
  }
}

/**
 * Script Workflow
 */
export default function run(){
  console.log();
  console.log(`${chalk.green('Organization datasets scripts \n')}`);
  console.log('---------------------------------------------------------------------------- \n');
  createDataDirIfNotExists()
    .then(getOrganizationScopes)
    .then(createDataAsJson)
    .catch(error => {
      spinner.stop();
      console.log(error);
      process.exit(1);
    });
}

