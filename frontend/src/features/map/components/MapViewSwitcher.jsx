const viewOptions = [
  { value: "map", label: "Peta" },
  { value: "table", label: "Tabel" },
];

const MapViewSwitcher = ({ activeView, onChangeView }) => {
  return (
    <div className="absolute left-1/2 top-6 z-500 flex -translate-x-1/2 rounded-full border border-zinc-200 bg-white/90 p-1 shadow-sm backdrop-blur-xl">
      {viewOptions.map((option) => {
        const isActive = activeView === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeView(option.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-(--primary) text-white shadow-sm"
                : "text-zinc-500 hover:text-(--primary)"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default MapViewSwitcher;
