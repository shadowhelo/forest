import { Fragment } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const InfoBox = ({ state, dispatch }) => {

  console.log(state.mode)

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
      </Grid>
        <Grid item xs={9}>
          {['animal','infrastructure'].includes(state.mode) ?
            <Fragment>
              <p>Name: {state.infoBox?.name}</p>
              <p>Lat: {state.infoBox?.lat} </p>
              <p>Long: {state.infoBox?.long} </p>
            </Fragment>
          : null}
          {['history','browse'].includes(state.mode) ?
            <p>Click on a marker</p>
          : null}
        </Grid>
        <Grid item xs={3}>
        {['animal','infrastructure','history'].includes(state.mode) ?
           <Button sx={{ float: 'right', margin: 2 }} variant="outlined" onClick={() => dispatch({ type:'->browse' })}>Back to Browse</Button>
        : null}
          {state.mode === 'animal' ?
             <Button sx={{ float: 'right', margin: 2 }} variant="outlined" onClick={() => dispatch({ type:'animal->history' })}>History</Button>
          : null}
        </Grid>
    </Grid>
  )
}

export default InfoBox
