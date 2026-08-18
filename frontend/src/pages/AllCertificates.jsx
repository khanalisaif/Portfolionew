import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Award, Trophy } from 'lucide-react';
import './AllEducation.css';
import './AllCertificates.css';
import { useBackend as useAdmin } from '../hooks/useBackend';

export default function AllCertificates() {
  const { data } = useAdmin();
  const location = useLocation();
  const certData = data?.certificatesData;
  if (!certData) return null;

  const isAchievements = location.pathname.includes('achievements');
  const title = isAchievements ? 'Achievements' : certData.sectionTitle;
  const subtitle = isAchievements ? 'My core strengths and recognitions' : certData.sectionSubtitle;
  const PageIcon = isAchievements ? Trophy : Award;

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
              <PageIcon size={28} />
            </div>
            <div>
              <h1 className="ae-page-title">{title}</h1>
              <p className="ae-page-subtitle">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cert-page-content">
        {/* Stats Row */}
        <div className="cert-stats-row">
          {certData.stats.map((stat, i) => (
            <div key={i} className="cert-stat-card">
              <div className="cert-stat-value">{stat.value}</div>
              <div className="cert-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="cert-grid">
          {certData.entries.map((cert) => (
            <div key={cert.id} className="cert-card">
              <img
                src={cert.image || 'https://placehold.co/600x400/e2e8f0/64748b?text=Certificate'}
                alt={cert.title}
                className="cert-card-img"
              />
              <div className="cert-card-body">
                <div className="cert-card-meta">
                  <div className="cert-card-issuer">
                    {cert.issuer}
                  </div>
                  <div className="cert-card-date">
                    {cert.date}
                  </div>
                </div>
                <h3 className="cert-card-title">
                  {cert.title}
                </h3>
                <p className="cert-card-desc">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

