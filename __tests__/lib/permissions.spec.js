import Permissions from '../../lib/Permissions'
import fs from 'fs'


const permissions = new Permissions()

const resourceData = [{
  dataset: 'repoA',
  readers: ['userA', 'userB'],
  editors: ['userA'],
  admins: ['userA']
}
,{
  dataset: 'repoB',
  readers: ['userB', 'userC'],
  editors: ['userC'],
  admins: ['userC']
}]

describe('Authenticate Tests', () => {
  it('should thow an error if requested scope is invalid', () => {
    expect(() =>
      permissions.isValidScope('repotest', 'tester', 'datopian')
    ).toThrow(
      'Invalid scope. Scope should be of "datopian/repotest:read/write/admin'
    )
  })

  it('should return a token with requested scopes', async () => {
    const dataSpy = jest.spyOn(permissions, 'getDataset')
    dataSpy.mockReturnValue({
      dataset: 'repotest',
      readers: ['user-test'],
      editors: ['user-test'],
      admins: [],
    })

    const tokenSpy = jest.spyOn(permissions, 'generateToken')
    tokenSpy.mockReturnValue('tokenkey')

    const now = new Date().toISOString()
    const dateSpy = jest.spyOn(permissions, 'generateExpiresDate')
    dateSpy.mockReturnValue(now)

    const token = {
      success: true,
      result: {
        requested_scopes: ['obj:datopian/repotest/*.write'],
        granted_scopes: ['obj:datopian/repotest/*.write'],
        token: 'tokenkey',
        user_id: 'user-test',
        expires_at: now,
      },
    }

    const responseToken = await permissions.authorize(
      'user-test',
      'repotest',
      'write',
      'datopian'
    )
    expect(responseToken).toEqual(token)
  })

  describe('Validate user permissions', ()=> {

    it('should return true if user has permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(resourceData)
      const response = permissions.userHasPermission('userA', 'repoA', 'write')

      expect(response).toEqual(true)
    })

    it('should return false if user has no permission', ()=> {
      const mock = jest.spyOn(fs, 'readFileSync')
      mock.mockReturnValue(resourceData)
      const response = permissions.userHasPermission('userA', 'repoB', 'write')

      expect(response).toEqual(false)
    })

  })
})
