import { PanelLeftClose } from "lucide-react";

import logo from "../../../assets/brand/lokaras-logo.png";
import sidebarDiningIllustration from "../../../assets/illustrations/sidebar-dining-illustration.webp";

const PlaceSidebarHeader = ({ onToggleSidebar }) => {
  return (
    <div className="relative overflow-hidden border-b border-zinc-200/80 bg-white px-6 py-4">
      <img
        src={sidebarDiningIllustration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 bottom-0 h-24 w-48 object-cover object-right opacity-40"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-50 bg-linear-to-l from-transparent via-white/60 to-white" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
          <img
            src={logo}
            alt="LOKARAS Logo"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-(--neutral)">
            LOKARAS
          </h1>
          <p className="text-xs text-zinc-500">Lokasi & Rasa</p>
        </div>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white/90 text-zinc-500 shadow-sm backdrop-blur transition hover:border-rose-200 hover:bg-rose-50 hover:text-(--primary)"
          aria-label="Tutup sidebar"
        >
          <PanelLeftClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PlaceSidebarHeader;
