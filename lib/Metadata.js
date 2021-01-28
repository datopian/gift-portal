import Github from './Github'
import Permissions from './Permissions'
import * as metastore from 'metastore-lib-js'

require('dotenv').config()

export default class Metadata {
  constructor() {
    this.github = new Github()
    this.permissions = new Permissions()
  }

  /**
   *
   * @param {String} objectId dataset name
   * @param {Object} userInfo user information
   * @param {Object} metadata datapackage.json object
   * @param {String} description datapackage.json description
   * @param {String} token user token
   */
  async createMetadata(objectId, userInfo, metadata, description, token) {
    try {
      const user = { name: userInfo.name, email: userInfo.email }
      const config = {
        defaultAuthor: user,
        token,
        org: process.env.ORGANISATION_REPO,
        // lfsServerUrl: process.env.GIFTLESS_SERVER,
      }

      const storage = metastore.createMetastore('github', config)

      const response = await storage.create({
        objectId,
        metadata,
        defaultAuthor: user,
        description,
      })

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
   *
   * @param {String} objectId dataset name
   * @param {Object} userInfo user information
   * @param {Object} metadata datapackage.json object
   * @param {String} readMe - readme file content
   * @param {String} token user token
   */
  async updateMetadata(objectId, userInfo, metadata, readMe, token) {
    const user = { name: userInfo.name, email: userInfo.email }
    const config = {
      defaultAuthor: user,
      token,
      org: process.env.ORGANISATION_REPO,
      lfsServerUrl: process.env.GIFTLESS_SERVER,
    }
    const storage = metastore.createMetastore('github', config)

    const response = await storage.update({
      objectId,
      metadata,
      readMe,
      branch: 'main',
    })

    return response
  }

  /**
   * 
   * @param {Number} id 
   * @param {Object} userInfo 
   */
  async fetchMetadata(id, userInfo, token) {
    const user = { name: userInfo.name, email: userInfo.email }
    const config = {
      defaultAuthor: user,
      token,
      org: process.env.ORGANISATION_REPO,
      lfsServerUrl: process.env.GIFTLESS_SERVER,
    }

    const storage = metastore.createMetastore('github', config)

    let datapackage
    try {
      datapackage = await storage.fetch(id)
    } catch(e) {
      return false
    }

    return datapackage
  }
}
