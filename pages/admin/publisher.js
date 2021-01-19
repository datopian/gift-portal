// import '../../styles/pub.module.css';
import { ResourceEditor } from 'giftpub'

export default function Publisher() {

  const config = {
    datasetId: 'sample_4',
    api: 'http://127.0.0.1:5000',
    lfs: 'https://giftless-gift.herokuapp.com/',
    authToken: 'be270cae-1c77-4853-b8c1-30b6cf5e9228',
    organisationId: 'gift-data',
    resourceId: ''
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ResourceEditor config={config} resource="" />
}