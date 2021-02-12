import Permissions from '../../lib/Permissions'
import { initializeApollo } from "../../lib/apolloClient"

const permissions = new Permissions()



const graphQLResponse = {
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
              }
            ]
          }
        }
      ]
    },
  }
}


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

    it('should parser the datasets permissions given graphQl reponse', ()=>{

      const response = permissions._parserPermissions(graphQLResponse)

      expect(response).toEqual([{
        dataset: 'repoA',
        readers: [ 'PUBLIC', 'LOGGED_IN', 'userA', 'userB', 'userC'],
        editors: ['userA', 'userC'],
        admins: ['userA']
      }])
    })

    it('should return true if user has permission', async ()=> {
      const apollo = initializeApollo()
      const mock = jest.spyOn(apollo, 'readQuery')
      mock.mockReturnValue(graphQLResponse)
      const response = await permissions
        .userHasPermission('userA', 'repoA', 'write')

      expect(response).toEqual(true)
    })

    it('should return false if user has no permission', async ()=> {
      const apollo = initializeApollo()
      const mock = jest.spyOn(apollo, 'readQuery')
      mock.mockReturnValue(graphQLResponse)

      const response = await permissions
        .userHasPermission('userB', 'repoA', 'write')

      expect(response).toEqual(false)
    })

  })
})
