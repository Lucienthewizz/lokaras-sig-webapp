import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { usePlaceStore } from "./store/usePlaceStore";

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { places, loading, error, fetchPlaces } = usePlaceStore();

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">LOKARAS Frontend</h1>
          <p className="text-gray-500">Data places dari Zustand Store</p>
        </div>

        <div>
          {isAuthenticated ? (
            <button onClick={logout} className="btn btn-error">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login Admin
            </Link>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="alert alert-success mt-6">
          <span>Login sebagai {user?.email}</span>
        </div>
      )}

      {loading && <p>Loading data places...</p>}

      {error && (
        <div className="alert alert-error mt-6">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Total Places: {places.length}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <div key={place.id} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">{place.name}</h3>
                  <p className="text-sm text-gray-500">{place.category}</p>
                  <p>{place.address}</p>
                  <p>Rating: {place.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
