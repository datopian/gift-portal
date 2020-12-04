import fs from 'fs';
import * as matter from 'gray-matter';
import { join } from 'path';

const aboutDir = join(process.cwd(),'_about');

export function getAbout(slug){
  const postFile = join(aboutDir, `${slug}.md`);
  const postContent = fs.readFileSync(postFile, 'utf8');
  const matterContent = matter(postContent);
  return matterContent;
}
