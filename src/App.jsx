import { Routes, Route } from 'react-router-dom';
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

// Admin Pages (Commented out for Netlify build since admin is in .gitignore)
/*
import AdminLogin from './pages/admin/AdminLogin';
import AdminOtp from './pages/admin/AdminOtp';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import ProfileEdit from './pages/admin/ProfileEdit';
import OrbitEdit from './pages/admin/OrbitEdit';
import EducationEdit from './pages/admin/EducationEdit';
import SkillsEdit from './pages/admin/SkillsEdit';
import ProjectsEdit from './pages/admin/ProjectsEdit';
import NetworkEdit from './pages/admin/NetworkEdit';
import AllSkillsEdit from './pages/admin/AllSkillsEdit';
*/

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
  return (
    <>
      <ScrollToTop />
      <TopNav />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-education" element={<AllEducation />} />
        <Route path="/all-skills" element={<AllSkills />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        
        {/* Admin Routes (Commented out for Netlify build) */}
        {/*
        <Route path="/page/admin/login" element={<AdminLogin />} />
        <Route path="/page/admin/otp" element={<AdminOtp />} />
        <Route path="/page/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="orbit" element={<OrbitEdit />} />
          <Route path="education" element={<EducationEdit />} />
          <Route path="skills" element={<SkillsEdit />} />
          <Route path="all-skills" element={<AllSkillsEdit />} />
          <Route path="projects" element={<ProjectsEdit />} />
          <Route path="network" element={<NetworkEdit />} />
        </Route>
        */}
      </Routes>
    </>
  );
}
