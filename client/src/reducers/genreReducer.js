import spotifyService from '../services/spotifyService'

const genreReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL':
      console.log('action data ALL', action.data)
      return action.data
    case 'POP':
      console.log('action data POP', action.data)
      return action.data
    default:
      return state
  }
}

export const getAll = tok => {
  return async dispatch => {
    const genres = await spotifyService.getGenres(tok)
    dispatch({
      type: 'ALL',
      data: genres,
    })
  }
}

export const getPopular = () => {
  return dispatch => {
    dispatch({
      type: 'POP',
      data: [
        'hip-hop',
        'pop',
        'metal',
        'chill',
        'edm',
        'folk',
        'acoustic',
        'singer-songwriter',
        'r-n-b',
      ],
    })
  }
}

export default genreReducer
