import axios from 'axios'
const baseURL = 'http://localhost:3001/api/spotify'

const auth = async () => {
  const req = await axios.get(`${baseURL}/auth`)
  console.log(req.data)
  return req.data
}

const getRecs = async moodObj => {
  const req = await axios.post(`${baseURL}/recs`, moodObj)
  console.log('Recommendations: ', req.data)
  return req.data
}

export default { auth, getRecs }
