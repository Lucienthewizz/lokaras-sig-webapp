const variants = {
  primary: "bg-(--primary) text-white hover:opacity-90",
  secondary: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
  danger: "bg-rose-50 text-(--primary) hover:bg-rose-100",
  ghost: "bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-(--neutral)",
};

const sizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
};

// Component reusable untuk tombol dengan variant dan ukuran berbeda
const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
