import spotifyService from '../services/spotifyService'

const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'AUTH':
      return action.data
    case 'REFRESH':
      return action.data
    default:
      return state
  }
}

export const authenticate = () => {
  return async dispatch => {
    const tok = await spotifyService.auth()
    dispatch({
      type: 'AUTH',
      data: tok.tok,
    })
  }
}

export const refresh = () => {
  return async dispatch => {
    const tok = await spotifyService.auth()
    dispatch({
      type: 'REFRESH',
      data: tok.tok,
    })
  }
}

export default authReducer
