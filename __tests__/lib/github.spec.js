import * as github from '../../lib/github'
import axios from 'axios'
import moxios from 'moxios'

describe('Github Permissions tests', () => {

  const collaboratorsList = [
    {
      "login": "test-user",
      "permissions": {
        "pull": true,
        "push": true,
        "admin": false
      }
    }
  ]

  const datasetScope = {
    organization: 'datopian',
    dataset: 'repotest',
    editors: ['test-user'],
    readers: ['test-user'],
    admin: []
  }

  const token = {
    success: true,
    result: {
      requested_scopes: ['obj:/datopian/repotest/*:write'],
      granted_scopes: ['obj:/datopian/repotest/*:write'],
      token: 'token',
      user_id: ''

    }
  }
  beforeEach(() => {
    moxios.install(axios)
  })

  afterEach(() => {
    moxios.uninstall(axios)
  })
  it('should call github api', async () => {

    moxios.stubRequest('https://api.github.com', {
      status: 200,
      response: {}
    })

    const githubApi = await github.fetchGithubApi('')
    expect(githubApi).toEqual({})

  })

  it('should get a list of collaborators from some repository', async () => {


    moxios.stubRequest('https://api.github.com/repos/datopian/octocat/collaborators', {
      status: 200,
      response: collaboratorsList
    })

    const collaborators = await github.getRepositoryCollaborators('repotest')
    expect(collaborators).toEqual(collaboratorsList)
  })

  it('should format the list of collaborators', () => {

    const defaultList = collaboratorsList
    const parsedList = github.parserCollaboratorsList('repotest', defaultList)

    expect(parsedList).toEqual(datasetScope)
  })

  it('should thow an error if user is not inside dataset scope', () => {
    expect(() => github.isValidScope('repotest', 'tester')).toThrow('Invalid scope. Scope should be of form "datopian/repotest:read/write/admin')
  })

  it('should return an user github token', () => {
    
  })

  it('should get the organization, username and return a token', ()=>{

  })

  it('should get the organization, username and throw an error', ()=>{

  })

})