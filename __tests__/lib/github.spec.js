import Github from '../../lib/Github'
import axios from 'axios'
import moxios from 'moxios'
require('dotenv').config()

const github = new Github()

describe('Github Library Tests', () => {
  const collaboratorsList = [
    {
      login: 'test-user',
      permissions: {
        pull: true,
        push: true,
        admin: false,
      },
    },
  ]

  const repoInfo = {
    name: 'repotest',
    owner: {
      login: 'datopian',
    },
    private: false,
    permissions: {
      admin: false,
      pull: true,
      push: false,
    },
  }

  const repoListResponse = {
    data: {
      organization: {
        login: 'datopian',
        repositories: {
          pageInfo: {
            hasNextPage: false,
          },
          nodes: [
            {
              name: 'repoa',
            },
            {
              name: 'repob',
            },
          ],
        },
      },
    },
  }

  const graphQLResponse = {
    data: {
      organization: {
        repositories: {
          totalCount:1,
          pageInfo: 'Y3Vyc29yOnYyOpHOFBwvIQ',
          hasNextPage: false,
          nodes:[
            {
              isPrivate: false,
              name: 'repoA',
              colaborators:{
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
  }

  beforeEach(() => {
    moxios.install(axios)

    moxios.stubRequest(
      'https://api.github.com/repos/datopian/repotest/collaborators',
      {
        status: 200,
        response: collaboratorsList,
      }
    )

    moxios.stubRequest('https://api.github.com/repos/datopian/repotest', {
      status: 200,
      response: repoInfo,
    })
  })

  afterEach(() => {
    moxios.uninstall(axios)
  })

  describe('APIs Request Methods', () => {
    it('should call Github REST API', async () => {
      moxios.stubRequest('https://api.github.com', {
        status: 200,
        response: {},
      })

      const response = await github.restRequest('')
      expect(response).toEqual({})
    })

    it('should call Github GraphQL API', async () => {
      moxios.stubRequest('https://api.github.com/graphql', {
        status: 200,
        response: {},
      })

      const response = await github.graphQlRequest('')
      expect(response).toEqual({})
    })
  })

  describe('Main Requests', () => {
    it('should return all repositories given an organization name',
      async () => {
        moxios.stubRequest('https://api.github.com/graphql', {
          status: 200,
          response: repoListResponse,
        })

        const response = await github.getOrgRepos('datopian')
        expect(response).toEqual({
          organization: 'datopian',
          repositories: [
            {
              name: 'repoa',
            },
            {
              name: 'repob',
            },
          ],
        })
      })

    it('should get a list of collaborators from given the repository name', 
      async () => {
        const collaborators = await github.getRepositoryCollaborators(
          'repotest',
          'datopian'
        )

        expect(collaborators).toEqual(collaboratorsList)
      })

    it('should return the repository default info given the repository name', 
      async () => {
        const response = await github.getRepositoryInformation(
          'repotest',
          'datopian'
        )

        expect(response).toEqual(repoInfo)
      })
  })

  describe('Formatters', () => {

    it('should parser the datasets permissions given graphQl reponse', ()=>{

      const response = github.parserPermissions(graphQLResponse)

      expect(response).toEqual([{
        dataset: 'repoA',
        readers: [ 'PUBLIC', 'LOGGED_IN', 'userA', 'userB', 'userC'],
        editors: ['userA', 'userC'],
        admins: ['userA']
      }])
    })
    it('should parser dataset scope given the repository and organization', 
      async () => {
        const scopes = await github.getScopes('repotest', 'datopian')

        expect(scopes).toEqual({
          dataset: 'repotest',
          readers: ['PUBLIC', 'LOGGED_IN', 'test-user'],
          editors: ['test-user'],
          admins: [],
        })
      })
  })
})
