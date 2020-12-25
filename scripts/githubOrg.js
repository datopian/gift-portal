import fs from 'fs'
import path from 'path'
import Github from '../lib/Github'

const github = new Github()

async function createDataDirIfNotExists(){
  const rootPath = path.resolve(process.cwd())
  const isDirExists = await fs.existsSync(`${rootPath}/data`)
  if(!isDirExists) await fs.mkdirSync(`${rootPath}/data`)
}


async function run(){
  await createDataDirIfNotExists()
}


run()