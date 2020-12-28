import Permissions from '../../lib/Permissions'

const permissions = new Permissions()

describe('Authenticate Tests', ()=>{
     it('should thow an error if requested scope is invalid', () => {
      expect(() => permissions.isValidScope('repotest', 'tester', 'datopian'))
        .toThrow('Invalid scope. Scope should be of form "datopian/repotest:read/write/admin')
    })

    
    
})