import L from "leaflet";

export const defaultCenter = [-8.7906, 115.1785];

export const createMarkerIcon = (isActive = false) => {
  const size = isActive ? 34 : 30;
  const fontSize = isActive ? 15 : 13;

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
        background: var(--primary);
        border: 4px solid white;
        box-shadow: 0 10px 25px rgba(225, 29, 72, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${fontSize}px;
      ">
        🍜
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -18],
  });
};

export const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: `
      <div style="
        width: 46px;
        height: 46px;
        border-radius: 9999px;
        background: var(--primary);
        border: 4px solid white;
        box-shadow: 0 12px 28px rgba(225, 29, 72, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 14px;
      ">
        ${count}
      </div>
    `,
    className: "",
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });
};
