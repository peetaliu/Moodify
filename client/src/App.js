import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import spotifyService from './services/spotifyService'
import Selectors from './components/Selectors'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    spotifyService.auth()
  })

  return (
    <div>
      <h1>Find your mood</h1>
      <Selectors />
    </div>
  )
}

export default App
