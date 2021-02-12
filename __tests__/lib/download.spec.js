import { Client } from 'giftless-client'
import Download from '../../lib/Download'
import Github from '../../lib/Github'
import { initializeApollo } from "../../lib/apolloClient"

jest.mock('giftless-client')

const download = new Download()

const graphQlResponse = {
  data: {repository: {
    content: {
      text: `version https://git-lfs.github.com/spec/v1\n
      oid sha256:
      sha256:2879e2bdf2b398ee251858c2095053b0f26687cef7ddb9013f050d44437dac92\n
      size 459318\n`
    }
  }
  }
}


const repoGraphQl = {
  organization: {
    repositories: {
      totalCount:1,
      pageInfo: 'Y3Vyc29yOnYyOpHOFBwvIQ',
      hasNextPage: false,
      nodes:[
        {
          isPrivate: false,
          name: 'repoA',
          collaborators:{
            edges:[
              {
                permission: 'ADMIN',
                node: {
                  login: 'userA'
                }
              },
              {
                permission: 'READ',
                node: {
                  login: 'userB'
                }
              },
              {
                permission: 'WRITE',
                node: {
                  login: 'userC'
                }
              },
            ]
          }
        },
        {
          isPrivate: true,
          name: 'repoB',
          collaborators:{
            edges:[
              {
                permission: 'ADMIN',
                node: {
                  login: 'userA'
                }
              },
              {
                permission: 'READ',
                node: {
                  login: 'userB'
                }
              },
              {
                permission: 'WRITE',
                node: {
                  login: 'userC'
                }
              },
            ]
          }
        }
      ]
    },
  }
}


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
    it('should return true if the user has permission', async ()=> {
      const apollo = initializeApollo()
      const mock = jest.spyOn(apollo, 'readQuery')
      mock.mockReturnValue(repoGraphQl)
      const response = await download.checkDatasetPermission('repoA', 'userA')
      expect(response).toEqual(true)
    })

    it('should return false if the user has not permission', async()=> {
      const apollo = initializeApollo()
      const mock = jest.spyOn(apollo, 'readQuery')
      mock.mockReturnValue(repoGraphQl)
      const response = await download.checkDatasetPermission('repoB', 'userD')
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

    it('should return an hash from a resource', async()=> {
      const resourcePath= ['data', 'resource.csv']
      const restMock = jest.fn()
      Github.prototype.graphQlRequest = restMock
      restMock.mockReturnValue(Promise.resolve(graphQlResponse))
      const response = await download._getResourceContent(resourcePath)
      expect(response).toEqual(graphQlResponse.data.repository.content.text)
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