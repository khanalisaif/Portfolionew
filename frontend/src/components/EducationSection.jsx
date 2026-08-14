import { useState, useEffect } from 'react';
import { GraduationCap, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEducation } from '../services/api';
import { useFadeUp } from '../hooks/useFadeUp';

export default function EducationSection() {
  const [educationData, setEducationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useFadeUp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEducation();
        setEducationData(res.data);
      } catch (err) {
        console.error("Error fetching education data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !educationData) return null;

  const { sectionTitle, sectionSubtitle, viewAllUrl, entries } = educationData;

  return (
    <section id="education" className="section-container">
      <div ref={ref} className="fade-up">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="section-title">{sectionTitle}</div>
              <div className="section-subtitle">{sectionSubtitle}</div>
            </div>
          </div>
          <Link to="/all-education" className="section-view-all view-all-desktop" id="edu-view-all">
            View All Education <ChevronRight size={14} />
          </Link>
        </div>

        {/* Education Entries */}
        {entries.map(entry => (
          <div className="edu-card" key={entry.id} id={`edu-${entry.id}`}>
            <div className="edu-main">
              {/* Left: University Image */}
              <div className="edu-image-side">
                <img src={entry.universityImage} alt={entry.universityName} className="edu-univ-image" />
                <div className="edu-univ-overlay">
                  <img src={entry.universityLogo} alt="logo" className="edu-univ-logo" />
                  <div>
                    <div className="edu-univ-name">{entry.universityName}</div>
                    <div className="edu-univ-loc">
                      <MapPin size={10} /> {entry.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Info */}
              <div className="edu-info-side">
                <div className="edu-type-badge">{entry.type}</div>
                <div className="edu-degree">
                  {entry.degree}
                  <span className="edu-period">{entry.period}</span>
                </div>
                <div className="edu-univ-name-inline" style={{ marginTop: 8 }}>
                  <span style={{ color: '#94a3b8' }}>⬝</span> {entry.universityName}
                </div>
                <p className="edu-desc">{entry.description}</p>

                {/* Stats Row */}
                <div className="edu-stats">
                  {entry.stats.map((stat, i) => (
                    <div className="edu-stat" key={i}>
                      <div className="edu-stat-label">{stat.label}</div>
                      <div className="edu-stat-value">{stat.value}</div>
                      {stat.sub && <div className="edu-stat-sub">{stat.sub}</div>}
                    </div>
                  ))}
                </div>

                {/* Key Achievements */}
                <div className="edu-achievements-title">Key Achievements</div>
                {entry.keyAchievements.map((ach, i) => (
                  <div className="edu-achievement-item" key={i}>
                    <CheckCircle2 size={14} className="edu-achievement-check" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}

        {/* Mobile View All Link at the bottom */}
        <Link to="/all-education" className="section-view-all view-all-mobile" id="edu-view-all-mobile">
          View All Education <ChevronRight size={14} />
        </Link>
      </div>
    </section>
  );
}
