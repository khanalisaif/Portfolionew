import React, { createContext, useState, useContext, useEffect } from 'react';
import * as initialData from '../data';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        return { ...initialData, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Error parsing portfolio data:', e);
      }
    }
    return { ...initialData };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  const [savedEmail, setSavedEmail] = useState(() => {
    return localStorage.getItem('adminEmail') || '';
  });

  useEffect(() => {
    localStorage.setItem('adminAuth', isAuthenticated.toString());
  }, [isAuthenticated]);

  const updateData = (section, newData) => {
    setData((prev) => {
      const nextData = {
        ...prev,
        [section]: newData
      };
      localStorage.setItem('portfolioData', JSON.stringify(nextData));
      return nextData;
    });
  };

  const login = (email) => {
    localStorage.setItem('adminEmail', email);
    setSavedEmail(email);
  };

  const verifyOtp = (otp) => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    setSavedEmail('');
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      localStorage.removeItem('portfolioData');
      setData({ ...initialData });
    }
  };

  return (
    <AdminContext.Provider value={{ data, updateData, isAuthenticated, login, verifyOtp, logout, resetToDefault, savedEmail }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
