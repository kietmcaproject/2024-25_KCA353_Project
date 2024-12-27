import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and Anon Key from environment variables
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure the URL and key are loaded properly
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Anon Key is missing in the environment variables');
}

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });

  // Return the supabase client
  return supabase;
};

export default supabaseClient;
