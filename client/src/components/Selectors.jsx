import React from 'react'
import { Slider } from '@material-ui/core'

const Selectors = props => {
  return <Slider defaultValue={5} step={1} min={0} max={10} />
}

export default Selectors
