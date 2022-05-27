import { useReducer, useState, Fragment, useEffect } from 'react'
import HistoryControls from './ui/HistoryControls.jsx'
import InfoBox from './ui/InfoBox.jsx'
import MapComponent from './ui/MapComponent.jsx'
import VisibilityControls from './ui/VisibilityControls.jsx'
import callFetch from './logic/callFetch.js'
import initial from './logic/initial.js'
import actions from './logic/actions.js'
import Grid from '@mui/material/Grid'

const SURFACE = { projection: { name: 1, lat: 1, long: 1, collection: 1 } }

const throwError = type => { throw new Error(`action ${type} was not found.`) }
const reducer = (previous, action) => !!actions[action.type]
  ? actions[action.type](previous, action)
  : throwError(action.type)

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initial)

  const [ data, setData ] = useState({
    animals: [ { lat: '5.431', long: '118.010' } ],
    buildings: [ { lat: '5.431', long: '118.010' } ],
    cameras: [ { lat: '5.431', long: '118.010' } ]
  })

  useEffect(() => {
    if (state.fetched === 'requested') {
      callFetch({}, SURFACE, (json) => {
        setData(json)
        if (state.fetched === 'requested') {
          console.log('Waiting...')
        }
        dispatch({ type: 'useEffect:fetched', ...json })
        dispatch({ type: '->browse' })
      })
    }
    if (state.animalHistoryFetched === 'requested') {
      callFetch({_id:state.selected._id}, {projection:{history:{ $slice:-state.animalSlice }}}, (json) => {
        setData(json)
        if (state.animalHistoryFetched === 'requested') {
          console.log('Waiting...')
        }
        console.log(json)
        dispatch({ type: 'useEffect:animalHistoryFetched', animalHistory:json, animalHistoryCount:100 })
      }, true)
    }
  })

  console.log(data)
  console.log(state)

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <MapComponent state={state} dispatch={dispatch} />
      </Grid>
      {state.mode === 'browse' || state.mode === 'history' ?
        <Fragment>
          <Grid item xs={3}>
            {state.mode === 'browse' ?
              <VisibilityControls state={state} dispatch={dispatch} />
            :
              <HistoryControls state={state} dispatch={dispatch} />
            }
          </Grid>
          <Grid item xs={9}>
            <InfoBox state={state} dispatch={dispatch} />
          </Grid>
        </Fragment>
      :
        <Fragment>
          <Grid item xs={12}>
            <InfoBox state={state} dispatch={dispatch} />
          </Grid>
        </Fragment>
      }
    </Grid>
  )
}

export default App
