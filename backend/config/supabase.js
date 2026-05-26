import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Client Supabase untuk operasi yang tidak memerlukan service role
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY,
);

// Client Supabase untuk operasi yang memerlukan service role
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
