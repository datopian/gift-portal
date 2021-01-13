import Metadata from '../../lib/Metadata'
import * as metastore from 'metastore-lib-js'
import Permissions from '../../lib/Permissions'

jest.mock('metastore-lib-js')
  
const metadata = new Metadata()


describe('Metadata Tests', ()=> {

  describe('Create metadata', ()=> {

    const user = {
      name: 'John Doe',
      email: 'johndoe@datopian.com',
      access_token: '14ca1111c33ef555ed3d33f1225e33dee7ab9999'
    }
    const data = { 
      name: 'Test Financial File',
      resources: [
        { path: 'data/myresource.csv',
          type: 'text/csv' }
      ],
      description: 'A financial dataset',
    }
  
    const responseMetadata = {
      objectId: 'file.csv',
      revisionId: 'd9cc87d1-7f8d-42f3-95c2-278433b9a909',
      createdAt: '2021-01-13T14:59:54.203Z',
      author: {
        name: 'thadeu cotts',
        email: 'thadeu.cotts@datopian.com'
      },
      description: 'file test save api',
      metadata: {
        name: 'file csv test',
        resources: {
          file: 'file.csv'
        },
        revision: 0,
        revisionId: 'd9cc87d1-7f8d-42f3-95c2-278433b9a909'
      }
    }
    const description = 'Financial file'
    it('create metadata on POST method',async  ()=> {
     
      const createSpy = jest.spyOn(metastore, 'createMetastore') 
      createSpy.mockReturnValue({create: () => responseMetadata})

      const trueMock = jest.fn()
      Permissions.prototype.userHasPermission = trueMock
      trueMock.mockReturnValue(Promise.resolve(true))
    
      const response = await  metadata
        .createMetadata('file.csv', user, data, description)
  
      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(response).toEqual(responseMetadata)
    })
  
    it('should return an error if user has no permission on dataset', ()=> {

    })
  })

})