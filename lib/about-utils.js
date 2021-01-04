import fs from 'fs'
import * as matter from 'gray-matter'
import { join, resolve } from 'path'

const aboutDir = resolve('./_about')

export function getAbout(slug){
  const postFile = join(aboutDir, `${slug}.md`)
  const postContent = fs.readFileSync(postFile, 'utf8')
  const matterContent = matter(postContent)
  return matterContent
}

export function getAllAbout(){
  return fs.readdirSync(aboutDir)
}