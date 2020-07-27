import spotifyService from '../services/spotifyService'

const spotifyReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_RECS':
      return action.data
    default:
      return state
  }
}

export const createRecs = moodObj => {
  return async dispatch => {
    const recs = await spotifyService.getRecs()
    dispatch({
      type: 'NEW_RECS',
      data: recs,
    })
  }
}

export default spotifyReducer
