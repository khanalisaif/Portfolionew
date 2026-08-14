import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './TopNav.css';

const NAV_LINKS = [
  { to: '/',       label: 'About'      },
  { to: '/home',   label: 'Home'       },
];

export default function TopNav() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const isTransparent = isHomePage;
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = isHomePage && scrolled;

  return (
    <nav className={`tnav ${isTransparent ? 'tnav-transparent' : ''} ${isHidden ? 'tnav-hidden' : ''}`}>
      <div className="tnav-links">
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `tnav-link${isActive ? ' active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
