import { useMap } from "react-leaflet";
import { defaultCenter } from "../config/mapConfig";

const controlButtonClass =
  "flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-2xl shadow-sm transition hover:bg-zinc-50";

const MapControls = ({ selectedPlace }) => {
  const map = useMap();

  const handleFocusLocation = () => {
    if (selectedPlace?.latitude && selectedPlace?.longitude) {
      map.flyTo(
        [Number(selectedPlace.latitude), Number(selectedPlace.longitude)],
        16,
        {
          duration: 0.8,
        },
      );

      return;
    }

    map.flyTo(defaultCenter, 14, {
      duration: 0.8,
    });
  };

  return (
    <div className="absolute right-6 top-6 z-500 space-y-3">
      <button
        type="button"
        onClick={handleFocusLocation}
        className={controlButtonClass}
        aria-label="Fokus lokasi"
      >
        ⌖
      </button>

      <button
        type="button"
        onClick={() => map.zoomIn()}
        className={`${controlButtonClass} font-semibold `}
        aria-label="Perbesar peta"
      >
        +
      </button>

      <button
        type="button"
        onClick={() => map.zoomOut()}
        className={`${controlButtonClass} font-semibold`}
        aria-label="Perkecil peta"
      >
        −
      </button>
    </div>
  );
};

export default MapControls;
