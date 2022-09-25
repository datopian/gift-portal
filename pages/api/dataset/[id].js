/* eslint-disable max-len */
import Metastore from '../../../lib/Metastore'
import Permissions from '../../../lib/Permissions'
import { initializeApollo } from '../../../lib/apolloClient'
import { PERMISSIONS } from '../../../lib/queries'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const apolloClient = initializeApollo()
  await apolloClient.query({ query: PERMISSIONS })
  const metastore = new Metastore()
  const permissions = new Permissions(apolloClient.cache.extract())

  try {
    const { id: objectId } = req.query
    const { user } = await getSession({ req })

    if (
      !(await permissions.userHasPermission(user.login, objectId, 'write'))
    ) {
      res.status(401).send('Unauthorized User')
      return
    }

    if (req.method === 'DELETE') {
      const { metadata, path } = req.body
      try {
        delete metadata.sample
        delete metadata.schema
      } catch (error) {
        console.log('')
      }
      return metastore
        .deleteResource(objectId, user, metadata, user.token, path)
        .then(() => {
          res.status(200).send({ success: true })
        })
        .catch((error) => {
          console.log(error)
          return res.status(400).send(error)
        })
    }

    if (req.method === 'POST') {
      const { metadata } = req.body
      //remove top level sample and schema
      try {
        delete metadata.sample
        delete metadata.schema
      } catch (error) {
        console.log('')
      }
      return metastore
        .update(objectId, user, metadata, user.token)
        .then(() => {
          res.status(200).send({ success: true })
          return
        })
        .catch((error) => {
          console.log(error)
          return res.status(400).send(error)
        })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'Bad Request',
      message: error.message
    })
  }
}
