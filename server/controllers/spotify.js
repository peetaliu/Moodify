const axios = require('axios')
const qs = require('querystring')
const { Base64 } = require('js-base64')
const jwt = require('jsonwebtoken')
const spotifyRouter = require('express').Router()
const config = require('../utils/config')
const recURL = 'https://api.spotify.com/v1/recommendations'
const authURL = 'https://accounts.spotify.com/api/token'
require('express-async-errors')

//Authentication
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
  res.json({ tok: token })
})

//Get genres
spotifyRouter.post('/genres', async (req, res) => {
  const token = req.body
  const convTok = jwt.verify(token, process.env.SPOTIFY_SECRET)
  const genres = await axios.get(`${recURL}/available-genre-seeds`, {
    headers: { Authorization: `Bearer ${convTok}` },
  })
})

//Get recommendations
spotifyRouter.post('/recs', async (req, res) => {
  const moodObj = req.body
  const params = {
    seed_genres: moodObj.genres.join(),
    limit: '20',
    target_acousticness: (moodObj.energy / 10 + moodObj.aggression / 10) / 2,
    target_danceability: (moodObj.energy / 10 + moodObj.happy / 10) / 2,
    target_energy: moodObj.energy / 10,
    target_loudness: moodObj.aggression / 10,
    target_valence: moodObj.happy / 10,
  }
  const convTok = jwt.verify(moodObj.token, process.env.SPOTIFY_SECRET)

  const options = {
    method: 'GET',
    url: `${recURL}`,
    params: params,
    headers: {
      Authorization: `Bearer ${convTok}`,
    },
  }
  const recs = await axios(options)
  res.json(recs.data)
})

module.exports = spotifyRouter
