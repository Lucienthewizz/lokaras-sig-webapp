import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import logo from "../assets/brand/lokaras-logo.png";
import loginBgOverlay from "../assets/illustrations/login-bg-overlay.webp";
import { useAuthStore } from "../store/useAuthStore";

const inputClass =
  "w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pl-11 text-sm text-(--neutral) outline-none transition placeholder:text-zinc-400 focus:border-(--primary) focus:ring-4 focus:ring-rose-100";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">
      <img
        src={loginBgOverlay}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-8"
      />
      <div className="absolute inset-0 bg-white/60" />

      <section className="relative z-10 w-full max-w-sm">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-(--primary)"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke peta
        </Link>

        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur-md">
          <div className="text-center">
            <img
              src={logo}
              alt="LOKARAS Logo"
              className="mx-auto h-full w-30 object-cover object-center"
            />

            <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-(--primary)">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Access
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-(--neutral)">
              Masuk ke LOKARAS
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Login untuk mengelola data tempat kuliner, marker, dan informasi
              peta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-relaxed text-(--primary)">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="admin@email.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-(--primary) px-4 py-3 text-sm font-bold text-white shadow-sm shadow-rose-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Login Admin"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
