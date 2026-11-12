import { useEffect, useState } from 'react';
import './CreateBlog.css';
import { getAdminResource } from '../../services/api.js';
export default function CreateBlog(){const [data,setData]=useState(null);const [error,setError]=useState('');useEffect(()=>{getAdminResource('createblog').then(setData).catch(e=>setError(e.message))},[]);return <section className="admin-page"><span className="eyebrow">PORTFOLIO CONTROL</span><h1>Create article</h1><p>Write a new blog post.</p>{error&&<p className="form-error">{error}</p>}{data&&<pre className="data-preview">{JSON.stringify(data,null,2)}</pre>}<div className="admin-notice">This management screen is scaffolded. Its CRUD editor will be implemented with the corresponding database resource in the next build phase.</div></section>}
