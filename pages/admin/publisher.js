// import '../../styles/pub.module.css';
import { ResourceEditor } from 'giftpub'

export default function Publisher({lfsServerUrl, dataset}) {

   
  const config = {
    dataset: dataset,
    lfsServerUrl: lfsServerUrl,
    authorizeApi: '/api/authorize/',
    metastoreApi: '/api/dataset/',
    skipUpload: false
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ResourceEditor config={config} resource="" />
}

Publisher.getInitialProps = async () => {
  return { lfs: process.env.GIFTLESS_SERVER,
    organisationId:  process.env.NEXT_PUBLIC_ORG_NAME
  }
}

