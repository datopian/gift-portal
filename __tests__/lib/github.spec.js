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

})
