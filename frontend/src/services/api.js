import { supabase } from './auth.js';
const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const session = supabase ? (await supabase.auth.getSession()).data.session : null;
  const headers = { ...(options.body instanceof FormData ? {} : {'Content-Type':'application/json'}), ...(options.headers || {}) };
  if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  const response = await fetch(`${BASE}${path}`, { ...options, headers, credentials:'include' });
  const payload = await response.json().catch(() => ({message:'Unexpected server response'}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload;
}
export const apiRequest = request;
export const submitContact = data => request('/contact', {method:'POST', body:JSON.stringify(data)});
export const getAdminResource = name => request(`/admin/resources/${encodeURIComponent(name)}`);
export const createAdminResource = (name, data) => request(`/admin/resources/${encodeURIComponent(name)}`, {method:'POST', body:JSON.stringify(data)});
export const updateAdminResource = (name, id, data) => request(`/admin/resources/${encodeURIComponent(name)}/${id}`, {method:'PATCH', body:JSON.stringify(data)});
export const deleteAdminResource = (name, id) => request(`/admin/resources/${encodeURIComponent(name)}/${id}`, {method:'DELETE'});
export const getProjects = () => request('/projects');
export const getPublicResource = name => request(`/public/${encodeURIComponent(name)}`);
