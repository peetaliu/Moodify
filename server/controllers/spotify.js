const axios = require('axios')
const qs = require('querystring')
const { Base64 } = require('js-base64')
const spotifyRouter = require('express').Router()
const config = require('../utils/config')
const recURL = 'https://api.spotify.com/v1/recommendations'
const authURL = 'https://accounts.spotify.com/api/token'

spotifyRouter.get('/auth', async (req, res) => {
  const authStr = Base64.encode(`${config.SPOTIFY_ID}:${config.SPOTIFY_SECRET}`)
  const options = {
    method: 'POST',
    url: authURL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authStr}`,
    },
    data: qs.stringify({ grant_type: 'client_credentials' }),
  }
  const success = await axios(options)
  console.log('res data', success.data)
})

module.exports = spotifyRouter
