import Metadata from '../../lib/Metadata'
import Github from '../../lib/Github'

const metadata = new Metadata()


const existsFile = {
  name: 'test.csv',
  path: 'test.csv',
  sha: 'f56ce0029545d992b701b82d92da23b5b64771a8',
  type: 'file',
  content: 'e21lc3NhZ2U6ICdvayd9\n',
  encoding: 'base64',
}

const notExistsFile = {
  message: 'Not Found',
  documentation_url: 
  'https://docs.github.com/rest/reference/repos#get-repository-content'
}

describe('Metadata Tests', ()=> {
  it('shoud return a sha oid if some file aready exists', async ()=> {
   
    const restMock = jest.fn()
    Github.prototype.restRequest = restMock
    restMock.mockReturnValue(Promise.resolve(existsFile))

    const response = await metadata
      .checkMetadataExists('repotest','test.csv', 'datopian')
    
    expect(response).toEqual(existsFile.sha)
  })

  it('should return undefined if the file doen`t exists', async ()=> {

    const restMock = jest.fn()
    Github.prototype.restRequest = restMock
    restMock.mockReturnValue(Promise.resolve(notExistsFile))

    const response = await metadata
      .checkMetadataExists('repotest','test.csv', 'datopian')
    
    expect(response).toEqual(undefined)
  })
})