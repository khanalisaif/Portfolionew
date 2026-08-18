import { Link } from 'react-router-dom';
import { ArrowLeft, Download, MapPin, CheckCircle2, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import './AllEducation.css';
import { useRef, useState } from 'react';
import { useBackend as useAdmin } from '../hooks/useBackend';

const ITEMS_PER_PAGE = 3;

function CertCarousel({ certificates }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 180, behavior: 'smooth' });
  };
  if (!certificates || certificates.length === 0) return null;
  return (
    <div className="cert-carousel-wrapper">
      <div className="cert-carousel-header">
        <span className="cert-carousel-title">Certificates from University</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="cert-nav-btn" onClick={() => scroll(-1)}><ChevronLeft size={14} /></button>
          <a href="#" className="section-view-all" style={{ fontSize: 12 }}>View All <ChevronRight size={12} /></a>
          <button className="cert-nav-btn" onClick={() => scroll(1)}><ChevronRight size={14} /></button>
        </div>
      </div>
      <div className="cert-carousel-scroll" ref={scrollRef}>
        {certificates.map((cert, i) => (
          <div className="cert-item" key={i}>
            <img src={cert.image} alt={cert.title} />
            <div className="cert-item-title">{cert.title}</div>
            <div className="cert-item-year">{cert.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllEducation() {
  const { data } = useAdmin();
  const allEducationData = data?.allEducationData || data?.educationData?.entries || [];
  const profileData = data?.profileData;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allEducationData.length / ITEMS_PER_PAGE) || 1;
  const paginated = allEducationData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="ae-page-title">All Education</h1>
              <p className="ae-page-subtitle">My academic background and achievements</p>
            </div>
          </div>
          {profileData?.resumeUrl && (
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="ae-download-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Download size={16} /> Download Resume
            </a>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="ae-timeline-container">
        <div className="ae-timeline-line"></div>
        <div className="ae-education-list">
          {paginated.map((entry) => (
            <div className="ae-timeline-item" key={entry.id}>
              <div className="ae-timeline-dot"></div>
              <div className="ae-edu-card">
                <div className="ae-edu-main">
                  {/* Left: University Image */}
                  <div className="ae-edu-image-side">
                    <img src={entry.universityImage} alt={entry.universityName} className="ae-edu-univ-image" />
                    <div className="ae-edu-univ-overlay">
                      <img src={entry.universityLogo} alt="logo" className="ae-edu-univ-logo" />
                      <div>
                        <div className="ae-edu-univ-name">{entry.universityName}</div>
                        <div className="ae-edu-univ-loc">
                          <MapPin size={10} /> {entry.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div className="ae-edu-info-side">
                    <div className="ae-edu-type-badge">{entry.type}</div>
                    <div className="ae-edu-degree-row">
                      <h2 className="ae-edu-degree">{entry.degree}</h2>
                      <span className="ae-edu-period">{entry.period}</span>
                    </div>
                    <div className="ae-edu-univ-inline">
                      <span className="ae-dot-icon">⬝</span> {entry.universityName}
                    </div>
                    <p className="ae-edu-desc">{entry.description}</p>

                    {/* Stats */}
                    <div className="ae-edu-stats">
                      {entry.stats.map((stat, i) => (
                        <div className="ae-edu-stat" key={i}>
                          <div className="ae-edu-stat-label">{stat.label}</div>
                          <div className="ae-edu-stat-value">{stat.value}</div>
                          {stat.sub && <div className="ae-edu-stat-sub">{stat.sub}</div>}
                        </div>
                      ))}
                    </div>

                    {/* Key Achievements */}
                    <div className="ae-achievements-title">Key Achievements</div>
                    {entry.keyAchievements.map((ach, i) => (
                      <div className="ae-achievement-item" key={i}>
                        <CheckCircle2 size={14} className="ae-achievement-check" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate Carousel */}
                {entry.certificates && entry.certificates.length > 0 && (
                  <CertCarousel certificates={entry.certificates} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="ae-pagination">
          <button className="ae-page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} className={`ae-page-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
          <button className="ae-page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

