import axios from 'axios'

const grapqlApiRoute = 'https://api.github.com/graphql'

async function githubGraphqlAPI(token, query) {
  const response = await axios({
    method: 'post',
    url: grapqlApiRoute,
    headers: {
      'Authorization': `bearer ${token}`
    },
    data: {
      query
    }
  })


  return response.data.data
}

async function fetchOrganizationList(token, data = [], pageCursor) {
  const query = `query {
    viewer  {
      organizations(first: 100 ${pageCursor ? ',after: "' + pageCursor + '"' : ''}) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          login
        }
      }
    }
  }`

  const response = await githubGraphqlAPI(token, query)

  data.push(...response.viewer.organizations.nodes.map(item => item.login))

  if (response.viewer.organizations.pageInfo.hasNextPage) {
    return fetchOrganizationList(token, data, response.viewer.organizations.pageInfo.endCursor)
  }

  return data
}

async function fetchUserOrganizationPermissions(token, username, organization, data = [], pageCursor) {
  const query = `{
    user(login: "${username}") {
      organization(login: "${organization}") {
        repositories(first: 100 ${pageCursor ? ',after: "' + pageCursor + '"' : ''}) {
          pageInfo {
              hasNextPage
              endCursor
            }
          nodes {
            name
            viewerPermission
          }
        }
      }
    }
  }`

  const response = await githubGraphqlAPI(token, query)
  
  data.push(...response.user.organization.repositories.nodes)
 
  if (response.user.organization.repositories.pageInfo.hasNextPage) {
    return fetchUserOrganizationPermissions(token, username, organization, data, response.user.organization.repositories.pageInfo.endCursor)
  }

  return data

}

export default async function fetchUserRoles(token , username){
  const organizations = await fetchOrganizationList(token)
  
  const organizationsWithRoles = await Promise.all(organizations.map(async org => ({[org]: await fetchUserOrganizationPermissions(token, username, org)}) ))

  return organizationsWithRoles
}