import {
  Coffee,
  Croissant,
  CupSoda,
  IceCreamBowl,
  LayoutGrid,
  Sandwich,
  ShoppingBag,
  Utensils,
} from "lucide-react";

export const placeCategories = [
  { label: "Semua", displayLabel: "Semua", icon: LayoutGrid },
  { label: "restaurant", displayLabel: "Restaurant", icon: Utensils },
  { label: "cafe", displayLabel: "Cafe", icon: CupSoda },
  { label: "coffee_shop", displayLabel: "Coffee Shop", icon: Coffee },
  { label: "bakery", displayLabel: "Bakery", icon: Croissant },
  {
    label: "fast_food_restaurant",
    displayLabel: "Fast Food Restaurant",
    icon: Sandwich,
  },
  { label: "meal_takeaway", displayLabel: "Meal Takeaway", icon: ShoppingBag },
  {
    label: "ice_cream_shop",
    displayLabel: "Ice Cream Shop",
    icon: IceCreamBowl,
  },
];

// fungsi untuk mengubah value kategori menjadi label yang rapi untuk UI
export const getPlaceCategoryLabel = (categoryValue) => {
  return (
    placeCategories.find((category) => category.label === categoryValue)
      ?.displayLabel ||
    categoryValue ||
    "-"
  );
};
