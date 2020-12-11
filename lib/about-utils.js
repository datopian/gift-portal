import fs from 'fs';
import * as matter from 'gray-matter';
import { join } from 'path';

const aboutDir = join(process.cwd(),'_about');

export function getAbout(slug){
  //a quick test to check file system on vercel
  console.log(process.cwd())
  console.log(fs.readdirSync(process.cwd()));
  const postFile = join(aboutDir, `${slug}.md`);
  const postContent = fs.readFileSync(postFile, 'utf8');
  const matterContent = matter(postContent);
  return matterContent;
}
