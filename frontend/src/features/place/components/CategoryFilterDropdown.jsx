import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

const CategoryFilterDropdown = ({
  categories,
  selectedCategory,
  categoryCounts,
  onChangeCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeCategory =
    categories.find((category) => category.label === selectedCategory) ||
    categories[0];
  const ActiveCategoryIcon = activeCategory.icon;

  const handleSelectCategory = (category) => {
    onChangeCategory(category.label);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-left text-sm text-(--neutral) transition hover:border-rose-200 hover:bg-rose-50/50 focus:border-(--primary) focus:outline-none focus:ring-4 focus:ring-rose-100"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-(--primary)">
            <SlidersHorizontal className="h-4 w-4" />
          </span>

          <span className="min-w-0">
            <span className="block text-xs font-medium text-zinc-400">
              Filter kategori
            </span>
            <span className="mt-0.5 flex items-center gap-2 font-semibold text-(--neutral)">
              <ActiveCategoryIcon className="h-4 w-4 shrink-0 text-(--primary)" />
              <span className="truncate">{activeCategory.label}</span>
            </span>
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-200/60">
          <div className="max-h-64 overflow-y-auto" role="listbox">
            {categories.map((category) => {
              const isActive = selectedCategory === category.label;
              const CategoryIcon = category.icon;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? "bg-rose-50 text-(--primary)"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-(--neutral)"
                  }`}
                  role="option"
                  aria-selected={isActive}
                >
                  <CategoryIcon className="h-4 w-4 shrink-0" />

                  <span className="min-w-0 flex-1 truncate font-medium">
                    {category.label}
                  </span>

                  <span
                    className={`w-8 shrink-0 text-right text-xs tabular-nums ${
                      isActive ? "text-(--primary)" : "text-zinc-400"
                    }`}
                  >
                    {categoryCounts[category.label] || 0}
                  </span>

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {isActive && <Check className="h-4 w-4" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;
