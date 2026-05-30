import L from "leaflet";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Coffee,
  Croissant,
  CupSoda,
  IceCreamBowl,
  MapPin,
  Sandwich,
  ShoppingBag,
  Utensils,
} from "lucide-react";

export const defaultCenter = [-8.7906, 115.1785];

const categoryMarkerStyles = {
  restaurant: {
    color: "#e11d48",
    icon: Utensils,
  },
  cafe: {
    color: "#b45309",
    icon: CupSoda,
  },
  coffee_shop: {
    color: "#92400e",
    icon: Coffee,
  },
  bakery: {
    color: "#d97706",
    icon: Croissant,
  },
  fast_food_restaurant: {
    color: "#f97316",
    icon: Sandwich,
  },
  meal_takeaway: {
    color: "#059669",
    icon: ShoppingBag,
  },
  ice_cream_shop: {
    color: "#db2777",
    icon: IceCreamBowl,
  },
};

const defaultMarkerStyle = categoryMarkerStyles.restaurant;

const renderCategoryIcon = (category, size) => {
  const markerStyle = categoryMarkerStyles[category] || defaultMarkerStyle;
  const Icon = markerStyle.icon;

  return renderToStaticMarkup(
    createElement(Icon, {
      size,
      strokeWidth: 2.2,
      "aria-hidden": "true",
      focusable: "false",
    }),
  );
};

// fungsi untuk membuat icon marker Leaflet berdasarkan kategori dan status aktif
export const createMarkerIcon = (category, isActive = false) => {
  const markerStyle = categoryMarkerStyles[category] || defaultMarkerStyle;
  const width = isActive ? 38 : 34;
  const height = isActive ? 46 : 42;
  const circleSize = isActive ? 34 : 30;
  const tailSize = isActive ? 12 : 10;
  const iconSize = isActive ? 18 : 16;

  return L.divIcon({
    className: "",
    html: `
      <div style="
        position: relative;
        width: ${width}px;
        height: ${height}px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        filter: drop-shadow(0 9px 16px rgba(24, 24, 27, 0.18));
      ">
        <div style="
          position: absolute;
          top: ${circleSize - 8}px;
          left: 50%;
          width: ${tailSize}px;
          height: ${tailSize}px;
          transform: translateX(-50%) rotate(45deg);
          border-radius: 3px;
          background: ${markerStyle.color};
          border-right: 3px solid white;
          border-bottom: 3px solid white;
        "></div>

        <div style="
          position: relative;
          z-index: 1;
          width: ${circleSize}px;
          height: ${circleSize}px;
          border-radius: 9999px;
          background: ${markerStyle.color};
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: inset 0 -8px 14px rgba(0, 0, 0, 0.08);
        ">
          ${renderCategoryIcon(category, iconSize)}
        </div>
      </div>
    `,
    iconSize: [width, height],
    iconAnchor: [width / 2, height - 4],
    popupAnchor: [0, -height + 12],
  });
};

// fungsi untuk membuat icon cluster marker pada Leaflet
export const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const width = count > 99 ? 128 : count > 9 ? 118 : 108;
  const height = 44;
  const mapPinIcon = renderToStaticMarkup(
    createElement(MapPin, {
      size: 14,
      strokeWidth: 2.4,
      "aria-hidden": "true",
      focusable: "false",
    }),
  );

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${width}px;
        height: ${height}px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.96);
        border: 1px solid rgba(225, 29, 72, 0.16);
        box-shadow: 0 14px 30px rgba(24, 24, 27, 0.16);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 18px 6px 8px;
        color: #3f3f46;
        backdrop-filter: blur(10px);
      ">
        <span style="
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: #e11d48;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex: 0 0 auto;
          box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.08);
        ">
          ${mapPinIcon}
        </span>

        <span style="
          display: flex;
          flex-direction: column;
          min-width: 0;
          line-height: 1;
        ">
          <span style="font-size: 16px; font-weight: 800; letter-spacing: -0.04em; color: #18181b;">
            ${count}
          </span>
          <span style="margin-top: 3px; font-size: 11px; font-weight: 600; letter-spacing: 0; color: #8a8a93; text-transform: none; white-space: nowrap;">
            Places
          </span>
        </span>
      </div>
    `,
    className: "",
    iconSize: [width, height],
    iconAnchor: [width / 2, height / 2],
  });
};
