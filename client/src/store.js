import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import spotifyReducer from './reducers/spotifyReducer'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
  spotify: spotifyReducer,
  auth: authReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
