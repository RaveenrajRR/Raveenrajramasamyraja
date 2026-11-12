import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}) : null;
export async function getSession(){if(!supabase)return null;const {data}=await supabase.auth.getSession();return data.session;}
export async function signIn(email,password){if(!supabase)throw new Error('Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.');const {data,error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;return data;}
export async function signOut(){if(supabase)await supabase.auth.signOut();}
