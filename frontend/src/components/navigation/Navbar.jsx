import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
const links=[['About','/about'],['Skills','/skills'],['Projects','/projects'],['Services','/services'],['Blog','/blog']];
export default function Navbar(){const [open,setOpen]=useState(false);return <header className="navbar"><Link className="brand" to="/">RAVEEN<span>.</span></Link><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button><nav className={open?'nav-links is-open':'nav-links'}>{links.map(([n,p])=><NavLink key={p} to={p} onClick={()=>setOpen(false)}>{n}</NavLink>)}<Link className="button button-small" to="/contact" onClick={()=>setOpen(false)}>Let's talk ↗</Link></nav></header>}
