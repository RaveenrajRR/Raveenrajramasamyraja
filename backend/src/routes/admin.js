import {Router} from 'express';
import {requireAdmin} from '../middleware/requireAdmin.js';
import {supabase} from '../config/supabase.js';
import {z} from 'zod';
const router=Router();router.use(requireAdmin);
const resources={
 projects:{table:'projects',order:'created_at',required:['title','slug','short_description']},
 skills:{table:'skills',order:'sort_order',required:['name']},
 experience:{table:'experience',order:'sort_order',required:['role','organization']},
 education:{table:'education',order:'sort_order',required:['institution','qualification']},
 certifications:{table:'certifications',order:'issue_date',required:['name','issuer']},
 services:{table:'services',order:'sort_order',required:['title','slug','description']},
 blog:{table:'blog_posts',order:'created_at',required:['title','slug']},
 testimonials:{table:'testimonials',order:'created_at',required:['person_name','content']},
 enquiries:{table:'contact_messages',order:'created_at',readOnly:true},
 profile:{table:'profile',order:'updated_at',required:['full_name']},
 media:{table:'media_assets',order:'created_at',readOnly:true},
 resume:{table:'resume_files',order:'uploaded_at',readOnly:true},
 settings:{table:'website_settings',order:'updated_at',required:['key','value']},
 seo:{table:'website_settings',order:'updated_at',required:['key','value']}
};
const safeBody=z.record(z.string(),z.any());
router.get('/resources/:name',async(req,res,next)=>{try{if(!supabase)return res.status(503).json({message:'Database is not configured'});const config=resources[req.params.name];if(!config)return res.status(404).json({message:'Unknown admin resource'});const {data,error}=await supabase.from(config.table).select('*').order(config.order,{ascending:false}).limit(250);if(error)throw error;res.json({data:data||[]})}catch(e){next(e)}});
router.post('/resources/:name',async(req,res,next)=>{try{if(!supabase)return res.status(503).json({message:'Database is not configured'});const config=resources[req.params.name];if(!config||config.readOnly)return res.status(403).json({message:'This resource cannot be created through this endpoint'});const parsed=safeBody.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Invalid request body'});for(const key of config.required||[])if(parsed.data[key]===undefined||parsed.data[key]==='')return res.status(400).json({message:`${key} is required`});const payload={...parsed.data};if(req.params.name==='blog'&&payload.status==='published'&&!payload.published_at)payload.published_at=new Date().toISOString();const {data,error}=await supabase.from(config.table).insert(payload).select('*').single();if(error)throw error;await supabase.from('admin_activity_logs').insert({admin_user_id:req.admin.id,action:'create',entity_type:req.params.name,entity_id:data.id||null});res.status(201).json({data})}catch(e){next(e)}});
router.patch('/resources/:name/:id',async(req,res,next)=>{try{if(!supabase)return res.status(503).json({message:'Database is not configured'});const config=resources[req.params.name];if(!config||config.readOnly)return res.status(403).json({message:'This resource cannot be updated through this endpoint'});const parsed=safeBody.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Invalid request body'});const payload={...parsed.data};if(req.params.name==='blog'&&payload.status==='published'&&!payload.published_at)payload.published_at=new Date().toISOString();if(config.table==='profile')payload.updated_at=new Date().toISOString();const {data,error}=await supabase.from(config.table).update(payload).eq('id',req.params.id).select('*').single();if(error)throw error;await supabase.from('admin_activity_logs').insert({admin_user_id:req.admin.id,action:'update',entity_type:req.params.name,entity_id:data.id||null});res.json({data})}catch(e){next(e)}});
router.delete('/resources/:name/:id',async(req,res,next)=>{try{if(!supabase)return res.status(503).json({message:'Database is not configured'});const config=resources[req.params.name];if(!config||config.readOnly)return res.status(403).json({message:'This resource cannot be deleted through this endpoint'});const {error}=await supabase.from(config.table).delete().eq('id',req.params.id);if(error)throw error;await supabase.from('admin_activity_logs').insert({admin_user_id:req.admin.id,action:'delete',entity_type:req.params.name,entity_id:req.params.id});res.json({message:'Deleted'})}catch(e){next(e)}});
export default router;
