import fs from 'fs'
import Download from '../../lib/Download'

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
})