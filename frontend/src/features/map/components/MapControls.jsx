import { LocateFixed, Minus, Plus } from "lucide-react";
import { useMap } from "react-leaflet";

import { defaultCenter } from "../config/mapConfig";
import { getPopupAwareCenter } from "../utils/mapPosition";

const selectedPlaceZoom = 16;

const controlButtonClass =
  "flex h-10 w-10 items-center justify-center bg-white text-zinc-500 transition hover:bg-rose-50 hover:text-(--primary) focus:outline-none focus:ring-2 focus:ring-rose-100";

// Component kontrol zoom dan kembali ke marker terpilih pada map
const MapControls = ({ selectedPlace }) => {
  const map = useMap();

  const handleFocusLocation = () => {
    map.invalidateSize({ pan: false });

    if (selectedPlace?.latitude && selectedPlace?.longitude) {
      const position = [
        Number(selectedPlace.latitude),
        Number(selectedPlace.longitude),
      ];

      map.flyTo(
        getPopupAwareCenter(map, position, selectedPlaceZoom),
        selectedPlaceZoom,
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
    <div className="absolute right-6 top-24 z-500 flex flex-col gap-3">
      <button
        type="button"
        onClick={handleFocusLocation}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-(--primary) shadow-lg shadow-zinc-200/70 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-100"
        aria-label="Fokus lokasi"
        title="Fokus lokasi"
      >
        <LocateFixed className="h-5 w-5" />
      </button>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/70">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className={controlButtonClass}
          aria-label="Perbesar peta"
          title="Perbesar peta"
        >
          <Plus className="h-4.5 w-4.5" />
        </button>

        <div className="mx-2 h-px bg-zinc-100" />

        <button
          type="button"
          onClick={() => map.zoomOut()}
          className={controlButtonClass}
          aria-label="Perkecil peta"
          title="Perkecil peta"
        >
          <Minus className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
