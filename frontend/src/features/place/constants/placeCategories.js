import { CakeSlice, Coffee, LayoutGrid, Store, Utensils } from "lucide-react";

export const placeCategories = [
  { label: "Semua", displayLabel: "Semua", icon: LayoutGrid },
  { label: "restaurant", displayLabel: "Restaurant", icon: Utensils },
  { label: "cafe", displayLabel: "Cafe", icon: Coffee },
  { label: "coffee_shop", displayLabel: "Coffee Shop", icon: Coffee },
  { label: "bakery", displayLabel: "Bakery", icon: CakeSlice },
  {
    label: "fast_food_restaurant",
    displayLabel: "Fast Food Restaurant",
    icon: Store,
  },
  { label: "meal_takeaway", displayLabel: "Meal Takeaway", icon: Store },
  { label: "ice_cream_shop", displayLabel: "Ice Cream Shop", icon: CakeSlice },
];

export const getPlaceCategoryLabel = (categoryValue) => {
  return (
    placeCategories.find((category) => category.label === categoryValue)
      ?.displayLabel ||
    categoryValue ||
    "-"
  );
};
