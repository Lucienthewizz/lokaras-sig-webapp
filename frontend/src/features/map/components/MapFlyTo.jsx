import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapFlyTo = ({ selectedPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedPlace?.latitude || !selectedPlace?.longitude) {
      return;
    }

    map.flyTo(
      [Number(selectedPlace.latitude), Number(selectedPlace.longitude)],
      16,
      {
        duration: 0.8,
      },
    );
  }, [
    map,
    selectedPlace?.id,
    selectedPlace?.latitude,
    selectedPlace?.longitude,
  ]);

  return null;
};

export default MapFlyTo;
