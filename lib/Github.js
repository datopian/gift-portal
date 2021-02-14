/* eslint-disable max-len */
import axios from 'axios'

require('dotenv').config()

export default class Github{
  constructor(){
    this.token = process.env.APP_GITHUB_KEY
    this.defaultOrg = process.env.NEXT_PUBLIC_ORG_NAME
  }
  
  /**
   * 
   * @param {String} route - route to use on Github REST API
   */
  async restRequest(route){
    return axios({
      method: 'get',
      url: `https://api.github.com${route}`,
     
      headers: { 'Authorization': `bearer ${this.token}`}
    }).then(data => data.data)
      .catch(error => {
        throw new Error(`Error on REST API Request: ${error.message}`)
      })
  }

  /**
   * 
   * @param {String} query - GraphQl query  
   */
  async graphQlRequest(query){
    const response = await axios({
      method: 'post',
      url: 'https://api.github.com/graphql',
      headers: {
        'Authorization': `bearer ${this.token}`
      },
      data: {
        query
      }
    }).then(data => data.data)
      .catch(error => {
        throw new Error(`Error on GraphQl API Request: ${error.message}`)
      })


    return response
  }
 
  
}  



