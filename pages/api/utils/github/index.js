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

