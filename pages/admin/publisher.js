// import '../../styles/pub.module.css';
import { ResourceEditor } from 'giftpub';

export default function Publisher() {

  const config = {
    datasetId: "sample_1",
    api: "http://127.0.0.1:5000",
    lfs: "http://localhost:9419",
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9228",
    organisationId: "myorg",
    resourceId: ""
  }
  return <ResourceEditor config={config} resource="" />
}