import { Clock, MapPin, Phone } from "lucide-react";

import { Badge } from "../../../components/ui";
import { getPlaceCategoryLabel } from "../../place/constants/placeCategories";

const tableColumns = ["Tempat", "Kategori", "Koordinat", "Rating", "Status"];

const formatCoordinate = (coordinate) => {
  if (coordinate === undefined || coordinate === null || coordinate === "") {
    return "-";
  }

  const coordinateNumber = Number(coordinate);

  if (Number.isNaN(coordinateNumber)) {
    return coordinate;
  }

  return coordinateNumber.toFixed(6);
};

const formatPriceLevel = (priceLevel) => {
  const priceLabels = {
    1: "Murah",
    2: "Sedang",
    3: "Cukup mahal",
    4: "Mahal",
  };

  return priceLabels[Number(priceLevel)] || "Belum tersedia";
};

const PlacesTableView = ({ places }) => {
  return (
    <div className="min-h-screen bg-(--base-1) px-10 pb-10 pt-28">
      <div className="overflow-hidden rounded-4xl border border-zinc-100 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-5">
          <h2 className="text-lg font-bold text-(--neutral)">
            Data Tempat Kuliner
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Tampilan ringkas data places dengan koordinat latitude dan
            longitude.
          </p>
        </div>

        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-400">
            <tr>
              {tableColumns.map((column) => (
                <th
                  key={column}
                  className={`px-5 py-4 ${
                    column === "Tempat" ? "w-[36%]" : "w-[16%]"
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {places.map((place) => (
              <tr key={place.id} className="align-top hover:bg-rose-50/40">
                <td className="px-5 py-4">
                  <p className="line-clamp-1 font-semibold text-(--neutral)">
                    {place.name || "-"}
                  </p>

                  <div className="mt-1 flex gap-1.5 text-xs leading-relaxed text-zinc-500">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    <span className="line-clamp-2">
                      {place.address || "Alamat belum tersedia"}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {place.opening_hours || "belum tersedia"}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {place.phone || "belum tersedia"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-zinc-600">
                    {getPlaceCategoryLabel(place.category)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Level harga: {formatPriceLevel(place.price_level)}
                  </p>
                </td>

                <td className="px-5 py-4 font-mono text-xs text-zinc-500">
                  <p>Lat: {formatCoordinate(place.latitude)}</p>
                  <p className="mt-1">
                    Lng: {formatCoordinate(place.longitude)}
                  </p>
                </td>

                <td className="px-5 py-4 text-zinc-500">
                  {place.rating ? (
                    <Badge variant="secondary">★ {place.rating}</Badge>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {place.is_halal && <Badge variant="success">Halal</Badge>}
                    {place.is_featured && (
                      <Badge variant="primary">Featured</Badge>
                    )}
                    {!place.is_halal && !place.is_featured && (
                      <span className="text-xs text-zinc-400">-</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {places.length === 0 && (
          <div className="p-8 text-center text-sm text-zinc-500">
            Tidak ada data untuk ditampilkan.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesTableView;
