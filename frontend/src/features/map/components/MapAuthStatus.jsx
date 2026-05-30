import { LogIn, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../../../store/useAuthStore";

// Component indikator status login admin/guest di atas map
const MapAuthStatus = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="absolute right-6 top-6 z-500 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-xl">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isAuthenticated
            ? "bg-rose-50 text-(--primary)"
            : "bg-zinc-100 text-zinc-500"
        }`}
      >
        {isAuthenticated ? (
          <ShieldCheck className="h-4.5 w-4.5" />
        ) : (
          <UserRound className="h-4.5 w-4.5" />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold leading-none text-(--neutral)">
          {isAuthenticated ? "Admin" : "Guest"}
        </p>
        <p className="mt-1 max-w-36 truncate text-[11px] leading-none text-zinc-400">
          {isAuthenticated ? user?.email || "Sudah login" : "Belum login"}
        </p>
      </div>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={logout}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-rose-50 hover:text-(--primary)"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      ) : (
        <Link
          to="/login"
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-rose-50 hover:text-(--primary)"
          aria-label="Login admin"
          title="Login admin"
        >
          <LogIn className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export default MapAuthStatus;
