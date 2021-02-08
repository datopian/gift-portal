import { decrypt } from '../../../lib/jwt'
import Metadata from '../../../lib/Metadata'
import Permissions from '../../../lib/Permissions'

const metadata = new Metadata()
const permissions = new Permissions()

export default async function handler(req,res){
  try{
    const { id: objectId} = req.query
    const { userInfo } = req.cookies
    const user = decrypt(userInfo)
  
    if(!permissions.userHasPermission(
      user.login, 
      objectId, 
      'write')) {
      res.status(401).send('Unauthorized User')
    }
  
   
    // if(req.method === 'POST'){
    //   const { metadata: data, description }= req.body
     
    //   return metadata
    //     .createMetadata(objectId, 
    //       user, 
    //       data, 
    //       description, 
    //       user.token.accessToken
    //     )
    //     .then(data => res.send(data))
    //     .catch(error => 
    //       res
    //         .status(400)
    //         .send(`Error on create metadata: ${error.message}`)
    //     )
    // }


    if(req.method === 'POST'){
      const { metadata: data, readMe}  = req.body
  
      return metadata
        .updateMetadata(objectId, 
          user, 
          data, 
          readMe, 
          user.token.accessToken
        )
        .then(data => res.send(data))
        .catch(error => {
        
          return res
            .status(400)
            .send(error)}
        )
    }
    else{
      res.status(404).send('Method not allowed')
    }
  }
  catch(error){
    return res.status(400).json({
      error: 'Bad Request', 
      message: error.message
    })
  }

}