import Github from './Github'

require('dotenv').config()

export default class Metadata{
  constructor(){
    this.defaultOrg = process.env.GITHUB_ORG
    this.github = new Github()
  }

  /**
   * 
   * @param {String} dataset - dataset name
   * @param {String} path resource path
   * @param {String} org dataset organization owner
   */
  async checkMetadataExists(dataset, path, org = this.defaultOrg){
    const requestPah = `/repos/${org}/${dataset}/contents/${path}`
    const file = await this.github.restRequest(requestPah)

    if(file && file.sha) return file.sha
  }
}