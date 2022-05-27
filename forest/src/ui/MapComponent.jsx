import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const MapComponent = ({ state: { mapMarkers, selected }, dispatch }) =>

  <MapContainer
    style = {{ height: '70vh' }}
    center = {[ 5.4315253, 118.010532 ]}
    zoom = {8}
    scrollWheelZoom = { true }>

    <TileLayer
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      {mapMarkers.map((marker, idx) =>
        <Marker
          key={idx}
          eventHandlers={{
            click: () => {
              dispatch({type: 'browse->infrastructure|animal', marker})
            }
          }}
          position={[ marker.lat, marker.long ]}
          >
        </Marker>
      )}
  </MapContainer>

export default MapComponent
