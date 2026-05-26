import { supabase } from "../config/supabase.js";

// Service untuk login user dengan email dan password
export const signInWithEmailPassword = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Service untuk mendapatkan user berdasarkan token
export const getUserByToken = async (token) => {
  return await supabase.auth.getUser(token);
};
