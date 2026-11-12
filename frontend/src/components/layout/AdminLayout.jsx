import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSession, signOut, supabase } from '../../services/auth.js';
import './AdminLayout.css';
const nav=[['Overview','dashboard'],['Profile','profile'],['Projects','projects'],['Skills','skills'],['Experience','experience'],['Education','education'],['Certifications','certifications'],['Services','services'],['Blog','blog'],['Enquiries','enquiries'],['Testimonials','testimonials'],['Resume','resume'],['Media','media'],['SEO','seo'],['Settings','settings']];
export default function AdminLayout(){
 const [session,setSession]=useState(undefined); const navigate=useNavigate();
 useEffect(()=>{getSession().then(setSession); if(!supabase)return; const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s)); return ()=>subscription.unsubscribe();},[]);
 if(session===undefined)return <div className="loading-screen">Verifying secure session…</div>;
 if(!session)return <Navigate to="/admin/login" replace/>;
 const logout=async()=>{await signOut();navigate('/admin/login',{replace:true});};
 return <div className="admin-shell"><aside className="admin-sidebar"><Link className="brand" to="/admin">RAVEEN<span>.</span> <small>STUDIO</small></Link><div className="admin-nav-label">WORKSPACE</div>{nav.map(([label,path])=><Link key={path} to={path==='dashboard'?'/admin/dashboard':`/admin/${path}`}>{label}</Link>)}<button className="button button-ghost" onClick={logout}>Sign out ↗</button></aside><section className="admin-content"><div className="admin-topbar"><span>Portfolio CMS</span><a href="/" target="_blank" rel="noreferrer">View website ↗</a></div><Outlet/></section></div>;
}
