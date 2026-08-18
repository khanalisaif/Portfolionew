import React from 'react';
import { useBackend } from '../../hooks/useBackend';
import { Link } from 'react-router-dom';
import { User, BookOpen, Wrench, Briefcase, Network, Navigation, ChevronRight } from 'lucide-react';
import '../../admin.css';

const cards = [
  { label: 'Profile', desc: 'Update your name, titles, avatar, and resume', icon: User, colorClass: 'indigo', path: '/page/admin/profile' },
  { label: 'Orbit Cards', desc: 'Edit the 6 floating cards around your hero photo', icon: Navigation, colorClass: 'violet', path: '/page/admin/orbit' },
  { label: 'Education', desc: 'Manage academic records, stats and certificates', icon: BookOpen, colorClass: 'purple', path: '/page/admin/education' },
  { label: 'Skills', desc: 'Add technical skills, popular tools, and learning list', icon: Wrench, colorClass: 'cyan', path: '/page/admin/skills' },
  { label: 'Projects', desc: 'Manage featured projects with images and stats', icon: Briefcase, colorClass: 'green', path: '/page/admin/projects' },
  { label: 'Network', desc: 'Edit industry connections in the network graph', icon: Network, colorClass: 'pink', path: '/page/admin/network' },
];

// Gradient styles for each color class
const gradients = {
  indigo: 'linear-gradient(135deg, #6366f1, #4f46e5)',
  violet: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  purple: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  cyan:   'linear-gradient(135deg, #06b6d4, #0891b2)',
  green:  'linear-gradient(135deg, #22c55e, #16a34a)',
  pink:   'linear-gradient(135deg, #ec4899, #db2777)',
};

const AdminHome = () => {
  const { data } = useBackend();
  const pd = data.profileData;
  const ed = data.educationData;
  const sd = data.skillsData;
  const prd = data.projectsData;
  const orb = data.orbitCards;

  const stats = [
    { label: 'Education Entries', value: ed?.entries?.length || 0 },
    { label: 'Technical Skills', value: sd?.technicalSkills?.length || 0 },
    { label: 'Featured Projects', value: (prd?.featured || prd?.featuredProjects || []).length },
    { label: 'Orbit Cards', value: orb?.length || 0 },
  ];

  return (
    <div className="admin-home a-fade-up">
      {/* Welcome Card */}
      <div className="admin-welcome-card">
        <div className="admin-welcome-body">
          {/* Avatar */}
          <div className="admin-welcome-avatar">
            {pd?.avatarUrl
              ? <img src={pd.avatarUrl} alt="avatar" />
              : <div className="admin-welcome-avatar-fallback"><User size={22} /></div>
            }
          </div>

          <div className="admin-welcome-text">
            <div className="admin-status-pill">
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span style={{ position: 'absolute', inset: 0, background: '#22c55e', borderRadius: '50%', animation: 'livePing 1.5s ease-in-out infinite' }} />
                <span style={{ position: 'relative', width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'block' }} />
              </span>
              Admin Mode Active
            </div>
            <h2 className="admin-welcome-name">
              Welcome back, {pd?.nameParts?.first || pd?.name || 'Admin'}!
            </h2>
            <p className="admin-welcome-desc">
              All edits you make here are saved directly to the backend database and instantly reflected on your live portfolio.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats-row">
          {stats.map(stat => (
            <div key={stat.label} className="admin-stat-cell">
              <span className="admin-stat-number">{stat.value}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section Cards */}
      <div>
        <div className="a-section-divider" style={{ marginBottom: 14 }}>
          <h3>Manage Sections</h3>
        </div>
        <div className="admin-section-cards">
          {cards.map(card => (
            <Link key={card.label} to={card.path} className="admin-section-card">
              <div
                className="admin-section-card-icon"
                style={{ background: gradients[card.colorClass], boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
              >
                <card.icon size={19} />
              </div>
              <div className="admin-section-card-text">
                <p className="admin-section-card-title">{card.label}</p>
                <p className="admin-section-card-desc">{card.desc}</p>
              </div>
              <ChevronRight size={15} className="admin-section-card-arrow" />
            </Link>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="admin-tip-box">
        <div className="admin-tip-emoji">💡</div>
        <div>
          <p className="admin-tip-title">Quick Tip</p>
          <p className="admin-tip-text">
            Use image URLs (like from Unsplash, devicons, or Cloudinary) whenever possible to keep storage usage low. For icons, try{' '}
            <code>cdn.jsdelivr.net/gh/devicons/devicon</code> for free tech icons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
