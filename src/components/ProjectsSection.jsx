import { Briefcase, ChevronRight, Users, Download, Star, Calendar, ExternalLink, Eye, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data';
import { useFadeUp } from '../hooks/useFadeUp';

const statIconMap = {
  users: Users,
  download: Download,
  star: Star,
  calendar: Calendar,
};

const projectColors = [
  { text: '#a78bfa', icon: 'from-violet-500 to-purple-700' },
  { text: '#f59e0b', icon: 'from-yellow-400 to-orange-500' },
];

export default function ProjectsSection() {
  const ref = useFadeUp();
  const { sectionTitle, sectionSubtitle, viewAllUrl, featured } = projectsData;

  return (
    <section id="projects" className="section-container" style={{ paddingTop: 0 }}>
      <div ref={ref} className="fade-up">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-icon">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="section-title">{sectionTitle}</div>
              <div className="section-subtitle">{sectionSubtitle}</div>
            </div>
          </div>
          <Link to="/all-projects" className="section-view-all" id="projects-view-all">
            View All Projects <ChevronRight size={14} />
          </Link>
        </div>

        {/* Project Cards */}
        {featured.map((project, idx) => {
          const color = projectColors[idx % projectColors.length];
          return (
            <div className="project-card" key={project.id} id={`project-${project.id}`}>
              {/* Left: Info */}
              <div className="project-info">
                <div className="project-badge" style={{ color: color.text }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color.text, display: 'inline-block', marginRight: 4 }} />
                  {project.badge}
                </div>

                <div className="project-name">
                  {project.name}
                  {project.verified && (
                    <span className="verified-badge">
                      <CheckCircle2 size={12} />
                    </span>
                  )}
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="project-tag" key={i}>{tag}</span>
                  ))}
                </div>

                <div className="project-stats-row">
                  {project.stats.map((stat, i) => {
                    const Icon = statIconMap[stat.icon] || Users;
                    return (
                      <div className="project-stat" key={i}>
                        <Icon size={16} className="project-stat-icon" />
                        <div>
                          <div className="project-stat-info-label">{stat.label}</div>
                          <div className="project-stat-info-value">{stat.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="project-buttons">
                  <Link to={`/project/${project.id}`} className="project-btn-primary" id={`details-${project.id}`}>
                    <Eye size={14} /> View Details
                  </Link>
                  <a href={project.liveUrl} className="project-btn-secondary" id={`live-${project.id}`}>
                    <ExternalLink size={14} /> Live App
                  </a>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="project-visual" style={{ padding: 0 }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
