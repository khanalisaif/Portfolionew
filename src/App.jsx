import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './index.css';
import HeroSection from './components/HeroSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import NetworkSection from './components/NetworkSection';
import AllEducation from './pages/AllEducation';
import AllSkills from './pages/AllSkills';
import AllProjects from './pages/AllProjects';
import ProjectDetails from './pages/ProjectDetails';
import ScrollToTop from './components/ScrollToTop';
import TopNav from './components/TopNav';
import AboutPage from './pages/AboutPage';
import AllCertificates from './pages/AllCertificates';
import AllExperience from './pages/AllExperience';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminOtp from './pages/admin/AdminOtp';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import ProfileEdit from './pages/admin/ProfileEdit';
import OrbitEdit from './pages/admin/OrbitEdit';
import SkillsEdit from './pages/admin/SkillsEdit';
import ProjectsEdit from './pages/admin/ProjectsEdit';
import NetworkEdit from './pages/admin/NetworkEdit';
import AllSkillsEdit from './pages/admin/AllSkillsEdit';
import AboutEdit from './pages/admin/AboutEdit';
import ExperienceEdit from './pages/admin/ExperienceEdit';
import CertificatesEdit from './pages/admin/CertificatesEdit';
import AllEducationEdit from './pages/admin/AllEducationEdit';
function Home() {
  return (
    <main>
      <HeroSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <NetworkSection />
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/page/admin');
  const isHomeOrAbout = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      <ScrollToTop />
      {isHomeOrAbout && <TopNav />}
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-education" element={<AllEducation />} />
        <Route path="/all-skills" element={<AllSkills />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/certificates" element={<AllCertificates />} />
        <Route path="/achievements" element={<AllCertificates />} />
        <Route path="/experience" element={<AllExperience />} />
        
        {/* Admin Routes */}
        <Route path="/page/admin/login" element={<AdminLogin />} />
        <Route path="/page/admin/otp" element={<AdminOtp />} />
        <Route path="/page/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="about" element={<AboutEdit />} />
          <Route path="orbit" element={<OrbitEdit />} />
          <Route path="skills" element={<SkillsEdit />} />
          <Route path="all-skills" element={<AllSkillsEdit />} />
          <Route path="projects" element={<ProjectsEdit />} />
          <Route path="network" element={<NetworkEdit />} />
          <Route path="experience" element={<ExperienceEdit />} />
          <Route path="certificates" element={<CertificatesEdit />} />
          <Route path="all-education" element={<AllEducationEdit />} />
        </Route>
      </Routes>
    </>
  );
}
