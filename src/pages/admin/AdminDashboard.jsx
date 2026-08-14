import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../admin.css';
import {
  LayoutDashboard, LogOut, User, Navigation, BookOpen, Wrench, Briefcase, Network, Database,
  ChevronRight, RefreshCw, Menu, X, Info, Award, GraduationCap
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/page/admin', exact: true, icon: LayoutDashboard, colorClass: 'indigo' },
  { name: 'Profile', path: '/page/admin/profile', icon: User, colorClass: 'blue' },
  { name: 'About Page', path: '/page/admin/about', icon: Info, colorClass: 'indigo' },
  { name: 'Orbit Cards', path: '/page/admin/orbit', icon: Navigation, colorClass: 'violet' },
  { name: 'Skills', path: '/page/admin/skills', icon: Wrench, colorClass: 'cyan' },
  { name: 'All Skills', path: '/page/admin/all-skills', icon: Database, colorClass: 'slate' },
  { name: 'Projects', path: '/page/admin/projects', icon: Briefcase, colorClass: 'green' },
  { name: 'Network', path: '/page/admin/network', icon: Network, colorClass: 'pink' },
  { name: 'Experience', path: '/page/admin/experience', icon: Briefcase, colorClass: 'purple' },
  { name: 'Certificates', path: '/page/admin/certificates', icon: Award, colorClass: 'yellow' },
  { name: 'All Education', path: '/page/admin/all-education', icon: GraduationCap, colorClass: 'blue' },
];

const AdminDashboard = () => {
  const { isAuthenticated, logout, resetToDefault } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/page/admin/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) return null;

  const handleLogout = () => { logout(); navigate('/page/admin/login'); };

  const activeItem = navItems.find(item =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path) && !item.exact
  ) || navItems[0];

  return (
    <div className="admin-root">
      <div className="admin-shell">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="admin-overlay open" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
          {/* Logo */}
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-icon">AP</div>
            <div className="admin-sidebar-logo-text">
              <h2>Admin Panel</h2>
              <p>Portfolio Manager</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{ display: 'none', marginLeft: 'auto', padding: '6px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#475569' }}
              className="sidebar-close-btn"
            >
              <X size={15} />
            </button>
          </div>

          {/* Nav */}
          <nav className="admin-nav">
            <div className="admin-nav-label">Sections</div>
            <ul className="admin-nav-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="admin-nav-icon">
                          <item.icon size={15} />
                        </div>
                        <span style={{ flex: 1 }}>{item.name}</span>
                        {isActive && <ChevronRight size={13} />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="admin-live-badge" style={{ marginTop: 16 }}>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <span className="admin-live-dot">
                  <span className="admin-live-dot-ping" />
                  <span className="admin-live-dot-inner" />
                </span>
                View Live Site
              </a>
            </div>
          </nav>

          {/* Footer actions */}
          <div className="admin-sidebar-footer">
            <button onClick={handleLogout} className="admin-btn-logout">
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="admin-main">
          {/* Topbar */}
          <header className="admin-topbar">
            <button className="admin-hamburger" onClick={() => setSidebarOpen(true)} style={{ display: 'flex' }}>
              <Menu size={17} />
            </button>

            <div className="admin-topbar-title">
              <div
                className={`admin-topbar-icon a-icon-badge ${activeItem.colorClass}`}
                style={{ width: 32, height: 32, borderRadius: 9 }}
              >
                <activeItem.icon size={15} />
              </div>
              <h1>{activeItem.name}</h1>
            </div>

            <div className="admin-topbar-right">
              <a href="/" target="_blank" rel="noopener noreferrer" className="admin-live-chip">
                <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }} />
                Live Site
              </a>
            </div>
          </header>

          {/* Page content */}
          <main className="admin-page">
            <div className="admin-page-inner">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;