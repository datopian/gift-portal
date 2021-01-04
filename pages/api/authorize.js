import Permissions from '../../lib/Permissions.js'

const permissions = new Permissions()

export default function handler(req,res){
  if(req.method === 'POST'){
    try{
      const { user, dataset, scope } = req.body
      permissions
        .authorize(user, dataset, scope)
        .then(data => res.send(data))
    }catch(error){
      res.status(500).send({message: error.message})
    }
  }else{
    res.status(404).send('Method not allowed')
  }
}