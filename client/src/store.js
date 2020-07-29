import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import recsReducer from './reducers/recsReducer'
import authReducer from './reducers/authReducer'
import genreReducer from './reducers/genreReducer'

const reducer = combineReducers({
  recs: recsReducer,
  auth: authReducer,
  genres: genreReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
