import 'dotenv/config';
export const env={port:Number(process.env.PORT||5000),nodeEnv:process.env.NODE_ENV||'development',frontendOrigin:process.env.FRONTEND_ORIGIN||'http://localhost:5173',supabaseUrl:process.env.SUPABASE_URL,serviceRoleKey:process.env.SUPABASE_SERVICE_ROLE_KEY};
if(!env.supabaseUrl||!env.serviceRoleKey) console.warn('Supabase server credentials are not configured. Database-backed routes will return a configuration error.');
