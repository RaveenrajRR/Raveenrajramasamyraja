import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';
export const supabase = env.supabaseUrl && env.serviceRoleKey ? createClient(env.supabaseUrl,env.serviceRoleKey,{auth:{autoRefreshToken:false,persistSession:false}}) : null;
