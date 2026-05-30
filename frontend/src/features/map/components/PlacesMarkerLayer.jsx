import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import PlacePopup from "./PlacePopup";
import { createClusterIcon, createMarkerIcon } from "../config/mapConfig";

const PlacesMarkerLayer = ({
  places,
  selectedPlace,
  isAuthenticated,
  onSelectPlace,
}) => {
  const markerRefs = useRef({});

  useEffect(() => {
    if (!selectedPlace?.id) {
      return;
    }

    const marker = markerRefs.current[selectedPlace.id];

    if (!marker) {
      return;
    }

    const timer = setTimeout(() => {
      marker.openPopup();
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedPlace]);

  return (
    <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createClusterIcon}
      showCoverageOnHover={false}
    >
      {places.map((place) => {
        const isActive = selectedPlace?.id === place.id;

        return (
          <Marker
            key={place.id}
            ref={(marker) => {
              if (marker) {
                markerRefs.current[place.id] = marker;
              }
            }}
            position={[Number(place.latitude), Number(place.longitude)]}
            icon={createMarkerIcon(isActive)}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          >
            <Popup autoPan={false}>
              <PlacePopup place={place} isAuthenticated={isAuthenticated} />
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
};

export default PlacesMarkerLayer;
