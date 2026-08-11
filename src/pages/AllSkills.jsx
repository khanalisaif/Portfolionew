import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Rocket, ArrowRight, ChevronDown } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import './AllSkills.css';

export default function AllSkills() {
  const { data: { allSkillsCategories, allSkillsDetailed } } = useAdmin();
  const [activeCategory, setActiveCategory] = useState(allSkillsCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllMobileCategories, setShowAllMobileCategories] = useState(false);

  // Filter categories by search
  const filteredCategories = searchQuery
    ? allSkillsCategories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allSkillsCategories;

  // Get data for active category
  const activeData = allSkillsDetailed[activeCategory];

  // The icon for the currently selected category
  const activeCat = allSkillsCategories.find(c => c.id === activeCategory);

  return (
    <div className="all-skills-page">
      {/* Top Navigation & Header */}
      <div className="all-skills-top">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="all-skills-header">
          <div className="all-skills-title-area">
            <div className="page-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div>
              <h1 className="page-title">All Skills</h1>
              <p className="page-subtitle">Technologies and tools I work with to bring ideas to life</p>
            </div>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Search size={16} className="search-icon" />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="all-skills-layout">
        {/* Sidebar */}
        <div className="skills-sidebar-nav">
          <div className="sidebar-nav-title">SKILL CATEGORIES</div>
          <div className="category-list">
            {filteredCategories.map((cat, idx) => (
              <button
                key={cat.id}
                className={`category-item ${activeCategory === cat.id ? 'active' : ''} ${!showAllMobileCategories && idx >= 3 ? 'hide-on-mobile' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="category-item-left">
                  <img src={cat.icon} alt={cat.name} className="category-icon" />
                  <span className="category-name">{cat.name}</span>
                </div>
                <span className="category-count">{cat.count}</span>
              </button>
            ))}
          </div>
          {filteredCategories.length > 3 && (
            <button 
              className="show-more-mobile-btn"
              onClick={() => setShowAllMobileCategories(!showAllMobileCategories)}
            >
              {showAllMobileCategories ? 'Show Less' : 'Show All Categories'} 
              <ChevronDown size={14} style={{ transform: showAllMobileCategories ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>
          )}
        </div>

        {/* Right Content */}
        <div className="skills-content-area">
          {/* Header Card */}
          <div className="skill-detail-header-card">
            <div className="header-card-top">
              {activeCat && (
                <img src={activeCat.icon} alt={activeData.title} className="header-card-icon" />
              )}
              <div>
                <div className="header-card-title-row">
                  <h2 className="header-card-title">{activeData.title}</h2>
                  <span className="primary-badge">{activeData.badge}</span>
                </div>
                <p className="header-card-desc">{activeData.description}</p>
              </div>
            </div>
            <div className="header-card-meta">
              {activeData.meta.map((m, i) => (
                <div className="meta-item" key={i}>
                  <div className="meta-icon-wrapper">
                    {m.icon && m.icon.startsWith('http') ? (
                      <img src={m.icon} alt="" width={16} height={16} />
                    ) : (
                      <div style={{ width: 16, height: 16, background: '#e0e7ff', borderRadius: 4 }}></div>
                    )}
                  </div>
                  <div>
                    <div className="meta-label">{m.label}</div>
                    <div className="meta-value">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="breakdown-section-header">
            <div>
              <h3 className="breakdown-title">{activeData.title} - Skills Breakdown</h3>
              <p className="breakdown-subtitle">Detailed overview of concepts, libraries and features I have worked with</p>
            </div>
            <span className="count-badge">{activeData.breakdownCount} Skills</span>
          </div>

          <div className="breakdown-list">
            {activeData.breakdownItems.map((item) => (
              <div className="breakdown-card" key={item.id}>
                {/* Left Info */}
                <div className="breakdown-info">
                  <div className="breakdown-icon">
                    {activeCat ? (
                      <img src={activeCat.icon} alt="" width={24} height={24} style={{ objectFit: 'contain' }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    )}
                  </div>
                  <div>
                    <div className="breakdown-item-title-row">
                      <h4 className="breakdown-item-title">{item.title}</h4>
                    </div>
                    <span className={`level-badge ${item.level.toLowerCase()}`}>{item.level}</span>
                    <p className="breakdown-item-desc">{item.description}</p>
                  </div>
                </div>

                {/* Middle Points */}
                <ul className="breakdown-points">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>

                {/* Right Experience */}
                <div className="breakdown-experience">
                  <span className="exp-label">Experience</span>
                  <span className="exp-value">{item.experience}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Banner */}
          <div className="learning-banner">
            <div className="banner-left">
              <div className="banner-icon"><Rocket size={24} /></div>
              <div>
                <h4 className="banner-title">Always Learning</h4>
                <p className="banner-desc">I'm always exploring new technologies and improving my skills to build better applications and solve complex problems.</p>
              </div>
            </div>
            <Link to="/all-projects" className="banner-btn">
              Explore My Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
