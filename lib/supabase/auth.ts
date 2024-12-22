import { supabase } from './client';

export async function validateSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  // Validate the user with the server
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  return { session, user };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}