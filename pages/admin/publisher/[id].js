// import '../../styles/pub.module.css';
import { ResourceEditor } from 'giftpub'
import { useRouter } from 'next/router'


const Publisher =  () =>  {
  
  const route = useRouter()
  const { id } = route.query
 
  const config = {
    datasetId: id,
    api: 'http://127.0.0.1:5000',
    lfs: process.env.GIFTLESS_SERVER,
    authToken: 'be270cae-1c77-4853-b8c1-30b6cf5e9228',
    organisationId: process.env.ORGANISATION_REPO,
    resourceId: ''
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ResourceEditor config={config} resource="" />
}

export default Publisher