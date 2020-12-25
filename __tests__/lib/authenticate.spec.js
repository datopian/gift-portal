import * as auth from '../../lib/Authenticate'

describe('Authenticate Tests', ()=>{
     it('should thow an error if requested scope is invalid', () => {
      expect(() => auth.isValidScope('repotest', 'tester', 'datopian'))
        .toThrow('Invalid scope. Scope should be of form "datopian/repotest:read/write/admin')
    })
})