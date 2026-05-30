import { Search, X } from "lucide-react";

// Component input pencarian tempat pada sidebar
const PlaceSearchInput = ({ searchKeyword, onChangeSearch }) => {
  return (
    <div className="mb-3">
      <label className="sr-only">Cari Lokasi</label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

        <input
          type="text"
          value={searchKeyword}
          onChange={(event) => onChangeSearch(event.target.value)}
          placeholder="Cari tempat makan"
          className="w-full rounded-2xl border border-zinc-200 bg-white py-2.5 pl-10 pr-11 text-sm text-(--neutral) outline-none transition placeholder:text-zinc-400 focus:border-(--primary) focus:ring-4 focus:ring-rose-100"
        />

        {searchKeyword && (
          <button
            type="button"
            onClick={() => onChangeSearch("")}
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
            aria-label="Bersihkan pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceSearchInput;
