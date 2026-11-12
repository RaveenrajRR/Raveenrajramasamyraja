import { useEffect, useState } from 'react';
import './EditProject.css';
import { getAdminResource } from '../../services/api.js';
export default function EditProject(){const [data,setData]=useState(null);const [error,setError]=useState('');useEffect(()=>{getAdminResource('editproject').then(setData).catch(e=>setError(e.message))},[]);return <section className="admin-page"><span className="eyebrow">PORTFOLIO CONTROL</span><h1>Edit project</h1><p>Update the selected project.</p>{error&&<p className="form-error">{error}</p>}{data&&<pre className="data-preview">{JSON.stringify(data,null,2)}</pre>}<div className="admin-notice">This management screen is scaffolded. Its CRUD editor will be implemented with the corresponding database resource in the next build phase.</div></section>}
