import { Storage } from '@google-cloud/storage';
import { initializeApollo } from '../../../../../../lib/apolloClient';
import Metastore from '../../../../../../lib/Metastore'
import { SINGLE_REPOSITORY } from '../../../../../../lib/queries'
import { PERMISSIONS } from '../../../../../../lib/queries'
import Permissions from '../../../../../../lib/Permissions'
import { decrypt } from '../../../../../../lib/jwt'
import * as request from 'request';


async function combine(dataset, datasetid, org, allCreated){
  const storage = new Storage()
  const gcBucket = storage.bucket('gift-datasets');
  //extract hash for all dataset
  let sourceFiles = dataset['resources'].map((resource)=>{
    let fname = `gift-data/${datasetid}/${resource.hash}`
    return gcBucket.file(fname)
  })

  //compare the concatenated file date
  // with all resources to enable combining
  // only new files with the old combine file
  if(allCreated) {
    let newSourceFiles = [gcBucket.file(`gift-data/undefined/${org}`)]

    for(let i in sourceFiles) {
      let [metadata] = await sourceFiles[i].getMetadata()

      let fileCreated = new Date(metadata['updated']).getTime()
      //check if file is new
      if( allCreated < fileCreated) {
        newSourceFiles.push(sourceFiles[i])
      }
    }

    sourceFiles = newSourceFiles
  }
  //destination file for the combine files
  const allLogs = gcBucket.file(`gift-data/undefined/${org}`);

  //combine files.
  await gcBucket.combine(sourceFiles, allLogs)

}

async function download(org, res){
  const storage = new Storage()
  let bucket = storage.bucket('gift-datasets');
  let [metaData] = await bucket.file(`gift-data/undefined/${org}`).getMetadata();
  res.setHeader("content-disposition", "attachment; filename=" + `${org}`);
  request
    .get(metaData.mediaLink)
    .on("error", function(err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 not found</h1>");
      res.end();
      return;
    })
    .pipe(res);

}
export default async function handler(req, res) {
  const apolloClient = initializeApollo()
  await apolloClient.query({query: PERMISSIONS})
  const permissions = new Permissions(apolloClient.cache.extract())

  try {
    const { userInfo } = req.cookies
    const user = decrypt(userInfo) || { login: 'PUBLIC'}
    const { datasetid, org} = req.query
    console.log(org)
    const organization = org.split(".")[0]
    if (!await permissions.userHasPermission(user.login, organization, 'read')) {
      res.status(401).send('Unauthorized User')
    }

    //obtain organization datajson and resources from github
    const apolloClientG = initializeApollo()
  
    await apolloClientG.query({
      query: SINGLE_REPOSITORY,
      variables: { name: organization },
    })

    const metastore = new Metastore(apolloClientG.cache.extract())
    const dataset = await metastore.fetch(organization)
    

    const datapackageLastUpdated = dataset['updatedAt']

    //load google cloud storage
    const storage = new Storage();
    const bucketName = 'gift-datasets'
    let allFileExist;
    let allFileCreated = null;

    try {
      let bucket = storage.bucket(bucketName);
      let [metaData] = await bucket.file(`gift-data/undefined/${org}`).getMetadata();
      allFileCreated = metaData['updated'];
      allFileExist = true;
    } catch (error){
        allFileExist = null;
    }

    if(allFileExist && allFileCreated) {
      let allFileDate = new Date(allFileCreated).getTime()
      let datapackageDate = new Date(datapackageLastUpdated).getTime()

      //check if datapackage.json is updated
      // since the last time the file was
      //created
      if( allFileDate > datapackageDate) {
        await download(org, res)
      }else {
        await combine(dataset, datasetid, org, allFileDate)
        await download(org, res)
      }
    } else {
      await combine(dataset, datasetid, org)
      await download(org, res)

    }
    // res.send("ok")
  } catch(error) {
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }
 
}