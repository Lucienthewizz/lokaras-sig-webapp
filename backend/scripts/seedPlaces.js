import dotenv from "dotenv";

import { supabaseAdmin } from "../config/supabase.js";
import { placesSeed } from "../seeds/places.seed.js";

dotenv.config();

const args = process.argv.slice(2);
const shouldClear = args.includes("--clear");
const isDryRun = args.includes("--dry-run");

const normalizePlace = (place) => {
  const payload = {
    ...place,
    image_url: place.image_url || null,
    phone: place.phone || null,
  };

  if (process.env.SEED_CREATED_BY) {
    payload.created_by = process.env.SEED_CREATED_BY;
  }

  return payload;
};

const seedPlaces = async () => {
  const payload = placesSeed.map(normalizePlace);

  console.log(`Prepared ${payload.length} places.`);

  if (isDryRun) {
    console.table(
      payload.map(({ name, category, latitude, longitude }) => ({
        name,
        category,
        latitude,
        longitude,
      })),
    );
    return;
  }

  if (shouldClear) {
    const { error: deleteError } = await supabaseAdmin
      .from("places")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      throw deleteError;
    }

    console.log("Existing places cleared.");
  }

  const { data: existingPlaces, error: existingError } = await supabaseAdmin
    .from("places")
    .select("name");

  if (existingError) {
    throw existingError;
  }

  const existingNames = new Set(
    existingPlaces.map((place) => place.name.toLowerCase()),
  );
  const placesToInsert = shouldClear
    ? payload
    : payload.filter((place) => !existingNames.has(place.name.toLowerCase()));

  if (placesToInsert.length === 0) {
    console.log("No new places to insert.");
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("places")
    .insert(placesToInsert)
    .select("id,name,category");

  if (error) {
    throw error;
  }

  console.log(`Inserted ${data.length} places.`);
};

seedPlaces().catch((error) => {
  console.error("Failed to seed places:", error.message);
  process.exit(1);
});
