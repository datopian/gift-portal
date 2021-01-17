import Metadata from '../../../lib/Metadata'
import Permissions from '../../../lib/Permissions'

const metadata = new Metadata()
const permissions = new Permissions()

export default function handler(req,res){

  const { id: objectId} = req.query
  const { user } = req.body

  if(!permissions.userHasPermission(
    user.username, 
    objectId, 
    'write')) {
    res.status(401).send('Unauthorized User')
  }

  if(req.method === 'POST'){
    /**
     * TBD - Get User information
     */
    const { metadata: data, description }= req.body

    metadata
      .createMetadata(objectId, user, data, description)
      .then(data => res.send(data))
      .catch(error => res
        .status(400)
        .send(`Error on create metadata: ${error.message}`)
      )
  }
  if(req.method === 'PUT'){
    const { metadata: data, readMe}  = req.body

    metadata
      .updateMetadata(objectId, user, data, readMe)
      .then(data => res.send(data))
      .catch(error => res
        .status(400)
        .send(`Error on create metadata: ${error.message}`)
      )
  }

}