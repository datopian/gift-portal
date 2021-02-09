import { decrypt } from '../../../../../../lib/jwt'
import Download from '../../../../../../lib/Download'
import axios from 'axios'


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
    return axios.get(resourceUrl, { responseType: 'stream'}).then(response => {
      const stream = response.data
      stream.on('data', chunk => res.write(new Buffer.from(chunk)))
      stream.on('end', ()=> res.end())
    })
    
    
  }catch(error){
    console.log(error)
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }
}