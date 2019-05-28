import axios from 'axios'


const rootURL = 'https://skylabcoders.herokuapp.com/proxy?url=http://react-test-backend.us-east-1.elasticbeanstalk.com/analytics-events'

export default {
   async getEvents(gameID, provider, tpdID) {

    if (typeof gameID !== 'string') throw new Error(`gameID should be a string`)
    if (typeof provider !== 'string') throw new Error(`provider should be a string`)
    if (typeof tpdID !== 'string') throw new Error(`tpdID should be a string`)

    try {
     const results = await axios.get(`${rootURL}?gameId=${gameID}&provider=${provider}&tpdid=${tpdID}`)
      return results.data
    } catch (error) {
      throw new Error(`Error in calling API: ${error.message}`)
    }
  }
}
