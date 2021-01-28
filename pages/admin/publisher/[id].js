import React from 'react'
import { DatasetEditor } from 'giftpub'
import Error from 'next/error'
import { getSession } from 'next-auth/client'
import Metadata from '../../../lib/Metadata'

export default function Publisher({ lfsServerUrl, dataset, organizationId }) {
  
  const config = {
    dataset: dataset,
    lfsServerUrl: lfsServerUrl,
    authorizeApi: '/api/authorize/',
    metastoreApi: '/api/dataset/',
    organizationId: organizationId
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      { (dataset) && (<DatasetEditor config={config}/>) }
      { (!dataset) && (<Error statusCode={404}/>)}
    </>
  )
}

Publisher.getInitialProps = async (context) => {

  const metadata = new Metadata()
  const {req} = context
  const session = await getSession({ req })
  const { user } = session

  const userToken = process.env.APP_GITHUB_KEY

  const data = await metadata.fetchMetadata(context.query.id,user,userToken)

  return {
    lfsServerUrl: process.env.GIFTLESS_SERVER,
    organizationId: process.env.ORGANISATION_REPO,
    dataset: data
  }
}
