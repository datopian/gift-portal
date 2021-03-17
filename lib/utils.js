/* eslint-disable max-len */
export const processMultipleRepos = async (repos) => {
  const repoNames = Object.keys(repos)
  return new Promise((resolve) => {
    let catalogs = []
    let desCatalogs = []
    let repoLen = repoNames.length - 1
    repoNames.forEach((repoName, i) => {
      const repo = repos[repoName]
      let datapackage

      try {
        const entries = repo.object.entries
        let _tempEntries = entries.filter((entry) => {
          return entry.name === 'datapackage.json'
        })

        if (_tempEntries.length == 0) {
          throw new Error(`${repo.name} does not have a data package`)
        } else {
          datapackage = _tempEntries[0]['object']['text']
          datapackage = JSON.parse(datapackage)
          datapackage.error = false
        }
      } catch (error) {
        datapackage = {}
      }

      if (Object.keys(datapackage).length == 0) {
        let data = { name: repo['name'], id: repo['id'] }
        catalogs[repo['name']] = data
        desCatalogs.push(data)
      } else {
        let data = {}
        const fields = Object.keys(datapackage)
        fields.forEach((field) => {
          data[field] = datapackage[field] || ''
        })
        data['sample'] = datapackage['sample'] || []
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
        catalogs[repo['name']] = data
        desCatalogs.push(data)
      }
      if (i == repoLen) {
        resolve([catalogs, desCatalogs])
      }
    })
  })
}

export const processSingleRepo = (repo) => {
  let datapackage

  try {
    const entries = repo.object.entries
    let _tempEntries = entries.filter((entry) => {
      return entry.name === 'datapackage.json'
    })

    if (_tempEntries.length == 0) {
      throw new Error(`${repo.name} does not have a datapackage`)
    } else {
      datapackage = _tempEntries[0]['object']['text']
      datapackage = JSON.parse(datapackage)
      datapackage.error = false
    }
  } catch (error) {
    console.log(error)
    datapackage = {}
  }

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
      data['sample'] = datapackage['resources'][0]['sample']  || []
    } else {
      data['schema'] = []
      data['sample'] = []
    }

    return data
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

export function getRepoNames(data) {
  const { nodes } = data.viewer.organization.repositories
  const repoNames = nodes.map((node) => {
    return node.name
  })
  return repoNames
}
