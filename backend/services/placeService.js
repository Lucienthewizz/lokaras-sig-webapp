import { supabase, supabaseAdmin } from "../config/supabase.js";

// Service untuk get all places
export const findAllPlaces = async () => {
  return await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false });
};

// Service untuk get place by id
export const findPlaceById = async (id) => {
  return await supabase.from("places").select("*").eq("id", id).maybeSingle();
};

// Service untuk create place
export const insertPlace = async (payload) => {
  return await supabaseAdmin.from("places").insert(payload).select().single();
};

// Service untuk update place by id
export const editPlaceById = async (id, payload) => {
  return await supabaseAdmin
    .from("places")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();
};

// Service untuk delete place by id
export const removePlaceById = async (id) => {
  return await supabaseAdmin
    .from("places")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();
};
