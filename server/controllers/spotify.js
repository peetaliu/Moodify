const axios = require('axios')
const qs = require('querystring')
const { Base64 } = require('js-base64')
const jwt = require('jsonwebtoken')
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
  const token = jwt.sign(success.data.access_token, process.env.SPOTIFY_SECRET)
  // const decodedToken = jwt.verify(token, process.env.SPOTIFY_SECRET)
  // console.log('suc obj: ', success.data.access_token)
  // console.log('token: ', token)
  // console.log('decoded: ', decodedToken)
  res.json({ tok: token })
})

spotifyRouter.post('/recs', async (req, res) => {
  const moodObj = req.body

  const options = {
    method: 'POST',
    url: recURL,
    headers: {
      Authorization: `Bearer ${moodObj.tok}`,
    },
  }
})

module.exports = spotifyRouter
