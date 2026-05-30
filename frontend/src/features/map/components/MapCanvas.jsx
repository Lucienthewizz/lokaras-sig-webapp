import { MapContainer, TileLayer } from "react-leaflet";

import MapControls from "./MapControls";
import MapFlyTo from "./MapFlyTo";
import PlacesMarkerLayer from "./PlacesMarkerLayer";

// Component pembungkus Leaflet MapContainer dan layer marker
const MapCanvas = ({
  mapCenter,
  places,
  selectedPlace,
  isAuthenticated,
  onSelectPlace,
  onDeletePlace,
  onEditPlace,
}) => {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo selectedPlace={selectedPlace} />
        <MapControls selectedPlace={selectedPlace} />
        <PlacesMarkerLayer
          places={places}
          selectedPlace={selectedPlace}
          isAuthenticated={isAuthenticated}
          onSelectPlace={onSelectPlace}
          onDeletePlace={onDeletePlace}
          onEditPlace={onEditPlace}
        />
      </MapContainer>
    </div>
  );
};

export default MapCanvas;
