const config = require('./utils/config')
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()

const cors = require('cors')
const spotifyRouter = require('./controllers/spotify')

// if(process.env.NODE_ENV === 'production'){
//   app.use(session({}))
// }

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/spotify', spotifyRouter)

module.exports = app
