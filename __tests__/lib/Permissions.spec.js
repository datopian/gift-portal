import Permissions from '../../lib/Permissions'

const permissions = new Permissions()

describe('Authenticate Tests', ()=>{
     it('should thow an error if requested scope is invalid', () => {
      expect(() => permissions.isValidScope('repotest', 'tester', 'datopian'))
        .toThrow('Invalid scope. Scope should be of form "datopian/repotest:read/write/admin')
    })

    it('should return a token with requested scopes',async ()=>{

      const dataSpy = jest.spyOn(permissions, 'getDataset')
      dataSpy.mockReturnValue({
        dataset: 'repotest',
        readers: ['user-test'],
        editors: ['user-test'],
        admins: []
      })

      const now = new Date()
      const expireDate = now.setSeconds(now.getSeconds() + 900)
      const token = {
        success: true,
        result: {
          requested_scopes: ['obj:/datopian/repotest/*.read', 'obj:/datopian/repotest/*.write'],
          granted_scopes: ['obj:/datopian/repotest/*.read', 'obj:/datopian/repotest/*.write'],
          token: 'tokenkey',
          user_id: 'user-test',
          expires_at: new Date(expireDate).toISOString()
        }
      }
      
      const responseToken = await permissions.authorize('user-test', 'repotest', 'write')
      expect(responseToken).toEqual(token)
    })
    
})