import { decrypt } from '../../../../../../lib/jwt'
import Download from '../../../../../../lib/Download'
import Permissions from '../../../../../../lib/Permissions'
import { initializeApollo } from '../../../../../../lib/apolloClient'
import { PERMISSIONS } from '../../../../../../lib/queries'


const download = new Download()

export default async function handler(req,res){
  const apolloClient = initializeApollo()
  await apolloClient.query({query: PERMISSIONS})
  const permissions = new Permissions(apolloClient.cache.extract())
  try{ 
    const { userInfo } = req.cookies
    const user = decrypt(userInfo) || { login: 'PUBLIC'}
    
    const { id, oid } = req.query
    
    if (!await permissions.userHasPermission(user.login, id, 'read')) {
      res.status(401).send('Unauthorized User')
    }

    const resourceUrl = await download.getUrl(id, oid, user.login)
    return res.redirect(resourceUrl)
    
    
  }catch(error){
    console.log(error)
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }
}