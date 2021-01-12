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
describe('Metadata Tests', ()=> {
  it('shoud return a sha oid if some file aready exists', async ()=> {
   
    const restMock = jest.fn()
    Github.prototype.restRequest = restMock
    restMock.mockReturnValue(Promise.resolve(existsFile))

    const response = await metadata
      .checkMetadataExists('repotest','test.csv', 'datopian')
    
    expect(response).toEqual(existsFile.sha)

  })
})