import { Plus } from "lucide-react";

import CategoryFilterDropdown from "./components/CategoryFilterDropdown";
import PlaceList from "./components/PlaceList";
import PlaceListHeader from "./components/PlaceListHeader";
import PlaceSearchInput from "./components/PlaceSearchInput";
import PlaceSidebarHeader from "./components/PlaceSidebarHeader";
import { placeCategories } from "./constants/placeCategories";

// Component sidebar utama untuk search, filter, list tempat, dan tombol tambah marker
const PlaceSidebar = ({
  places,
  categoryCountPlaces = places,
  selectedPlace,
  selectedCategory,
  searchKeyword,
  isAuthenticated,
  onSelectPlace,
  onChangeCategory,
  onChangeSearch,
  isOpen = true,
  onToggleSidebar,
  onOpenAddModal,
}) => {
  const categoryCounts = placeCategories.reduce((counts, category) => {
    if (category.label === "Semua") {
      return {
        ...counts,
        [category.label]: categoryCountPlaces.length,
      };
    }

    return {
      ...counts,
      [category.label]: categoryCountPlaces.filter(
        (place) => place.category === category.label,
      ).length,
    };
  }, {});

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen w-95 flex-col border-r border-zinc-200 bg-zinc-50/95 shadow-[8px_0_30px_rgba(63,63,70,0.06)] backdrop-blur-xl transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <PlaceSidebarHeader onToggleSidebar={onToggleSidebar} />

      <div className="flex min-h-0 flex-1 flex-col px-6 py-3.5">
        <PlaceSearchInput
          searchKeyword={searchKeyword}
          onChangeSearch={onChangeSearch}
        />

        <CategoryFilterDropdown
          categories={placeCategories}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          onChangeCategory={onChangeCategory}
        />

        <PlaceListHeader totalPlaces={places.length} />

        <PlaceList
          places={places}
          selectedPlace={selectedPlace}
          onSelectPlace={onSelectPlace}
        />

        {isAuthenticated && (
          <div className="mt-5 border-t border-zinc-200 pt-5">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--primary) px-4 py-3 text-sm font-bold text-white shadow-sm shadow-rose-200 transition hover:opacity-90"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <Plus className="h-4 w-4" />
              </span>
              Tambah Marker Baru
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PlaceSidebar;
