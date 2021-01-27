import { ResourceEditor } from 'giftpub'
import Error from 'next/error'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Publisher({ lfsServerUrl, query }) {
  const [data, setData] = useState()
  useEffect(()=>{
    axios({
      method: 'GET',
      url: `/api/dataset/${query}`
    }).then(res =>  setData(res.data))
  }, [])

  const config = {
    dataset: data,
    lfsServerUrl: lfsServerUrl,
    authorizeApi: '/api/authorize/',
    metastoreApi: '/api/dataset/'
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      { (data) && (<ResourceEditor config={config} resource='' />) }
      { (!data) && (<Error statusCode={404}/>)}
    </>
  )
}

Publisher.getInitialProps = async (ctx) => {
  return {
    lfsServerUrl: process.env.GIFTLESS_SERVER,
    organisationId: process.env.ORGANISATION_REPO,
    query: ctx.query.id,
  }
}
