import fs from 'fs'
import { Client } from 'giftless-client'
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

const resourceDownloadInfo = {
  data: {
    transfer: 'basic',
    objects: [{
      oid: resource, 
      size,
      actions: {
        download: {
          href: 'http://lfsserver.com/datopian/repotest/download.csv'
        }
      }
    }
    ]}
}

describe('Download functions', ()=> {
  describe('Permission tests', () => {
    it('should return true if the user has permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(validResource)
      const response = download.checkDatasetPermission('repoA', 'userA')
      expect(response).toEqual(true)
    })

    it('should return false if the user has not permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(invalidResource)
      const response = download.checkDatasetPermission('repoB', 'userA')
      expect(response).toEqual(false)
    })
  })

  describe('Parser method', () => {
    it('should return the id and size given a resourceId', ()=> {
      const response = download._parseResourceId(resourceId)

      expect(response).toEqual({oid: resource, size})
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
      const response = await download._getLfsServer('repotest', 'datopian')

      expect(response).toEqual(contentResponse)

    })

    it('should return the resource id and size', async ()=> {
      const metadataMock = jest.spyOn(download, '_getDatasetMetadata')
      metadataMock.mockReturnValue(resourceMetadata)
      
      const response = await download
        .getResourceMetadata('repotest', 'datopian')
        
      expect(response).toEqual(resourceMetadata)
    })

    it('should return an url given a resource information',async ()=>{
      const batchMock = jest.fn()
      Client.prototype.batch = batchMock

      batchMock.mockReturnValue(Promise.resolve(resourceDownloadInfo))  
      const response = await download
        .getResourceDownloadUrl('repotest', resourceId, lfsServer)

      expect(response).toEqual(resourceDownloadInfo.data)
    })

  })
})