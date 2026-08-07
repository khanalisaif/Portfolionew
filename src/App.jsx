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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-education" element={<AllEducation />} />
      <Route path="/all-skills" element={<AllSkills />} />
      <Route path="/all-projects" element={<AllProjects />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
  );
}
