import Download from '../../../../../../lib/Download'

const download = new Download()

export default async function handler(req,res){
  try{ /**
   * TODO 
   * Strategy to get username to check access
   */
    const { username }= req.headers
    const { id, oid } = req.query
    if(!await download.checkDatasetPermission(id, username)){
      res.status(401).send('Insufficient Permissions')
    }
    const resourceUrl = await download.getUrl(id, oid, username)
    res.send(resourceUrl)
    
    
  }catch(error){
    res.status(400).send('Error on Retrieve Resource')
  }
}