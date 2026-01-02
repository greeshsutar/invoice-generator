import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pwuczzshrdwklxupsqlh.supabase.co";
const supabaseKey = "sb_publishable_x4cOupfLQD64YA0fJZkiZA_00tTR8xm";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
