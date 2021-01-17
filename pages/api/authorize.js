import Permissions from '../../lib/Permissions.js'
import { getSession } from 'next-auth/client'
const permissions = new Permissions()

export default async  function handler(req,res){
  const session = await getSession({ req })

  const user = session.github
  if(req.method === 'POST'){
    try{
      const { dataset, scope } = req.body
      permissions
        .authorize(user.login, dataset, scope)
        .then(data => res.send(data))
    }catch(error){
      res.status(500).send({message: error.message})
    }
  }else{
    res.status(404).send('Method not allowed')
  }
}