import fs from 'fs'
import Download from '../../lib/Download'
import Github from '../../lib/Github'

jest.mock('giftless-client')

const download = new Download()

const validResource = [{
  dataset: 'resourceA',
  readers: ['userA', 'userB'],
  editors: ['userA'],
  admins: ['userA']
}]

const invalidResource = [{
  dataset: 'resourceB',
  readers: ['userB', 'userC'],
  editors: ['userC'],
  admins: ['userC']
}]

const resourceId = 
      '2879e2bdf2b398ee251858c2095053b0f26687cef7ddb9013f050d44437dac92459318'

const resource = 
      '2879e2bdf2b398ee251858c2095053b0f26687cef7ddb9013f050d44437dac92'
      
const size = 459318

const resourceMetadata = `version https://git-lfs.github.com/spec/v1
oid sha256:2879e2bdf2b398ee251858c2095053b0f26687cef7ddb9013f050d44437dac92
size 459318`

const contentResponse = {
  content: Buffer.from(`[lfs]
  url = https://lfsservertest.com/datopian/repotest/`).toString('base64')
}

const lfsServer = 'https://lfsservertest.com'

describe('Download functions', ()=> {
  describe('Permission tests', () => {
    it('should return true if the user has permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(validResource)
      const response = download.checkDatasetPermission('resourceA', 'userA')
      expect(response).toEqual(true)
    })

    it('should return false if the user has not permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(invalidResource)
      const response = download.checkDatasetPermission('resourceB', 'userA')
      expect(response).toEqual(false)
    })
  })

  describe('Parser method', () => {
    it('should return the id and size given a resourceId', ()=> {
      const response = download.parseResourceId(resourceId)

      expect(response).toEqual({resource, size})
    })

    it('should return an sha256id and size from file', ()=> {
      const response = download.parserResourceFile(resourceMetadata)
      
      expect(response).toEqual({oid:resource, size})
    })

    it('should return an url given an base64 string',  ()=> {
      
      const response = download.parserLfsServerInfo(contentResponse.content)
      expect(response).toEqual(lfsServer)
    })
  })

  describe('Download resource methods', ()=> {
 
    it('should return an lfs server content', async ()=> {
      const restMock = jest.fn()
      Github.prototype.restRequest = restMock
      restMock.mockReturnValue(Promise.resolve(contentResponse))
      const response = await download.getLfsServer('repotest', 'datopian')

      expect(response).toEqual(contentResponse)

    })

    it('should return the resource id and size', async ()=> {
      const metadataMock = jest.spyOn(download, 'getDatasetMetadata')
      metadataMock.mockReturnValue(resourceMetadata)
      
      const response = await download
        .getResourceMetadata('repotest', 'datopian')
        
      expect(response).toEqual(resourceMetadata)
    })

  })
})