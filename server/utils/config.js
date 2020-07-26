require('dotenv').config()

let PORT = process.env.PORT
let SPOTIFY_ID = process.env.SPOTIFY_ID
let SPOTIFY_SECRET = process.env.SPOTIFY_SECRET

module.exports = {
  PORT,
  SPOTIFY_ID,
  SPOTIFY_SECRET,
}
