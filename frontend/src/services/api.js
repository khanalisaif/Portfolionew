import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// ── Auth token injection ────────────────────────────────
// Attach JWT token from localStorage to every request (for protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── AUTH ───────────────────────────────────────────────
// POST /api/auth/request-otp  → { email }
export const requestOtp = (email) => api.post('/auth/request-otp', { email });

// POST /api/auth/verify-otp   → { email, otp }
export const verifyOtp = (email, otp) => api.post('/auth/verify-otp', { email, otp });

// GET  /api/auth/me            (protected)
export const getMe = () => api.get('/auth/me');

// ── PROFILE ────────────────────────────────────────────
// GET  /api/profile
export const getProfile = () => api.get('/profile');

// PUT  /api/profile            (protected)
export const updateProfile = (data) => api.put('/profile', data);

// ── ORBIT CARDS ────────────────────────────────────────
// GET  /api/orbit              → returns array of cards sorted by order
export const getOrbitCards = () => api.get('/orbit');

// PUT  /api/orbit              → send full array to replace all cards (protected)
export const updateOrbitCards = (cardsArray) => api.put('/orbit', cardsArray);

// ── EDUCATION (Hero Section) ───────────────────────────
// GET  /api/education          → returns { sectionTitle, sectionSubtitle, entries[] }
export const getEducation = () => api.get('/education');

// PUT  /api/education          → update full education section doc (protected)
export const updateEducation = (data) => api.put('/education', data);

// ── ALL EDUCATION (Full Page) ──────────────────────────
// GET  /api/education/all      → returns array of all education records
export const getAllEducation = () => api.get('/education/all');

// PUT  /api/education/all      → send array to replace all records (protected)
export const updateAllEducation = (itemsArray) => api.put('/education/all', itemsArray);

// ── SKILLS (Hero Section) ──────────────────────────────
// GET  /api/skills             → returns { sectionTitle, technicalSkills[], skillsOverview, ... }
export const getSkills = () => api.get('/skills');

// PUT  /api/skills             → update full skills section doc (protected)
export const updateSkills = (data) => api.put('/skills', data);

// ── ALL SKILLS CATEGORIES (Full Page) ─────────────────
// GET  /api/skills/categories  → returns array of skill categories
export const getAllSkillsCategories = () => api.get('/skills/categories');

// PUT  /api/skills/categories  → send array to replace all categories (protected)
export const updateAllSkillsCategories = (categoriesArray) => api.put('/skills/categories', categoriesArray);

// ── ALL SKILLS DETAILED ────────────────────────────────
// GET  /api/skills/detailed    → returns object map { skillId: skillData }
export const getAllSkillsDetailed = () => api.get('/skills/detailed');

// PUT  /api/skills/detailed    → send object map to replace all detailed (protected)
export const updateAllSkillsDetailed = (detailedMap) => api.put('/skills/detailed', detailedMap);

// ── PROJECTS (List) ────────────────────────────────────
// GET  /api/projects           → returns array of projects sorted by order
export const getProjects = () => api.get('/projects');

// PUT  /api/projects           → send full array to replace all projects (protected)
export const updateProjects = (projectsArray) => api.put('/projects', projectsArray);

// ── PROJECT DETAILS ────────────────────────────────────
// GET  /api/projects/details   → returns object map { projectId: detailsData }
export const getProjectDetails = () => api.get('/projects/details');

// PUT  /api/projects/details   → send object map to replace all details (protected)
export const updateProjectDetails = (detailsMap) => api.put('/projects/details', detailsMap);

// ── PROJECTS PAGE INFO ─────────────────────────────────
// GET  /api/projects/page      → returns { sectionTitle, sectionSubtitle, ... }
export const getProjectsPage = () => api.get('/projects/page');

// PUT  /api/projects/page      → update projects page header info (protected)
export const updateProjectsPage = (data) => api.put('/projects/page', data);

// ── NETWORK ────────────────────────────────────────────
// GET  /api/network            → returns { sectionTitle, centerLabel, connections[] }
export const getNetwork = () => api.get('/network');

// PUT  /api/network            → update full network section doc (protected)
export const updateNetwork = (data) => api.put('/network', data);

// ── EXPERIENCE ─────────────────────────────────────────
// GET  /api/experience         → returns experience section doc
export const getExperience = () => api.get('/experience');

// PUT  /api/experience         → update full experience section doc (protected)
export const updateExperience = (data) => api.put('/experience', data);

// ── CERTIFICATES ───────────────────────────────────────
// GET  /api/certificates       → returns certificates section doc
export const getCertificates = () => api.get('/certificates');

// PUT  /api/certificates       → update full certificates section doc (protected)
export const updateCertificates = (data) => api.put('/certificates', data);

// ── ABOUT ──────────────────────────────────────────────
// GET  /api/about              → returns about section doc
export const getAbout = () => api.get('/about');

// PUT  /api/about              → update full about section doc (protected)
export const updateAbout = (data) => api.put('/about', data);

// ── FILE UPLOAD ────────────────────────────────────────
// POST /api/upload             → returns { url } (protected)
export const uploadFile = (formData) =>
  api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export default api;

