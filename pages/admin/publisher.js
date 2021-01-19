// import '../../styles/pub.module.css';
import { ResourceEditor } from 'giftpub'

export default function Publisher() {

  const config = {
    datasetId: 'sample_1',
    api: 'http://127.0.0.1:5000',
    lfs: process.env.GIFTLESS_SERVER,
    authToken: 'be270cae-1c77-4853-b8c1-30b6cf5e9228',
    organisationId: 'myorg',
    resourceId: ''
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ResourceEditor config={config} resource="" />
}