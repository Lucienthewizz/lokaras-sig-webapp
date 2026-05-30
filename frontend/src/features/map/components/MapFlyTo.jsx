import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { getPopupAwareCenter } from "../utils/mapPosition";

const selectedPlaceZoom = 16;

const MapFlyTo = ({ selectedPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedPlace?.latitude || !selectedPlace?.longitude) {
      return;
    }

    const position = [
      Number(selectedPlace.latitude),
      Number(selectedPlace.longitude),
    ];

    const frame = requestAnimationFrame(() => {
      map.invalidateSize({ pan: false });

      map.flyTo(
        getPopupAwareCenter(map, position, selectedPlaceZoom),
        selectedPlaceZoom,
        {
          duration: 0.8,
        },
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [
    map,
    selectedPlace?.id,
    selectedPlace?.latitude,
    selectedPlace?.longitude,
  ]);

  return null;
};

export default MapFlyTo;
