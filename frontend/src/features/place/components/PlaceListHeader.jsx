const PlaceListHeader = ({ totalPlaces }) => {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold leading-none text-(--neutral)">
        Hasil Terdekat
      </h2>

      <span className="shrink-0 text-xs font-medium leading-none text-zinc-400">
        {totalPlaces} tempat
      </span>
    </div>
  );
};

export default PlaceListHeader;
