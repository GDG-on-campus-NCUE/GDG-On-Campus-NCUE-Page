import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  if (typeof window === 'undefined') {
    console.error('Supabase credentials not found in environment variables.');
  }
}

// Ensure createClient is called with valid-looking strings to avoid immediate crash
// If not configured, we use a placeholder to prevent top-level throw
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
