import { toBoolean } from "./formatter.js";

// Utils untuk membuat payload dari body request saat create
export const createPlacePayload = (body, userId) => {
  return {
    name: body.name,
    category: body.category,
    description: body.description,
    address: body.address,
    latitude: Number(body.latitude),
    longitude: Number(body.longitude),
    image_url: body.image_url,
    opening_hours: body.opening_hours,
    phone: body.phone,
    rating: body.rating !== undefined ? Number(body.rating) : null,
    price_level:
      body.price_level !== undefined ? Number(body.price_level) : null,
    is_halal: toBoolean(body.is_halal),
    is_featured: toBoolean(body.is_featured),
    marker_icon: body.marker_icon,
    created_by: userId,
  };
};

// Utils untuk membuat payload dari body request saat update
export const updatePlacePayload = (body) => {
  const payload = {};

  if (body.name !== undefined) payload.name = body.name;
  if (body.category !== undefined) payload.category = body.category;
  if (body.description !== undefined) payload.description = body.description;
  if (body.address !== undefined) payload.address = body.address;

  if (body.latitude !== undefined) {
    payload.latitude = Number(body.latitude);
  }

  if (body.longitude !== undefined) {
    payload.longitude = Number(body.longitude);
  }

  if (body.image_url !== undefined) {
    payload.image_url = body.image_url;
  }

  if (body.opening_hours !== undefined) {
    payload.opening_hours = body.opening_hours;
  }

  if (body.phone !== undefined) {
    payload.phone = body.phone;
  }

  if (body.rating !== undefined) {
    payload.rating = Number(body.rating);
  }

  if (body.price_level !== undefined) {
    payload.price_level = Number(body.price_level);
  }

  if (body.is_halal !== undefined) {
    payload.is_halal = toBoolean(body.is_halal);
  }

  if (body.is_featured !== undefined) {
    payload.is_featured = toBoolean(body.is_featured);
  }

  if (body.marker_icon !== undefined) {
    payload.marker_icon = body.marker_icon;
  }

  payload.updated_at = new Date().toISOString();

  return payload;
};
