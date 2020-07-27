import axios from 'axios'

const auth = async () => {
  const req = await axios.get('/auth')
  console.log('Auth: ', req.data)
  return req.data
}

const getRecs = async moodObj => {
  const req = await axios.post('/rec', moodObj)
  console.log('Recommendations: ', req.data)
  return req.data
}

export default { auth, getRecs }
