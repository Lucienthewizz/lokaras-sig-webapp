import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// Halaman login admin
const LoginPage = () => {
  const navigate = useNavigate();

  const { login, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // fungsi untuk menangani perubahan input email dan password
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // fungsi untuk mengirim form login ke auth store
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(form);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-2xl font-bold">Login Admin</h1>
          <p className="text-center text-sm text-gray-500">
            Masuk untuk mengelola data kuliner LOKARAS
          </p>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="admin@email.com"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
