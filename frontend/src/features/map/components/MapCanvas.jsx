import { MapContainer, TileLayer } from "react-leaflet";

import MapControls from "./MapControls";
import MapFlyTo from "./MapFlyTo";
import PlacesMarkerLayer from "./PlacesMarkerLayer";

const MapCanvas = ({
  mapCenter,
  places,
  selectedPlace,
  isAuthenticated,
  onSelectPlace,
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
        />
      </MapContainer>
    </div>
  );
};

export default MapCanvas;
