import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { authenticate } from './reducers/authReducer'
import Selectors from './components/Selectors'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])
  return (
    <div>
      <h1>Find your mood</h1>
      <Selectors />
    </div>
  )
}

export default App
