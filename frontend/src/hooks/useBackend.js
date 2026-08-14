import { useState, useEffect } from 'react';
import * as api from '../services/api';

export function useBackend() {
  const [data, setData] = useState({
    profileData: null,
    orbitCards: [],
    educationData: null,
    skillsData: null,
    projectsData: null,
    networkData: null,
    experienceData: null,
    certificatesData: null,
    aboutData: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          profileRes, orbitRes, eduRes, skillsRes, projRes, netRes, expRes, certRes, aboutRes
        ] = await Promise.all([
          api.getProfile(),
          api.getOrbit(),
          api.getEducation(),
          api.getSkills(),
          api.getProjects(),
          api.getNetwork(),
          api.getExperience(),
          api.getCertificates(),
          api.getAbout()
        ].map(p => p.catch(e => ({ data: null })))); // catch errors for missing endpoints

        setData({
          profileData: profileRes?.data || {},
          orbitCards: orbitRes?.data || [],
          educationData: eduRes?.data || {},
          skillsData: skillsRes?.data || {},
          projectsData: projRes?.data || {},
          networkData: netRes?.data || {},
          experienceData: expRes?.data || {},
          certificatesData: certRes?.data || {},
          aboutData: aboutRes?.data || {}
        });
      } catch (e) {
        console.error("Error fetching admin data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const updateData = async (key, newData) => {
    try {
      if (key === 'profileData') await api.updateProfile(newData);
      else if (key === 'orbitCards') await api.updateOrbit(newData); 
      else if (key === 'educationData') await api.addEducation(newData); // Fallbacks
      else if (key === 'skillsData') await api.addSkill(newData);
      else if (key === 'projectsData') await api.addProject(newData);
      else if (key === 'networkData') await api.addNetwork(newData);
      else if (key === 'aboutData') await api.updateAbout(newData);
      
      // Update local state to reflect instantly
      setData(prev => ({ ...prev, [key]: newData }));
      return true;
    } catch (e) {
      console.error(`Error updating ${key}:`, e);
      return false;
    }
  };

  return { data, updateData, loading };
}
