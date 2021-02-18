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
          throw new Error(`${repo.name} does not have a datapackage`)
        } else {
          datapackage = _tempEntries[0]['object']['text']
          datapackage = JSON.parse(datapackage)
          datapackage.error = false
        }
      } catch (error) {
        // console.log(error);
        datapackage = {
          sample: [],
          schema: { fields: [] },
          title: '',
          description: '',
          name: '',
          author: '',
          geo: '',
          /*
        parsing error in datapackage.json. 
        Use to display in homepage and dataset page 
        **/
          error: true,
        }
      }

      // console.log();
      let data = {}
      data['sample'] = datapackage['sample'] || []
      data['title'] = datapackage['title'] || ''
      data['description'] = datapackage['description'] || 'No Description'
      data['name'] = repo['name'] || ''
      data['id'] = repo['id']
      data['createdAt'] = repo.createdAt
      data['updatedAt'] = repo.updatedAt
      data['format'] = datapackage['author'] || ''
      data['encoding'] = datapackage['encoding'] || ''
      data['continent'] = datapackage['continent'] || ''
      data['country'] = datapackage['country'] || ''
      data['region'] = datapackage['region'] || ''
      data['city'] = datapackage['city'] || ''
      data['author_website'] = datapackage['author_website'] || ''
      data['author_email'] = datapackage['author_email'] || ''
      data['start_date'] = datapackage['start_date'] || ''
      data['end_date'] = datapackage['end_date'] || ''
      data['logo'] = datapackage['logo'] || ''
      data['error'] = datapackage['error']

      if ('resources' in datapackage) {
        try {
          data['schema'] = datapackage['resources'][0]['schema'] || []
          data['resources'] = datapackage['resources']
        } catch (error) {
          data['schema'] = { fields: [] }
          data['resources'] = datapackage['resources']
        }
      }

      catalogs[repo['name']] = data
      desCatalogs.push(data)

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
    datapackage = {
      title: '',
      description: '',
      name: '',
      author: '',
      geo: '',
      schema: { fields: [] },
      /*
        parsing error in datapackage.json. 
        Use to display in homepage and dataset page 
        **/
      error: true,
    }
  }

  let data = {}
  data['sample'] = datapackage['sample'] || []
  data['title'] = datapackage['title'] || ''
  data['description'] = datapackage['description'] || 'No Description'
  data['name'] = repo['name'] || ''
  data['id'] = repo['id']
  data['createdAt'] = repo.createdAt
  data['updatedAt'] = repo.updatedAt
  data['format'] = datapackage['author'] || ''
  data['encoding'] = datapackage['encoding'] || ''
  data['continent'] = datapackage['continent'] || ''
  data['country'] = datapackage['country'] || ''
  data['region'] = datapackage['region'] || ''
  data['city'] = datapackage['city'] || ''
  data['author_website'] = datapackage['author_website'] || ''
  data['author_email'] = datapackage['author_email'] || ''
  data['start_date'] = datapackage['start_date'] || ''
  data['end_date'] = datapackage['end_date'] || ''
  data['logo'] = datapackage['logo'] || ''

  if ('resources' in datapackage) {
    data['resources'] = datapackage['resources']
    try {
      data['schema'] = datapackage['resources'][0]['schema'] || []
    } catch (error) {
      data['schema'] = { fields: [] }
    }
  }

  return data
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
