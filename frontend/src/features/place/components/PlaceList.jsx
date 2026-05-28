import { SearchX } from "lucide-react";

import { EmptyState } from "../../../components/ui";
import PlaceCard from "./PlaceCard";

const PlaceList = ({ places, selectedPlace, onSelectPlace }) => {
  return (
    <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
      {places.length === 0 ? (
        <EmptyState
          icon={<SearchX className="h-5 w-5" />}
          title="Belum ada tempat yang cocok"
          description="Coba ubah kata kunci atau pilih kategori lain."
        />
      ) : (
        places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isActive={selectedPlace?.id === place.id}
            onSelectPlace={onSelectPlace}
          />
        ))
      )}
    </div>
  );
};

export default PlaceList;
