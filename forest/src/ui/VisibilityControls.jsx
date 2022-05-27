import {Fragment} from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Switch from '@mui/material/Switch'

const VisibilityControls = ({ state, dispatch }) => {

  const LABELS = [
    {
      label: "Animals",
      name: "animals",
      fn: () => dispatch({ type: 'toggleVisibility', collection: 'animals' })
    },
    {
      label: "Buildings",
      name: "buildings",
      fn: () => dispatch({ type: 'toggleVisibility', collection: 'buildings' })
    },
    {
      label: "Cameras",
      name: "cameras",
      fn: () => dispatch({ type: 'toggleVisibility', collection: 'cameras' })
    }
  ]

  return (

    <Fragment>
      <FormLabel component="legend">Map Controls</FormLabel>
      <FormGroup>
        {LABELS.map(({ label, name, fn }, idx) => {
          return (
            <Fragment key={idx}>
              <FormControlLabel key={idx} id={idx}
              control={<Switch />} checked={state.visibility[name]}
              onChange={fn}
              name={label} label={label} />
            </Fragment>
          )
        })}
      </FormGroup>
    </Fragment>
  )
}

export default VisibilityControls
