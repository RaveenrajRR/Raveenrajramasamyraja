import { supabase } from '../config/supabase.js';
export async function createContact(req,res,next){
  try{
    if(!supabase)return res.status(503).json({message:'Contact service is not configured yet.'});
    const {data,error}=await supabase.from('contact_messages').insert({...req.validatedBody,status:'unread'}).select('id').single();
    if(error)throw error;
    // Email notification is deliberately not claimed until Resend is configured and confirmed.
    res.status(201).json({message:'Enquiry received successfully.',id:data.id,emailNotification:'not_configured'});
  }catch(err){next(err);}
}
