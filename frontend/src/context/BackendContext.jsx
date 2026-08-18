import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  // ── Auth State ────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(() => sessionStorage.getItem('adminPendingEmail') || '');

  // ── Data State ────────────────────────────────────────
  const [data, setData] = useState({
    profileData: null,
    orbitCards: [],
    educationData: null,
    allEducationData: [],
    skillsData: null,
    allSkillsCategories: [],
    allSkillsDetailed: {},
    projectsData: null,
    allProjectsData: [],
    projectDetailsData: {},
    networkData: null,
    experienceData: null,
    certificatesData: null,
    aboutData: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Verify existing token on mount ────────────────────
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        await api.getMe();
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    verifySession();
  }, []);

  // ── Fetch all data (Publicly available) ─────────────────
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const safe = (p) => p.catch(() => ({ data: null }));
      const [
        profileRes, orbitRes, eduRes, allEduRes,
        skillsRes, catRes, detailedRes,
        projPageRes, projRes, projDetailsRes,
        netRes, expRes, certRes, aboutRes
      ] = await Promise.all([
        safe(api.getProfile()),
        safe(api.getOrbitCards()),
        safe(api.getEducation()),
        safe(api.getAllEducation()),
        safe(api.getSkills()),
        safe(api.getAllSkillsCategories()),
        safe(api.getAllSkillsDetailed()),
        safe(api.getProjectsPage()),
        safe(api.getProjects()),
        safe(api.getProjectDetails()),
        safe(api.getNetwork()),
        safe(api.getExperience()),
        safe(api.getCertificates()),
        safe(api.getAbout()),
      ]);

      setData({
        profileData:        profileRes?.data     || null,
        orbitCards:         orbitRes?.data       || [],
        educationData:      eduRes?.data         || null,
        allEducationData:   allEduRes?.data      || [],
        skillsData:         skillsRes?.data      || null,
        allSkillsCategories: catRes?.data        || [],
        allSkillsDetailed:  detailedRes?.data    || {},
        projectsData:       projPageRes?.data    || null,
        allProjectsData:    projRes?.data        || [],
        projectDetailsData: projDetailsRes?.data || {},
        networkData:        netRes?.data         || null,
        experienceData:     expRes?.data         || null,
        certificatesData:   certRes?.data        || null,
        aboutData:          aboutRes?.data       || null,
        aboutPageData:      aboutRes?.data       || null,
      });
    } catch (err) {
      setError('Failed to load data. Check backend connection.');
      console.error('[BackendContext] fetchAllData error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all data unconditionally on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ── Auth Methods ──────────────────────────────────────
  const login = async (email) => {
    try {
      await api.requestOtp(email);
      setPendingEmail(email);
      sessionStorage.setItem('adminPendingEmail', email);
      return { success: true };
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to send OTP. Check your email address.';
      return { success: false, error: msg };
    }
  };

  const verifyOtp = async (otp) => {
    const email = pendingEmail || sessionStorage.getItem('adminPendingEmail');
    if (!email) return { success: false, error: 'Session expired. Please re-enter your email.' };
    try {
      const res = await api.verifyOtp(email, otp);
      const token = res.data?.token;
      if (!token) return { success: false, error: 'Invalid response from server.' };
      localStorage.setItem('adminToken', token);
      sessionStorage.removeItem('adminPendingEmail');
      setPendingEmail('');
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid or expired OTP. Please try again.';
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminPendingEmail');
    setIsAuthenticated(false);
    setPendingEmail('');
  };

  // ── Update Data (Save to Backend) ─────────────────────
  const updateData = async (key, newValue) => {
    try {
      switch (key) {
        case 'profileData': await api.updateProfile(newValue); break;
        case 'orbitCards': await api.updateOrbitCards(Array.isArray(newValue) ? newValue : []); break;
        case 'educationData': await api.updateEducation(newValue); break;
        case 'allEducationData': await api.updateAllEducation(Array.isArray(newValue) ? newValue : []); break;
        case 'skillsData': await api.updateSkills(newValue); break;
        case 'allSkillsCategories': await api.updateAllSkillsCategories(Array.isArray(newValue) ? newValue : []); break;
        case 'allSkillsDetailed': await api.updateAllSkillsDetailed(newValue); break;
        case 'projectsData': await api.updateProjectsPage(newValue); break;
        case 'allProjectsData': await api.updateProjects(Array.isArray(newValue) ? newValue : []); break;
        case 'projectDetailsData': await api.updateProjectDetails(newValue); break;
        case 'networkData': await api.updateNetwork(newValue); break;
        case 'experienceData': await api.updateExperience(newValue); break;
        case 'certificatesData': await api.updateCertificates(newValue); break;
        case 'aboutData':
        case 'aboutPageData':
          await api.updateAbout(newValue);
          setData(prev => ({ ...prev, aboutData: newValue, aboutPageData: newValue }));
          return { success: true };
        default:
          console.warn(`[BackendContext] updateData: unknown key "${key}"`);
          return { success: false, error: `Unknown data key: ${key}` };
      }
      setData(prev => ({ ...prev, [key]: newValue }));
      return { success: true };
    } catch (err) {
      const msg = err?.response?.data?.message || `Failed to save ${key}. Check backend.`;
      console.error(`[BackendContext] updateData error for key "${key}":`, err);
      return { success: false, error: msg };
    }
  };

  return (
    <BackendContext.Provider value={{
      isAuthenticated,
      authLoading,
      login,
      verifyOtp,
      logout,
      data,
      loading,
      error,
      updateData,
      refetch: fetchAllData,
    }}>
      {children}
    </BackendContext.Provider>
  );
};
