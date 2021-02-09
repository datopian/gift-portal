import { decrypt } from '../../../../../../lib/jwt'
import Download from '../../../../../../lib/Download'

const download = new Download()

export default async function handler(req,res){
  try{ 
    const { userInfo } = req.cookies
    const user = decrypt(userInfo) || { login: 'PUBLIC'}
    
    const { id, oid } = req.query
    
    if(!await download.checkDatasetPermission(id, user.login)){
      return res.status(401).send('Insufficient Permissions')
    }

    const resourceUrl = await download.getUrl(id, oid, user.login)
    
    return res.redirect(resourceUrl)
    
    
  }catch(error){
    console.log(error)
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }
}