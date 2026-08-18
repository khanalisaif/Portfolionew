import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Briefcase, MapPin } from 'lucide-react';
import './AllEducation.css';
import './AllExperience.css';
import { useBackend as useAdmin } from '../hooks/useBackend';

export default function AllExperience() {
  const { data } = useAdmin();
  const experienceData = data?.experienceData;
  const profileData = data?.profileData;

  if (!experienceData || !profileData) return null;

  return (
    <div className="all-education-page">
      {/* Header */}
      <div className="ae-header-block">
        <Link to="/home" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="ae-header-row">
          <div className="ae-header-left">
            <div className="ae-page-icon">
              <Briefcase size={28} />
            </div>
            <div>
              <h1 className="ae-page-title">{experienceData.sectionTitle}</h1>
              <p className="ae-page-subtitle">{experienceData.sectionSubtitle}</p>
            </div>
          </div>
          <a href={profileData.resumeUrl} download="Mustafa_Hasan_Resume.pdf" className="ae-download-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Download Resume
          </a>
        </div>
      </div>

      {/* Timeline */}
      <div className="exp-timeline-container">
        <div className="exp-timeline-line"></div>
        <div>
          {experienceData.entries.map((entry) => (
            <div className="exp-timeline-item" key={entry.id}>
              <div className="exp-timeline-dot"></div>
              <div className="exp-card">
                <div className="exp-role-row">
                  <h2 className="exp-role">{entry.role}</h2>
                  <span className="exp-period">{entry.period}</span>
                </div>
                <div className="exp-company-loc">
                  <span className="exp-dot-icon">⬝</span> 
                  <span className="exp-company">{entry.company}</span>
                  <span className="exp-sep">|</span>
                  <span className="exp-loc">
                    <MapPin size={14} /> {entry.location}
                  </span>
                </div>
                <p className="exp-desc">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

