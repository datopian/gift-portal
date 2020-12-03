import { useRouter } from 'next/router'
import * as db from '../../data';

const Dataset = () => {
  const router = useRouter()
  const { datasetid } = router.query

  if (!(datasetid in db.catalog)) {
    return 404
  } else {
    const dataset = db.catalog[datasetid]
    return (
      <div>
        <p>Dataset: {datasetid}</p>
        <p>{dataset.title}</p>
      </div>
    )
  }
}

export default Dataset