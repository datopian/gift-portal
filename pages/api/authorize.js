import Permissions from '../../lib/Permissions.js'
import { decrypt } from '../../lib/jwt'


const permissions = new Permissions()

export default async  function handler(req,res) {
  const { userInfo } = req.cookies
  const user = decrypt(userInfo)

  if (req.method === 'POST'){
    try {
      const { dataset, scope } = req.body
      permissions
        .authorize(user.login, dataset, scope)
        .then(data => res.send(data))
    } catch(error) {
      res.status(500).send({message: error.message})
    }
  } else {
    res.status(404).send('Method not allowed')
  }
}
