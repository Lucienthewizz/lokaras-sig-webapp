const MapEmptyState = () => {
  return (
    <div className="absolute left-1/2 top-1/2 z-500 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-dashed border-zinc-200 bg-white/90 p-8 text-center shadow-sm backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-(--neutral)">
        Belum ada data lokasi
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Data tempat makan akan tampil sebagai marker di peta.
      </p>
    </div>
  );
};

export default MapEmptyState;
