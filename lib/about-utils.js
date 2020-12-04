import fs from 'fs';
import * as matter from 'gray-matter';
import { join } from 'path';

const aboutDir = join(process.cwd(),'_about');

export function getAbout(slug){
  const postFile = join(aboutDir, `${slug}.md`);
  let postContent = fs.readFileSync(postFile, 'utf8');
  let matterContent = matter(postContent);
  return matterContent;
}
