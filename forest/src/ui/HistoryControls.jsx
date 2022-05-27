import { Fragment } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const HistoryControls = ({state, dispatch}) => {


  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
      </Grid>
        <Grid item xs={12}>
          <Fragment>
            <Button variant="outlined" sx={{ margin: 1 }} onClick={() => dispatch({ type:'changeSlice', direction:-100 })}>- 100</Button>
            <Button variant="outlined" sx={{ margin: 1 }} onClick={() => dispatch({ type:'changeSlice', direction:+100 })}>+ 100</Button>
          </Fragment>
        </Grid>
        <Grid item xs={12}>
          <Fragment>
            <Button variant="outlined" sx={{ margin: 1 }} onClick={() => dispatch({ type:'resetSlice' })}>Reset Count</Button>
            <Button variant="outlined" sx={{ margin: 1 }} onClick={() => dispatch({ type:'maxSlice' })}>All Records</Button>
          </Fragment>
        </Grid>
    </Grid>
  )
}

export default HistoryControls
