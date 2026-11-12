import { supabase } from '../config/supabase.js';
export async function requireAdmin(req,res,next){
  try{
    const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(!token||!supabase)return res.status(401).json({message:'Authentication required'});
    const {data:{user},error}=await supabase.auth.getUser(token);
    if(error||!user)return res.status(401).json({message:'Invalid session'});
    const {data:admin,error:adminError}=await supabase.from('admin_users').select('user_id,role,active').eq('user_id',user.id).maybeSingle();
    if(adminError||!admin||!admin.active)return res.status(403).json({message:'Admin access denied'});
    req.admin={id:user.id,role:admin.role};next();
  }catch{res.status(401).json({message:'Unable to verify admin session'});}
}
