/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-async-promise-executor */
import * as metastore from 'metastore-lib-js'
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from './queries'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { initializeApollo } from './apolloClient'
import { processMultipleRepos, processSingleRepo } from './utils'

require('dotenv').config()
dayjs.extend(relativeTime)

export default class Metastore {
  constructor(initialApolloState) {
    this.apolloClient = initializeApollo(initialApolloState)
  }

  async search() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.apolloClient.readQuery({
          query: ALL_REPOSITRIES,
        })
        const repos = getRepositories(response)
        const [catalogs, desCatalogs] = await processMultipleRepos(repos)
        resolve(desCatalogs)
      } catch (error) {
        console.log(error)
        reject([])
      }
    })
  }

  async fetch(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.apolloClient.readQuery({
          query: SINGLE_REPOSITORY,
          variables: { name },
        })
        const repo = processSingleRepo(response.repository)
        resolve(repo)
      } catch (error) {
        console.log(error)
        reject([])
      }
    })
  }

  /**
   *
   * @param {String} objectId dataset name
   * @param {Object} userInfo user information
   * @param {Object} metadata datapackage.json object
   * @param {String} description datapackage.json description
   * @param {String} token user token
   */
  async create(objectId, userInfo, metadata, description, token) {
    return new Promise(async (resolve, reject) => {

      const user = { name: userInfo.name, email: userInfo.email }
      const config = {
        defaultAuthor: user,
        token: process.env.APP_GITHUB_KEY,
        org: process.env.NEXT_PUBLIC_ORG_NAME,
        lfsServerUrl: process.env.GIFTLESS_SERVER,
      }

      const storage = metastore.createMetastore('github', config)
      storage.create({
        objectId,
        metadata,
        defaultAuthor: user,
        description,
      }).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
   *
   * @param {String} objectId dataset name
   * @param {Object} userInfo user information
   * @param {Object} metadata datapackage.json object
   * @param {String} token user token
   */
  async update(objectId, userInfo, metadata, token) {
    return new Promise(async (resolve, reject) => {
      const user = { name: userInfo.name, email: userInfo.email }
      const config = {
        defaultAuthor: user,
        token: process.env.APP_GITHUB_KEY,
        org: process.env.NEXT_PUBLIC_ORG_NAME,
        lfsServerUrl: process.env.GIFTLESS_SERVER,
      }
      const storage = metastore.createMetastore('github', config)

      storage
        .update({
          objectId,
          metadata,
        })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  async delete() {
    throw new Error('Method has not been implemented!')
  }

  async deleteResource(objectId, userInfo, metadata, token, path) {
    return new Promise(async (resolve, reject) => {
      const user = { name: userInfo.name, email: userInfo.email }
      const config = {
        defaultAuthor: user,
        token: process.env.APP_GITHUB_KEY,
        org: process.env.NEXT_PUBLIC_ORG_NAME,
        lfsServerUrl: process.env.GIFTLESS_SERVER,
      }
      const storage = metastore.createMetastore('github', config)
      storage
        .delete({
          objectId,
          metadata,
          path,
          isResource: true
        })
        .then((response) => {
          console.log('Delete: ', response)
          return storage.update({
            objectId,
            metadata,
          })
        }).then((response) => {
          resolve(response)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })

  }
}

function getRepositories(response) {
  const { nodes } = response.viewer.organization.repositories
  const repos = {}
  nodes.forEach((node) => {
    repos[node.name] = node
  })
  return repos
}
