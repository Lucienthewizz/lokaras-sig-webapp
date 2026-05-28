import MapCanvas from "./components/MapCanvas";
import MapEmptyState from "./components/MapEmptyState";
import MapViewSwitcher from "./components/MapViewSwitcher";
import PlacesTableView from "./components/PlacesTableView";
import { defaultCenter } from "./config/mapConfig";

const getPlacePosition = (place) => [
  Number(place.latitude),
  Number(place.longitude),
];

const getInitialMapCenter = (selectedPlace, validPlaces) => {
  if (selectedPlace?.latitude && selectedPlace?.longitude) {
    return getPlacePosition(selectedPlace);
  }

  if (validPlaces.length > 0) {
    return getPlacePosition(validPlaces[0]);
  }

  return defaultCenter;
};

const MapView = ({
  places,
  selectedPlace,
  activeView,
  isAuthenticated,
  onChangeView,
  onSelectPlace,
}) => {
  const validPlaces = places.filter((place) => {
    return place.latitude && place.longitude;
  });
  const mapCenter = getInitialMapCenter(selectedPlace, validPlaces);
  const isMapView = activeView === "map";

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--base-1)">
      <MapViewSwitcher activeView={activeView} onChangeView={onChangeView} />

      {isMapView ? (
        <MapCanvas
          mapCenter={mapCenter}
          places={validPlaces}
          selectedPlace={selectedPlace}
          isAuthenticated={isAuthenticated}
          onSelectPlace={onSelectPlace}
        />
      ) : (
        <PlacesTableView places={places} />
      )}

      {isMapView && validPlaces.length === 0 && <MapEmptyState />}
    </div>
  );
};

export default MapView;
