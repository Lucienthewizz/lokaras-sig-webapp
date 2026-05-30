import {
  BadgeCheck,
  Clock,
  ImageOff,
  MapPin,
  Pencil,
  Phone,
  Star,
  Trash2,
} from "lucide-react";

import { Badge, Button } from "../../../components/ui";
import { getPlaceCategoryLabel } from "../../place/constants/placeCategories";

const InfoRow = ({ icon, children }) => {
  return (
    <div className="flex min-w-0 items-start gap-1.5 text-xs leading-snug text-zinc-500">
      <span className="mt-0.5 shrink-0 text-zinc-400">{icon}</span>
      <span className="line-clamp-2 min-w-0 flex-1">{children}</span>
    </div>
  );
};

const PlacePopup = ({ place, isAuthenticated }) => {
  const description = place.description || "Detail tempat belum tersedia.";

  return (
    <article className="w-65 overflow-hidden rounded-2xl bg-white text-(--neutral)">
      <div className="h-28 overflow-hidden rounded-xl bg-zinc-100">
        {place.image_url ? (
          <img
            src={place.image_url}
            alt={place.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            <ImageOff className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="pt-2.5">
        <div className="flex items-start justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[15px] font-bold leading-tight text-(--neutral)">
              {place.name || "Nama tempat belum tersedia"}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <Badge variant="primary">
                {getPlaceCategoryLabel(place.category)}
              </Badge>

              {place.is_halal && (
                <Badge variant="success">
                  <BadgeCheck className="h-3 w-3" />
                  Halal
                </Badge>
              )}
            </div>
          </div>

          {place.rating && (
            <Badge variant="secondary" className="shrink-0">
              <Star className="h-3 w-3 fill-current" />
              {place.rating}
            </Badge>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-snug text-zinc-500">
          {description}
        </p>

        <div className="mt-2.5 space-y-1.5 rounded-2xl bg-zinc-50 p-2.5">
          <InfoRow icon={<MapPin className="h-3.5 w-3.5" />}>
            {place.address || "Alamat belum tersedia"}
          </InfoRow>

          <InfoRow icon={<Clock className="h-3.5 w-3.5" />}>
            {place.opening_hours || "Jam buka belum tersedia"}
          </InfoRow>

          <InfoRow icon={<Phone className="h-3.5 w-3.5" />}>
            {place.phone || "Telepon belum tersedia"}
          </InfoRow>
        </div>

        {isAuthenticated && (
          <div className="mt-2.5 flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 py-1.5">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>

            <Button variant="danger" size="sm" className="flex-1 py-1.5">
              <Trash2 className="h-3.5 w-3.5" />
              Hapus
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PlacePopup;
