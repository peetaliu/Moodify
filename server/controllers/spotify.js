const axios = require('axios')
const qs = require('querystring')
const { Base64 } = require('js-base64')
const jwt = require('jsonwebtoken')
const spotifyRouter = require('express').Router()
const config = require('../utils/config')
const recURL = 'https://api.spotify.com/v1/recommendations'
const authURL = 'https://accounts.spotify.com/api/token'
require('express-async-errors')

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
  const convMood = {
    ac: `target_acousticness=${
      (moodObj.energy / 10 + moodObj.aggression / 10) / 2
    }`,
    dnc: `target_danceability=${
      (moodObj.energy / 10 + moodObj.happy / 10) / 2
    }`,
    enr: `target_energy=${moodObj.energy / 10}`,
    ld: `target_loudness=${moodObj.aggression / 10}`,
    va: `target_valence=${moodObj.happy / 10}`,
  }
  const convTok = jwt.verify(moodObj.token, process.env.SPOTIFY_SECRET)
  console.log(convMood)
  const options = {
    method: 'GET',
    url: `${recURL}?seed_genres=pop&limit=20&${convMood.ac}&${convMood.dnc}&${convMood.enr}&${convMood.va}`,
    headers: {
      Authorization: `Bearer ${convTok}`,
    },
  }
  console.log(options.url)
  const recs = await axios(options)
  res.json(recs.data)
})

module.exports = spotifyRouter
