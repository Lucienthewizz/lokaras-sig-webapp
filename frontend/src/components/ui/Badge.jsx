const variants = {
  primary: "bg-rose-50 text-(--primary)",
  secondary: "bg-amber-50 text-(--secondary)",
  success: "bg-emerald-50 text-(--accent)",
  neutral: "bg-zinc-100 text-zinc-500",
};

const Badge = ({ children, variant = "neutral", className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold leading-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
