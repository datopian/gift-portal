import * as authorization from '../../lib/authorization'
import axios from 'axios'
import moxios from 'moxios'

describe('Github Permissions tests', () => {

  const collaboratorsList = [
    {
      "login": "octocat",
      "permissions": {
        "pull": true,
        "push": true,
        "admin": false
      }
    }
  ]

  const datasetScope = {
    organization: 'github',
    dataset: 'repotest',
    editors: ['octocat'],
    readers: ['octocat'],
    admin: []
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

    const githubApi = await authorization.fetchGithubApi('')
    expect(githubApi).toEqual({})

  })

  it('should get a list of collaborators from some repository', async () => {


    moxios.stubRequest('https://api.github.com/repos/github/octocat/collaborators', {
      status: 200,
      response: collaboratorsList
    })

    const collaborators = await authorization.getRepositoryCollaborators('github', 'octocat')
    expect(collaborators).toEqual(collaboratorsList)
  })

  it('should format the list of collaborators', () => {

    const defaultList = collaboratorsList
    const parsedList = authorization.parserCollaboratorsList('github', 'repotest', defaultList)

    expect(parsedList).toEqual(datasetScope)
  })

  it('should thow an error if user is not inside dataset scope', () => {
    expect(() => authorization.isValidScope(datasetScope, 'tester')).toThrow('Invalid scope. Scope should be of form "github/repotest:read/write/admin')
  })

  it('should give and user authorization token', () => {

  })

  it('should get the organization, username and return a token', ()=>{

  })

  it('should get the organization, username and throw an error', ()=>{
    
  })

})