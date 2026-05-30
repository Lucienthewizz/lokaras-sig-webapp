export const getPopupAwareCenter = (
  map,
  position,
  zoom = 16,
  verticalOffset = 130,
) => {
  const projectedPoint = map.project(position, zoom);

  return map.unproject(
    [projectedPoint.x, projectedPoint.y - verticalOffset],
    zoom,
  );
};
