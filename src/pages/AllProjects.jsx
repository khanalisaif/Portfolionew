import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Folder, ArrowRight, CheckCircle2, Users, Download, Star, Calendar, 
  ExternalLink, Eye, Smartphone, Globe, Cloud, GripHorizontal, 
  BarChart, Rocket, Code2, Layers, Briefcase
} from 'lucide-react';
import { allProjectsData, allProjectsSidebar } from '../data';
import './AllProjects.css';

const categoryIcons = {
  android: Smartphone,
  web: Globe,
  saas: Cloud,
  other: Briefcase,
};

const categoryColors = {
  android: '#22c55e',
  web: '#3b82f6',
  saas: '#a855f7',
  other: '#64748b',
};

export default function AllProjects() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const tabs = [
    { id: 'all', label: 'All Projects', icon: GripHorizontal },
    { id: 'android', label: 'Android Apps', icon: Smartphone },
    { id: 'web', label: 'Web Apps', icon: Globe },
    { id: 'saas', label: 'SaaS Products', icon: Cloud },
    { id: 'other', label: 'Other', icon: Briefcase },
  ];

  const filtered = activeTab === 'all'
    ? allProjectsData
    : allProjectsData.filter(p => p.category === activeTab);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  return (
    <div className="all-projects-page">
      {/* Header */}
      <div className="ap-header">
        <div className="ap-header-left">
          <div className="ap-icon-wrapper">
            <Folder size={28} />
          </div>
          <div>
            <h1 className="ap-title">Projects</h1>
            <p className="ap-subtitle">Things I've built with passion and purpose</p>
          </div>
        </div>
      </div>

      <div className="ap-layout">
        {/* Main Content (Left) */}
        <div className="ap-main">
          {/* Tabs */}
          <div className="ap-tabs">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  className={`ap-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Project List */}
          <div className="ap-list">
            {paginated.length === 0 ? (
              <div className="ap-empty">No projects found in this category.</div>
            ) : paginated.map(project => (
              <div className="ap-card" key={project.id}>
                {/* Image Side */}
                <div className="ap-card-image-wrapper">
                  <div className="ap-badge-featured">
                    <Star size={12} /> {project.badge}
                  </div>
                  <img src={project.image} alt={project.name} className="ap-card-image" />
                </div>

                {/* Content Side */}
                <div className="ap-card-content">
                  <div className="ap-card-header">
                    <div className="ap-card-title-row">
                      <h2 className="ap-card-title">{project.name}</h2>
                      {project.verified && <CheckCircle2 size={16} style={{color: '#3b82f6', flexShrink: 0}} />}
                    </div>
                    <div className="ap-badge-live">
                      <span className="live-dot"></span> {project.liveBadge}
                    </div>
                  </div>

                  <p className="ap-card-desc">{project.description}</p>

                  <div className="ap-tags">
                    {project.tags.map(tag => (
                      <span className="ap-tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="ap-card-footer">
                    <div className="ap-stats">
                      {project.stats.map(stat => {
                        let StatIcon = Users;
                        if (stat.label === 'Downloads') StatIcon = Download;
                        if (stat.label === 'Rating') StatIcon = Star;
                        if (stat.label === 'Completed') StatIcon = Calendar;
                        return (
                          <div className="ap-stat-item" key={stat.label}>
                            <div className="ap-stat-label">
                              <StatIcon size={12} style={{marginRight: 4}} />
                              {stat.label}
                            </div>
                            <div className="ap-stat-value">
                              {stat.isStar && <Star size={12} fill="#f59e0b" color="#f59e0b" style={{marginRight: 4}} />}
                              {stat.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="ap-card-actions">
                      <Link to={`/project/${project.id}`} className="ap-btn-details">
                        <Eye size={14} /> View Details
                      </Link>
                      <a href={project.liveUrl || '#'} className="ap-btn-live" target="_blank" rel="noreferrer">
                        <ExternalLink size={14} /> Live App
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="ap-pagination">
              <button 
                className="ap-page-btn" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  className={`ap-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >{page}</button>
              ))}
              <button 
                className="ap-page-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >&gt;</button>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="ap-sidebar">
          {/* Projects Overview */}
          <div className="ap-sidebar-card">
            <div className="ap-sidebar-header">
              <div className="ap-sidebar-icon"><BarChart size={16} /></div>
              <div>
                <h3 className="ap-sidebar-title">Projects Overview</h3>
                <p className="ap-sidebar-subtitle">A quick summary of my work</p>
              </div>
            </div>
            <div className="ap-overview-grid">
              {allProjectsSidebar.overview.map((item, i) => (
                <div className="ap-overview-stat" key={i}>
                  <div className={`ap-overview-val ${item.color === 'primary' ? 'text-primary' : 'text-purple'}`}>{item.value}</div>
                  <div className="ap-overview-lbl">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies I Use */}
          <div className="ap-sidebar-card">
            <div className="ap-sidebar-header">
              <div className="ap-sidebar-icon"><Code2 size={16} /></div>
              <div>
                <h3 className="ap-sidebar-title">Technologies I Use</h3>
                <p className="ap-sidebar-subtitle">Technologies & tools used in projects</p>
              </div>
            </div>
            <div className="ap-tech-grid">
              {allProjectsSidebar.technologies.map(tech => (
                <div className="ap-tech-item" key={tech.name}>
                  <img src={tech.icon} alt={tech.name} className="ap-tech-icon" />
                  <span className="ap-tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
            <Link to="/all-skills" className="ap-view-all-tech">View All Technologies</Link>
          </div>

          {/* Project Categories */}
          <div className="ap-sidebar-card">
            <div className="ap-sidebar-header">
              <div className="ap-sidebar-icon"><Layers size={16} /></div>
              <div>
                <h3 className="ap-sidebar-title">Project Categories</h3>
                <p className="ap-sidebar-subtitle">Browse projects by category</p>
              </div>
            </div>
            <div className="ap-cat-list">
              {allProjectsSidebar.categories.map(cat => {
                const CatIcon = categoryIcons[cat.id] || Briefcase;
                return (
                  <button 
                    key={cat.id}
                    className={`ap-cat-item ${activeTab === cat.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(cat.id)}
                  >
                    <div className="ap-cat-left">
                      <CatIcon size={14} style={{color: activeTab === cat.id ? 'var(--primary)' : cat.color}} /> {cat.label}
                    </div>
                    <div className="ap-cat-right">{cat.count} &gt;</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hire Me Banner */}
          <div className="ap-hire-banner">
            <div className="ap-hire-icon"><Rocket size={24} /></div>
            <div>
              <h4 className="ap-hire-title">Have a project in mind?</h4>
              <p className="ap-hire-desc">Let's build something amazing together.</p>
              <Link to="/#contact" className="ap-hire-btn">Hire Me <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
