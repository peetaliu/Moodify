import axios from 'axios'
const baseURL = 'http://localhost:3001/api/spotify'

const auth = async () => {
  const req = await axios.get(`${baseURL}/auth`)
  return req.data
}

const getGenres = async obj => {
  const req = await axios.post(`${baseURL}/genres`, obj)
  return req.data
}

const getRecs = async moodObj => {
  const req = await axios.post(`${baseURL}/recs`, moodObj)
  return req.data
}

export default { auth, getRecs, getGenres }
