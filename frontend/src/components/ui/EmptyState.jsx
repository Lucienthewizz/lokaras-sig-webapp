const EmptyState = ({ icon, title, description, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-center ${className}`}
    >
      {icon && (
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
          {icon}
        </div>
      )}

      <p className="text-sm font-semibold text-(--neutral)">{title}</p>

      {description && (
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
