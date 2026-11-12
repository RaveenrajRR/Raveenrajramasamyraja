import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Skills from './pages/public/Skills.jsx';
import Projects from './pages/public/Projects.jsx';
import ProjectDetails from './pages/public/ProjectDetails.jsx';
import Experience from './pages/public/Experience.jsx';
import Certifications from './pages/public/Certifications.jsx';
import Services from './pages/public/Services.jsx';
import Availability from './pages/public/Availability.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogDetails from './pages/public/BlogDetails.jsx';
import Contact from './pages/public/Contact.jsx';
import Resume from './pages/public/Resume.jsx';
import Testimonials from './pages/public/Testimonials.jsx';
import PrivacyPolicy from './pages/public/PrivacyPolicy.jsx';
import Terms from './pages/public/Terms.jsx';
import NotFound from './pages/public/NotFound.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import AdminProfile from './pages/admin/Profile.jsx';
import AdminProjects from './pages/admin/Projects.jsx';
import CreateProject from './pages/admin/CreateProject.jsx';
import EditProject from './pages/admin/EditProject.jsx';
import AdminSkills from './pages/admin/Skills.jsx';
import AdminExperience from './pages/admin/Experience.jsx';
import Education from './pages/admin/Education.jsx';
import AdminCertifications from './pages/admin/Certifications.jsx';
import AdminServices from './pages/admin/Services.jsx';
import AdminBlog from './pages/admin/Blog.jsx';
import CreateBlog from './pages/admin/CreateBlog.jsx';
import Enquiries from './pages/admin/Enquiries.jsx';
import AdminTestimonials from './pages/admin/Testimonials.jsx';
import AdminResume from './pages/admin/Resume.jsx';
import Media from './pages/admin/Media.jsx';
import SEO from './pages/admin/SEO.jsx';
import Settings from './pages/admin/Settings.jsx';

export default function App() {
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} /><Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} /><Route path="/experience" element={<Experience />} />
      <Route path="/certifications" element={<Certifications />} /><Route path="/services" element={<Services />} />
      <Route path="/availability" element={<Availability />} /><Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} /><Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} /><Route path="/testimonials" element={<Testimonials />} />
      <Route path="/privacy" element={<PrivacyPolicy />} /><Route path="/terms" element={<Terms />} />
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} /><Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<AdminProfile />} /><Route path="projects" element={<AdminProjects />} />
      <Route path="projects/create" element={<CreateProject />} /><Route path="projects/edit/:id" element={<EditProject />} />
      <Route path="skills" element={<AdminSkills />} /><Route path="experience" element={<AdminExperience />} />
      <Route path="education" element={<Education />} /><Route path="certifications" element={<AdminCertifications />} />
      <Route path="services" element={<AdminServices />} /><Route path="blog" element={<AdminBlog />} />
      <Route path="blog/create" element={<CreateBlog />} /><Route path="enquiries" element={<Enquiries />} />
      <Route path="testimonials" element={<AdminTestimonials />} /><Route path="resume" element={<AdminResume />} />
      <Route path="media" element={<Media />} /><Route path="seo" element={<SEO />} /><Route path="settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
