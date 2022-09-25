import { Storage } from '@google-cloud/storage'
import { initializeApollo } from '../../../../../../../lib/apolloClient'
import Metastore from '../../../../../../../lib/Metastore'
import { SINGLE_REPOSITORY } from '../../../../../../../lib/queries'
import { PERMISSIONS } from '../../../../../../../lib/queries'
import Permissions from '../../../../../../../lib/Permissions'
import { decrypt } from '../../../../../../../lib/jwt'
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

    //load google cloud storage
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      }
    })

    const bucketName = process.env.BUCKET_NAME
    let bucket = storage.bucket(bucketName)

    let operationUser = uuidv4()


    let newFileStorage = []

    for(let i=0; i< dataset['resources'].length; i++) {

      let resource = dataset['resources'][i]
      let fname = `gift-data/${datasetid}/${resource.hash}`

      if (i > 0) fname = `gift-data/copy/${resource.hashcopy}`

      newFileStorage.push(bucket.file(fname))
    }

    const mergeFile = bucket.file(`gift-data/${operationUser}/${org}`)
    await bucket.combine(newFileStorage, mergeFile)

    await download(mergeFile, res)
    // download(mergeFile, res).then(res => {
    //   mergeFile.delete()
    // })

  } catch(error) {
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }

}

async function download(mergeFile, res) {
  const [signedUrl] = await mergeFile.getSignedUrl({
    action: "read",
    expires: Date.now() + 15 * 60 * 1000,
  })
  res.redirect(signedUrl)
}
