import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar.jsx';
import Footer from '../navigation/Footer.jsx';
export default function PublicLayout() { return <><Navbar /><main className="site-main"><Outlet /></main><Footer /></>; }
