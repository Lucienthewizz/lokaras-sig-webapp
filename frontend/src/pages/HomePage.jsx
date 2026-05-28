import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { MapView } from "../features/map";
import { PlaceSidebar } from "../features/place";
import { useAuthStore } from "../store/useAuthStore";
import { usePlaceStore } from "../store/usePlaceStore";

const HomePage = () => {
  const [activeView, setActiveView] = useState("map");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { isAuthenticated } = useAuthStore();

  const {
    places,
    selectedPlace,
    loading,
    error,
    fetchPlaces,
    setSelectedPlace,
  } = usePlaceStore();

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchCategory =
        selectedCategory === "Semua" || place.category === selectedCategory;

      const keyword = searchKeyword.toLowerCase();

      const matchSearch =
        place.name?.toLowerCase().includes(keyword) ||
        place.address?.toLowerCase().includes(keyword) ||
        place.category?.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [places, selectedCategory, searchKeyword]);

  useEffect(() => {
    if (!selectedPlace && filteredPlaces.length > 0) {
      setSelectedPlace(filteredPlaces[0]);
    }
  }, [filteredPlaces, selectedPlace, setSelectedPlace]);

  return (
    <MainLayout
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      sidebar={
        <PlaceSidebar
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          selectedCategory={selectedCategory}
          searchKeyword={searchKeyword}
          isAuthenticated={isAuthenticated}
          onSelectPlace={setSelectedPlace}
          onChangeCategory={setSelectedCategory}
          onChangeSearch={setSearchKeyword}
          isOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
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
        activeView={activeView}
        isAuthenticated={isAuthenticated}
        onChangeView={setActiveView}
        onSelectPlace={setSelectedPlace}
      />
    </MainLayout>
  );
};

export default HomePage;
