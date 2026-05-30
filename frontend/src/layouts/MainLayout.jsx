import { PanelLeftOpen } from "lucide-react";

// Layout utama untuk membungkus sidebar dan konten halaman
const MainLayout = ({ sidebar, children, isSidebarOpen, onToggleSidebar }) => {
  return (
    <main className="min-h-screen bg-(--base-1) text-(--neutral)">
      {!isSidebarOpen && (
        <button
          type="button"
          onClick={onToggleSidebar}
          className="fixed left-5 top-5 z-999 flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-100 bg-white text-(--primary) shadow-lg shadow-zinc-200/70 ring-1 ring-white transition hover:bg-rose-50"
          aria-label="Buka sidebar"
          aria-expanded={isSidebarOpen}
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}

      <div className="flex min-h-screen">
        {sidebar}

        <section
          className={`min-h-screen flex-1 transition-[margin] duration-300 ease-out ${
            isSidebarOpen ? "ml-95" : "ml-0"
          }`}
        >
          {children}
        </section>
      </div>
    </main>
  );
};

export default MainLayout;
