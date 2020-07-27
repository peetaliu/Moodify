import React from 'react'
import { connect } from 'react-redux'
import { Slider } from '@material-ui/core'
import { createRecs } from '../reducers/spotifyReducer'

const Selectors = props => {
  return (
    <div>
      <Slider defaultValue={5} step={1} min={0} max={10} />
      <Slider defaultValue={5} step={1} min={0} max={10} />
      <Slider defaultValue={5} step={1} min={0} max={10} />
      <Slider defaultValue={5} step={1} min={0} max={10} />
    </div>
  )
}

const mapDispatchToProps = {
  createRecs,
}
export default connect(null, { mapDispatchToProps })(Selectors)
