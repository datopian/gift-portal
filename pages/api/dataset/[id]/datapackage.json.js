import { initializeApollo } from '../../../../lib/apolloClient'
import Metastore from '../../../../lib/Metastore'
import { SINGLE_REPOSITORY } from '../../../../lib/queries'

export default async function handler(req,res) {
  const { id } = req.query
  const apolloClient = initializeApollo()
  
  await apolloClient.query({
    query: SINGLE_REPOSITORY,
    variables: { name: id },
  })

  const metastore = new Metastore(apolloClient.cache.extract())
  const dataset = await metastore.fetch(id)
  res.setHeader("content-disposition", "attachment; filename=" + `datapackage.json`);
  res.send(JSON.stringify(dataset))
  res.end()
}
