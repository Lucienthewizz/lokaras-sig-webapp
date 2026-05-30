import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuthStore } from "../../store/useAuthStore";

let isShowingSessionAlert = false;

// Component untuk menampilkan notifikasi saat session/token login sudah expired
const SessionExpiredNotifier = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // fungsi untuk menangani event session expired dari axios interceptor
    const handleSessionExpired = async (event) => {
      logout();

      if (isShowingSessionAlert) {
        return;
      }

      isShowingSessionAlert = true;

      await Swal.fire({
        icon: "warning",
        title: "Sesi Berakhir",
        text:
          event.detail?.message ||
          "Sesi login sudah berakhir. Silakan login kembali.",
        confirmButtonText: "Login kembali",
        confirmButtonColor: "#e11d48",
      });

      isShowingSessionAlert = false;
      navigate("/login", { replace: true });
    };

    window.addEventListener("lokaras:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener(
        "lokaras:session-expired",
        handleSessionExpired,
      );
    };
  }, [logout, navigate]);

  return null;
};

export default SessionExpiredNotifier;
