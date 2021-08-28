import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from './reducers/authReducer'
import { getPopular } from './reducers/genreReducer'
import TrackList from './components/TrackList'
import Selectors from './components/Selectors'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
    dispatch(getPopular())
  }, [dispatch])

  return (
    <div>
      <h1>Moodify</h1>
      <Selectors />
      <TrackList />
    </div>
  )
}

export default App
