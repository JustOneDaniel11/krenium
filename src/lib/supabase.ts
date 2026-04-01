import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust URL validation to prevent "Invalid supabaseUrl" error
const getValidUrl = (url: string | undefined): string => {
  if (!url) return 'https://placeholder.supabase.co';
  try {
    const parsed = new URL(url);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') ? url : 'https://placeholder.supabase.co';
  } catch {
    return 'https://placeholder.supabase.co';
  }
};

const finalUrl = getValidUrl(supabaseUrl);
const finalKey = supabaseAnonKey || 'placeholder';

if (!supabaseUrl || !supabaseAnonKey || finalUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase configuration is missing or invalid. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(finalUrl, finalKey);
