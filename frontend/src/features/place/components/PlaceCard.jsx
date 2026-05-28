import { BadgeCheck, ImageOff, Star } from "lucide-react";

const PlaceCard = ({ place, isActive, onSelectPlace }) => {
  return (
    <button
      type="button"
      onClick={() => onSelectPlace(place)}
      className={`group w-full overflow-hidden rounded-2xl border p-2.5 text-left transition ${
        isActive
          ? "border-rose-200 bg-rose-50"
          : "border-zinc-200 bg-white hover:border-rose-200 hover:bg-rose-50/50"
      }`}
    >
      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
          {place.image_url ? (
            <img
              src={place.image_url}
              alt={place.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-400">
              <ImageOff className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 self-center">
          <div className="flex items-center justify-between gap-2">
            <h3 className="min-w-0 flex-1 truncate text-sm font-semibold leading-tight text-(--neutral)">
              {place.name}
            </h3>

            {place.rating && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold leading-none text-(--secondary)">
                <Star className="h-3 w-3 fill-current" />
                {place.rating}
              </span>
            )}
          </div>

          <p className="mt-1 line-clamp-2 text-xs leading-snug text-zinc-500">
            {place.address || "Alamat belum tersedia"}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-(--primary)">
              {place.category || "Kuliner"}
            </span>

            {place.is_halal && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-(--accent)">
                <BadgeCheck className="h-3 w-3" />
                Halal
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default PlaceCard;
