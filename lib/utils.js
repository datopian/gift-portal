import axios from 'axios'
/* eslint-disable max-len */
export const processMultipleRepos = async (repos) => {
  let catalogs = []
  let desCatalogs = []
  const repoNames = Object.keys(repos).filter((repo) => repo != 'gift-os-types')
  const repoLen = repoNames.length - 1
  for (let i = 0; i < repoNames.length; i++) {
    const repo = repos[repoNames[i]]
    const datapackage = await processRepo(repo)
    catalogs[repo['name']] = datapackage
    desCatalogs.push(datapackage)
    if (i == repoLen) {
      return [catalogs, desCatalogs]
    }

  }
}

export const processSingleRepo = async (repo) => {
  return await processRepo(repo)
}


export const processRepo = async (repo) => {
  try {
    if (!repo.object) {
      let data = { name: repo['name'], id: repo['id'] }
      return data
    } else {
      const datapackage = await getRawDataPackage(repo.name)

      if (Object.keys(datapackage).length == 0) {
        let data = { name: repo['name'], id: repo['id'] }
        return data
      } else {
        let data = {}
        const fields = Object.keys(datapackage)
        fields.forEach((field) => {
          data[field] = datapackage[field] || ''
        })
        data['name'] = repo['name'] || ''
        data['id'] = repo['id']
        data['createdAt'] = repo.createdAt
        data['updatedAt'] = repo.updatedAt
        if ('resources' in datapackage && datapackage['resources'].length > 0) {
          data['resources'] = datapackage['resources']
          data['schema'] = datapackage['resources'][0]['schema'] || []
          data['sample'] = datapackage['resources'][0]['sample'] || []
        } else {
          data['schema'] = []
          data['sample'] = []
        }

        return data
      }
    }
  } catch (error) {
    return {}
  }
}


export const repoHasResource = (repo) => {
  if (
    !(Object.keys(repo).includes('resources') && repo['resources'].length >= 1)
  ) {
    return false
  } else {
    return true
  }
}

export function objectIsEmpty(obj) {
  return Object.keys(obj).length == 0
}

async function getRawDataPackage(repoName) {
  const link = `https://raw.githubusercontent.com/gift-data/${repoName}/main/datapackage.json`
  try {
    const { data } = await axios.get(link)
    return data
  } catch (error) {
    return {}
  }

}

export function getRepoNames(data) {
  const { nodes } = data.viewer.organization.repositories
  const repoNames = nodes.map((node) => {
    return node.name
  })
  return repoNames
}
