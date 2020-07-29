import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Slider,
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@material-ui/core'
import { createRecs } from '../reducers/recsReducer'
import { getAll, getPop } from '../reducers/genreReducer'

const Selectors = props => {
  const [happiness, setHappiness] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [aggression, setAggression] = useState(5)
  const [selectedGen, setSelectedGen] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const [popGenres, setPopGenres] = useState([])

  useEffect(() => {
    setPopGenres(props.genres.map(g => g))
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

  const getAllGenres = () => {
    props.getAll(props.auth)
    setAllGenres(props.genres)
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
      <div>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Genres - Select up to 5</FormLabel>
          <FormGroup>
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
        onClick={handleSubmit}
        disabled={selectedGen.length > 0 ? false : true}>
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
  getPop,
}

export default connect(mapStateToProps, mapDispatchToProps)(Selectors)
