import {Router} from 'express';import {supabase} from '../config/supabase.js';
const router=Router();
const publicTables={
 projects:{table:'projects',filter:['published',true],order:'created_at'},
 skills:{table:'skills',order:'sort_order'},
 services:{table:'services',filter:['active',true],order:'sort_order'},
 experience:{table:'experience',order:'sort_order'},
 certifications:{table:'certifications',filter:['verified',true],order:'issue_date'},
 testimonials:{table:'testimonials',filter:['approved',true],order:'created_at'},
 blog:{table:'blog_posts',filter:['status','published'],order:'published_at'}
};
router.get('/profile',async(req,res,next)=>{try{if(!supabase)return res.status(503).json({message:'Database is not configured'});const {data,error}=await supabase.from('profile').select('*').limit(1).maybeSingle();if(error)throw error;res.json({data})}catch(e){next(e)}});
router.get('/projects',async(req,res,next)=>{try{const {data,error}=await supabase.from('projects').select('id,title,slug,short_description,category,cover_image_url,technologies,featured,created_at').eq('published',true).order('featured',{ascending:false}).order('created_at',{ascending:false});if(error)throw error;res.json({data})}catch(e){next(e)}});
router.get('/public/:resource',async(req,res,next)=>{try{const cfg=publicTables[req.params.resource];if(!cfg)return res.status(404).json({message:'Public resource not found'});let q=supabase.from(cfg.table).select('*');if(cfg.filter)q=q.eq(cfg.filter[0],cfg.filter[1]);q=q.order(cfg.order,{ascending:false}).limit(100);const {data,error}=await q;if(error)throw error;res.json({data:data||[]})}catch(e){next(e)}});
router.get('/public/project/:slug',async(req,res,next)=>{try{const {data,error}=await supabase.from('projects').select('*').eq('slug',req.params.slug).eq('published',true).single();if(error)throw error;res.json({data})}catch(e){next(e)}});
router.get('/public/article/:slug',async(req,res,next)=>{try{const {data,error}=await supabase.from('blog_posts').select('*').eq('slug',req.params.slug).eq('status','published').single();if(error)throw error;res.json({data})}catch(e){next(e)}});
export default router;
