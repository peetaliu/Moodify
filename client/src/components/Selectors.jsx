import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Slider, Typography } from '@material-ui/core'
import { createRecs } from '../reducers/spotifyReducer'

const Selectors = props => {
  const [happiness, setHappiness] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [aggression, setAggression] = useState(5)
  const token = useSelector(state => state.auth)
  const tracks = useSelector(state => state.spotify)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const moodObj = {
      happy: happiness,
      energy: energy,
      aggression: aggression,
      token: token,
    }
    dispatch(createRecs(moodObj))
    console.log(tracks)
  }

  return (
    <div>
      <Typography>Happiness</Typography>
      <Slider
        defaultValue={5}
        step={1}
        min={0}
        max={10}
        marks={[
          { value: 0, label: 'Sad' },
          { value: 10, label: 'Happy' },
        ]}
        onChange={(e, value) => {
          setHappiness(value)
        }}
      />
      <Typography>Energy</Typography>
      <Slider
        defaultValue={5}
        step={1}
        min={0}
        max={10}
        marks={[
          { value: 0, label: 'Calm' },
          { value: 10, label: 'Energetic' },
        ]}
        onChange={(e, value) => {
          setEnergy(value)
        }}
      />
      <Typography>Aggression</Typography>
      <Slider
        defaultValue={5}
        step={1}
        min={0}
        max={10}
        marks={[
          { value: 0, label: 'Peaceful' },
          { value: 10, label: 'Aggressive' },
        ]}
        onChange={(e, value) => {
          setAggression(value)
        }}
      />
      <button onClick={handleSubmit}>Get Playlist</button>
    </div>
  )
}

const mapDispatchToProps = {
  createRecs,
}
export default connect(null, { mapDispatchToProps })(Selectors)
