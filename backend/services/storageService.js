import { supabaseAdmin } from "../config/supabase.js";

export const uploadImageToStorage = async (file, folder = "places") => {
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const { error } = await supabaseAdmin.storage
    .from("place-images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    return {
      imageUrl: null,
      error,
    };
  }

  const { data } = supabaseAdmin.storage
    .from("place-images")
    .getPublicUrl(fileName);

  return {
    imageUrl: data.publicUrl,
    error: null,
  };
};
