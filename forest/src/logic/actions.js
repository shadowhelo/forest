const resetAnimalHistory = () => ({
  animalHistory: [],
  animalSlice: 100,
  animalHistoryCount: -1,
  animalHistoryFetched: 'nothing'
})


export default {
  'useEffect:fetched': (previous, { buildings, animals, cameras }) => ({
    ...previous,
    fetched: 'nothing',
    markers: { buildings, animals, cameras }
  }),

  // Clicking any marker.
  'browse->infrastructure|animal': (previous, { marker }) => ({
    ...previous,
    mode: marker.collection === 'animals' ? 'animal' : 'infrastructure',
    selected: marker,
    infoBox: marker
  }),

  // Clicking return to browse mode.
  '->browse': previous => ({
    ...previous,
    fetched: 'nothing',
    mode: 'browse',
    selected: null,
    infoBox: null,
    ...resetAnimalHistory(),
    mapMarkers: [
      ...previous.markers.buildings,
      ...previous.markers.animals,
      ...previous.markers.cameras
    ]
  }),

  // Clicking 'show history'.
  'animal->history': previous => ({
    ...previous,
    mode: 'history',
    infoBox: null,
    animalHistoryFetched: 'requested'
  }),
  'useEffect:animalHistoryFetched': (previous, { animalHistory, animalHistoryCount, error }) => {
    return {
      ...previous,
      error: error ?? previous.error,
      animalHistory,
      animalHistoryCount,
      animalHistoryFetched: 'nothing',
      mapMarkers: animalHistory.animals[0].history
    }
  },

  // Clicking any marker in history mode.
  'history->historical': (previous, { marker }) => ({
    ...previous,
    mode: 'historical',
    infoBox: marker
  }),

  // Closing infoBox.
  'historical->history': previous => ({
    ...previous,
    mode: 'history',
    infoBox: null
  }),

  // Clicking a visibility slider.
  'toggleVisibility': (previous, { collection }) => {
    const visibility = {
      ...previous.visibility,
      [collection]: !previous.visibility[collection]
    }

    return {
      ...previous,
      visibility,
      mapMarkers: [
        ...visibility.buildings ? previous.markers.buildings : [],
        ...visibility.animals ? previous.markers.animals : [],
        ...visibility.cameras ? previous.markers.cameras : []
      ]
    }
  },

  // Clicking a load/hide button in history mode.
  'changeSlice': (previous, { direction }) => ({
    ...previous,
    animalSlice: previous.animalSlice + direction,
    animalHistoryFetched: 'requested'
  }),

  // Clicking reset count button in history mode.
  'resetSlice': previous => ({
    ...previous,
    animalSlice: 100,
    animalHistoryFetched: 'requested'
  }),

  // Clicking the 'load all' button.   **Fix**
  'maxSlice': previous => ({
    ...previous,
    animalSlice: 10000,
    animalHistoryFetched: 'requested'
  }),
}
