import Metadata from '../../../lib/Metadata'

const metadata = new Metadata()

export default function handler(req,res){

  if(req.method === 'POST'){
    /**
     * TBD - Get User information
     */
    const { id: objectId} = req.query
    const { user } = req.body
    const { metadata: data, description }= req.body

    metadata
      .createMetadata(objectId, user, data, description)
      .then(data => res.send(data))
      .catch(error => res
        .status(400)
        .send(`Error on create metadata: ${error.message}`)
      )
  }

}