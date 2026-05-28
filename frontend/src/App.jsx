import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">LOKARAS Frontend</h1>
          <p className="text-gray-500">Frontend berhasil berjalan.</p>
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
