import { Storage } from '@google-cloud/storage'
import { initializeApollo } from '../../../../../../../lib/apolloClient'
import Metastore from '../../../../../../../lib/Metastore'
import { SINGLE_REPOSITORY } from '../../../../../../../lib/queries'
import { PERMISSIONS } from '../../../../../../../lib/queries'
import Permissions from '../../../../../../../lib/Permissions'
import { decrypt } from '../../../../../../../lib/jwt'
import { getDecryptedSecret } from '../../../../../../../lib/decret-secret'
import { BigQuery } from '@google-cloud/bigquery';
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  const apolloClient = initializeApollo()
  await apolloClient.query({query: PERMISSIONS})
  const permissions = new Permissions(apolloClient.cache.extract())

  try {
    const { userInfo } = req.cookies
    const user = decrypt(userInfo) || { login: 'PUBLIC'}
    const { datasetid, org} = req.query
    const organization = org.split('.')[0]
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
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: getDecryptedSecret()})

    const bigquery = new BigQuery({
      projectId: process.env.PROJECT_ID,
      credentials: getDecryptedSecret()})

    const bucketName = 'gift-datasets'
    const bigqueryId = "gift_bq2"
    const tableId = uuidv4()
    let bucket = storage.bucket(bucketName)

    //create a unique folder for each users
    // for each of the user extract the organization
    //data into biquery and skipleadingrow
    // extract the biquery table into users folder
    //and then combine and download from an allfolder belonging to a
    //user.

    let operationUser = uuidv4()

    let schema = dataset['schema']['fields'].map((field)=>{
      let type;
      if (field['type'] === "number") {
          type = 'FLOAT64'
      } else if(field['type'] === "integer") {
        type = 'INT64'
      }
      else {
        type = field['type'].toUpperCase()
      }
      return {name: field['title'], type: type, mode: "NULLABLE"}
    })

    let newFileStorage = []

    for(let i=0; i< dataset['resources'].length; i++) {

      let resource = dataset['resources'][i]
      let fname = `gift-data/${datasetid}/${resource.hash}`
      let extractFname = `gift-data/${operationUser}/${resource.hash}`
      let printHeader = true;
      const tableId = uuidv4()

      if (i > 0) printHeader =false;

      await createTable(bigquery, bigqueryId, tableId)
      await loadCSVFromGCS(bigquery, storage,bigqueryId,
                           tableId, schema,fname)

      await extractTableToGCS(bigquery, storage, extractFname, bigqueryId, tableId, printHeader)
      await deleteTable(bigquery, bigqueryId, tableId)
      newFileStorage.push(bucket.file(extractFname))
    }
    const mergeFile = bucket.file(`gift-data/${operationUser}/${org}`)
    await bucket.combine(newFileStorage, mergeFile)
    
    download(mergeFile, res).then(res => {
      for(let i in newFileStorage) {
        newFileStorage[i].delete()
      }
      mergeFile.delete()
    })

  } catch(error) {
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }

}

async function download(mergeFile, res){
  let [metaData] = await mergeFile.getMetadata()
  res.redirect(metaData.mediaLink)
}



async function createTable(bigquery,datasetId, tableId) {

  const options = {
      location: 'US',
      };

  // Create a new table in the dataset
  const [table] = await bigquery
  .dataset(datasetId)
  .createTable(tableId, options);

  console.log(`Table ${table.id} created.`);
}

function randomName() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for   ( let i = 0; i < 7; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
              charactersLength));
 }
 return result;
}


async function deleteTable(bigquery, datasetId, tableId) {
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .delete();

  console.log(`Table ${tableId} deleted.`);
}


async function loadCSVFromGCS(bigquery, storage,datasetId, tableId,schema,gcpfile) {

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    autodetect: true,
    maxBadRecords: 10,
    location: 'US',
  };
  // console.log(f[0].name)
  // Load data from a Google Cloud Storage file into the table
  const [job] = await bigquery
                .dataset(datasetId)
                .table(tableId)
                .load(storage.bucket('gift-datasets').file(gcpfile), metadata);

  // load() waits for the job to finish
  console.log(`Job ${job.id} load csv into bigquery completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}


async function extractTableToGCS(bigquery, storage, filename, datasetId, tableId, printHeader) {
  const options = {
    location: 'US',
    printHeader: printHeader,
  };
  // Export data from the table into a Google Cloud Storage file
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .extract(storage.bucket('gift-datasets').file(filename), options);

  console.log(`Job ${job.id} created.`);
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
