import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { MapView } from "../features/map";
import { PlaceSidebar } from "../features/place";
import { useAuthStore } from "../store/useAuthStore";
import { usePlaceStore } from "../store/usePlaceStore";
import AddPlaceModal from "../features/place/components/AddPlaceModal";
import EditPlaceModal from "../features/place/components/EditPlaceModal";
import { getPlaceCategoryLabel } from "../features/place/constants/placeCategories";
import Swal from "sweetalert2";

// Halaman utama yang mengatur sidebar, map, table, dan modal CRUD tempat
const HomePage = () => {
  const [activeView, setActiveView] = useState("map");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  const { isAuthenticated } = useAuthStore();

  const {
    places,
    selectedPlace,
    loading,
    error,
    fetchPlaces,
    setSelectedPlace,
    removePlace,
  } = usePlaceStore();

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const searchFilteredPlaces = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return places;
    }

    return places.filter((place) => {
      const categoryLabel = getPlaceCategoryLabel(place.category).toLowerCase();

      return (
        place.name?.toLowerCase().includes(keyword) ||
        place.address?.toLowerCase().includes(keyword) ||
        place.category?.toLowerCase().includes(keyword) ||
        categoryLabel.includes(keyword)
      );
    });
  }, [places, searchKeyword]);

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === "Semua") {
      return searchFilteredPlaces;
    }

    return searchFilteredPlaces.filter(
      (place) => place.category === selectedCategory,
    );
  }, [searchFilteredPlaces, selectedCategory]);

  useEffect(() => {
    const isSelectedPlaceVisible = filteredPlaces.some(
      (place) => place.id === selectedPlace?.id,
    );

    if (!isSelectedPlaceVisible) {
      setSelectedPlace(filteredPlaces[0] || null);
    }
  }, [filteredPlaces, selectedPlace, setSelectedPlace]);

  const effectiveActiveView = isAuthenticated ? activeView : "map";

  // fungsi untuk konfirmasi dan menghapus tempat
  const handleDeletePlace = async (place) => {
    const resultConfirm = await Swal.fire({
      icon: "warning",
      title: "Hapus Tempat?",
      text: `Data "${place.name}" akan dihapus dari peta.`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#71717a",
    });

    if (!resultConfirm.isConfirmed) {
      return;
    }

    if (!place?.id) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "ID tempat tidak ditemukan.",
        confirmButtonColor: "#e11d48",
      });
      return;
    }

    const result = await removePlace(place.id);

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message || "Tempat berhasil dihapus.",
        confirmButtonColor: "#e11d48",
      });

      setSelectedPlace(null);
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: result.message || "Terjadi kesalahan saat menghapus tempat.",
      confirmButtonColor: "#e11d48",
    });
  };

  // fungsi untuk membuka modal edit dengan data tempat terpilih
  const handleOpenEditModal = (place) => {
    setEditingPlace(place);
  };

  return (
    <MainLayout
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      sidebar={
        <PlaceSidebar
          places={filteredPlaces}
          categoryCountPlaces={searchFilteredPlaces}
          selectedPlace={selectedPlace}
          selectedCategory={selectedCategory}
          searchKeyword={searchKeyword}
          isAuthenticated={isAuthenticated}
          onSelectPlace={setSelectedPlace}
          onChangeCategory={setSelectedCategory}
          onChangeSearch={setSearchKeyword}
          isOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      }
    >
      {loading && (
        <div className="fixed right-6 top-6 z-999 rounded-2xl bg-white px-5 py-3 text-sm text-zinc-500 shadow-sm">
          Memuat data lokasi...
        </div>
      )}

      {error && (
        <div className="fixed right-6 top-6 z-999 rounded-2xl bg-rose-50 px-5 py-3 text-sm text-(--primary) shadow-sm">
          {error}
        </div>
      )}

      <MapView
        places={filteredPlaces}
        selectedPlace={selectedPlace}
        activeView={effectiveActiveView}
        isAuthenticated={isAuthenticated}
        onChangeView={setActiveView}
        onSelectPlace={setSelectedPlace}
        onDeletePlace={handleDeletePlace}
        onEditPlace={handleOpenEditModal}
      />

      {isAuthenticated && (
        <AddPlaceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isAuthenticated && editingPlace && (
        <EditPlaceModal
          key={editingPlace.id}
          isOpen={true}
          place={editingPlace}
          onClose={() => setEditingPlace(null)}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
