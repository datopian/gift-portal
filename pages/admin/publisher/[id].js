import { ResourceEditor } from 'giftpub'
import * as metastore from 'metastore-lib-js'

export default function Publisher({ lfsServerUrl, dataset }) {

  const config = {
    dataset: dataset,
    lfs: lfsServerUrl,
    authorizeApi: '/api/authorize/',
    metastoreApi: '/api/dataset/'
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ResourceEditor config={config} resource='' />
}

Publisher.getInitialProps = async (ctx) => {
  const config = {
    token: 'personal_access_token',
    defaultAuthor: { name: 'Stephen Oni', email: 'steohenoni2@gmail.com' },
    org: process.env.ORGANISATION_REPO,
    lfsServerUrl: process.env.GIFTLESS_SERVER
  }
  
  const storage = metastore.createMetastore('github', config)

  const objectInfo = await storage.fetch(ctx.query.id)
  console.log(objectInfo)

  return {
    lfs: process.env.GIFTLESS_SERVER,
    organisationId: process.env.ORGANISATION_REPO,
    datasetId: ctx.query.id,
  }
}