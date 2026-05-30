import { Clock, Eye, MapPin, Pencil, Phone, Trash2 } from "lucide-react";

import { Badge, Button } from "../../../components/ui";
import { getPlaceCategoryLabel } from "../../place/constants/placeCategories";

const tableColumns = [
  { label: "Tempat", className: "w-[30%]" },
  { label: "Kategori", className: "w-[16%]" },
  { label: "Koordinat", className: "w-[16%]" },
  { label: "Rating", className: "w-[10%]" },
  { label: "Status", className: "w-[12%]" },
  { label: "Aksi", className: "w-[16%]" },
];

// fungsi untuk memformat koordinat agar tampil konsisten di table
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

// fungsi untuk mengubah price level menjadi label yang mudah dibaca
const formatPriceLevel = (priceLevel) => {
  const priceLabels = {
    1: "Murah",
    2: "Sedang",
    3: "Cukup mahal",
    4: "Mahal",
  };

  return priceLabels[Number(priceLevel)] || "Belum tersedia";
};

// Component table admin untuk melihat, edit, hapus, dan fly-to tempat
const PlacesTableView = ({
  places,
  onSelectPlace,
  onChangeView,
  onEditPlace,
  onDeletePlace,
}) => {
  // fungsi untuk memilih tempat dari table lalu berpindah ke map
  const handleShowOnMap = (place) => {
    onSelectPlace(place);
    onChangeView("map");
  };

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

        <div className="overflow-x-auto">
          <table className="w-full min-w-245 table-fixed text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-400">
              <tr>
                {tableColumns.map((column) => (
                  <th
                    key={column.label}
                    className={`px-5 py-4 ${column.className}`}
                  >
                    {column.label}
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

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleShowOnMap(place)}
                        title="Lihat di map"
                        className="px-2.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEditPlace(place)}
                        title="Edit tempat"
                        className="px-2.5"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeletePlace(place)}
                        title="Hapus tempat"
                        className="px-2.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
