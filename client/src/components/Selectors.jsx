import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import {
  Slider,
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { createRecs } from '../reducers/recsReducer'
import { getAll, getPopular } from '../reducers/genreReducer'

const Selectors = props => {
  const [happiness, setHappiness] = useState(1)
  const [energy, setEnergy] = useState(1)
  const [aggression, setAggression] = useState(1)
  const [selectedGen, setSelectedGen] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const [popGenres, setPopGenres] = useState([])

  useEffect(() => {
    setPopGenres(props.genres.map(g => g))
    console.log('props', props)
    setAllGenres(getAll(props.auth))
  }, [props.genres])

  const handleSubmit = () => {
    const moodObj = {
      happy: happiness,
      energy: energy,
      aggression: aggression,
      token: props.auth,
      genres: selectedGen,
    }
    props.createRecs(moodObj)
  }

  const handleGenreToggle = event => {
    setSelectedGen(
      !selectedGen.includes(event.target.name)
        ? [...selectedGen, event.target.name]
        : selectedGen.filter(g => g !== event.target.name)
    )
  }

  return (
    <div id='selectors'>
      <Container>
        <Typography>Mood</Typography>
        <Slider
          className='slider'
          defaultValue={1}
          valueLabelDisplay='auto'
          step={1}
          min={1}
          max={10}
          marks={[
            { value: 1, label: 'Sad' },
            { value: 10, label: 'Happy' },
          ]}
          onChange={(e, value) => {
            setHappiness(value)
          }}
        />
        <Typography>Energy</Typography>
        <Slider
          className='slider'
          defaultValue={1}
          valueLabelDisplay='auto'
          step={1}
          min={1}
          max={10}
          marks={[
            { value: 1, label: 'Calm' },
            { value: 10, label: 'Energetic' },
          ]}
          onChange={(e, value) => {
            setEnergy(value)
          }}
        />
        <Typography>Ambience</Typography>
        <Slider
          className='slider'
          defaultValue={1}
          valueLabelDisplay='auto'
          step={1}
          min={1}
          max={10}
          marks={[
            { value: 1, label: 'Peaceful' },
            { value: 10, label: 'Aggressive' },
          ]}
          onChange={(e, value) => {
            setAggression(value)
          }}
        />
      </Container>
      <div>
        <FormControl component='fieldset'>
          <FormLabel component='legend' className='label'>
            Genres - Select up to 5
          </FormLabel>
          <FormGroup className='genreBoxes'>
            {popGenres.map(g => (
              <FormControlLabel
                key={g}
                control={<Checkbox onChange={handleGenreToggle} name={g} />}
                label={g}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
      <button
        className='cta-button'
        onClick={handleSubmit}
        disabled={
          selectedGen.length > 0 && selectedGen.length < 6 ? false : true
        }>
        Get Playlist
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    genres: state.genres,
  }
}

const mapDispatchToProps = {
  createRecs,
  getAll,
  getPop: getPopular,
}

export default connect(mapStateToProps, mapDispatchToProps)(Selectors)
