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