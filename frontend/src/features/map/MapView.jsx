import MapAuthStatus from "./components/MapAuthStatus";
import MapCanvas from "./components/MapCanvas";
import MapEmptyState from "./components/MapEmptyState";
import MapViewSwitcher from "./components/MapViewSwitcher";
import PlacesTableView from "./components/PlacesTableView";
import { defaultCenter } from "./config/mapConfig";

// fungsi untuk mengambil posisi latitude dan longitude dari data tempat
const getPlacePosition = (place) => [
  Number(place.latitude),
  Number(place.longitude),
];

// fungsi untuk menentukan titik tengah awal map
const getInitialMapCenter = (selectedPlace, validPlaces) => {
  if (selectedPlace?.latitude && selectedPlace?.longitude) {
    return getPlacePosition(selectedPlace);
  }

  if (validPlaces.length > 0) {
    return getPlacePosition(validPlaces[0]);
  }

  return defaultCenter;
};

// Component utama untuk mengatur tampilan map dan table admin
const MapView = ({
  places,
  selectedPlace,
  activeView,
  isAuthenticated,
  onChangeView,
  onSelectPlace,
  onDeletePlace,
  onEditPlace,
}) => {
  const validPlaces = places.filter((place) => {
    return place.latitude && place.longitude;
  });
  const mapCenter = getInitialMapCenter(selectedPlace, validPlaces);
  const isAdminView = isAuthenticated;
  const isMapView = !isAdminView || activeView === "map";

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--base-1)">
      <MapAuthStatus />

      {isAdminView && (
        <MapViewSwitcher activeView={activeView} onChangeView={onChangeView} />
      )}

      {isMapView ? (
        <MapCanvas
          mapCenter={mapCenter}
          places={validPlaces}
          selectedPlace={selectedPlace}
          isAuthenticated={isAuthenticated}
          onSelectPlace={onSelectPlace}
          onDeletePlace={onDeletePlace}
          onEditPlace={onEditPlace}
        />
      ) : (
        <PlacesTableView
          places={places}
          onSelectPlace={onSelectPlace}
          onChangeView={onChangeView}
          onEditPlace={onEditPlace}
          onDeletePlace={onDeletePlace}
        />
      )}

      {isMapView && validPlaces.length === 0 && <MapEmptyState />}
    </div>
  );
};

export default MapView;
