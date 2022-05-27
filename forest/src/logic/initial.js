const MODES = [
  'browse', 'infrastructure', 'animal', 'history', 'historical'
]

const FETCH_STATUSES = [
  'nothing', 'requested', 'processing'
]

export default {
  // Determines if the initial load has taken place.
  fetched: 'requested',

  // Determines how the ui will render.
  mode: 'browse',

  // Colors the UI.
  theme: 'default',

  // Toggles markers on the map by collection.
  visibility: {
    buildings: true,
    animals: true,
    cameras: true
  },

  // Generic error container.
  error: {
    name: '',
    message: ''
  },

  selected: null,

  // Information box object.
  infoBox: null,

  // Top level mongo objects.
  markers: {
    buildings: [ { lat: '5.431', long: '118.010' } ],
    animals: [ { lat: '5.431', long: '118.010' } ],
    cameras: [ { lat: '5.431', long: '118.010' } ]
  },

  // Stores the loaded history for the currently selected animal,
  // which has had it's 'show history' button clicked.
  animalHistory: [],
  animalSlice: 100,
  animalHistoryCount: -1,
  animalHistoryFetched: 'nothing',

  // Objects to display on the map.
  mapMarkers: []
}
