import { useParams, Link } from 'react-router-dom';
import {
  Folder, ArrowRight, CheckCircle2, ExternalLink, Eye, Star,
  BarChart, Smartphone, Code2, Users, Download, Calendar,
  Layers, Database, Server, Settings, Wrench, CheckCircle,
  Phone, RefreshCw, Shield, Zap, ArrowLeft
} from 'lucide-react';
import { useBackend as useAdmin } from '../hooks/useBackend';
import './ProjectDetails.css';

const iconMap = {
  user: Users,
  download: Download,
  star: Star,
  calendar: Calendar,
  android: Smartphone,
  architecture: Layers,
  code: Code2,
  database: Database,
  server: Server,
  state: Settings,
  di: Wrench,
  test: CheckCircle,
  phone: Phone,
  refresh: RefreshCw,
  shield: Shield,
  zap: Zap
};

export default function ProjectDetails() {
  const { id } = useParams();
  const { data } = useAdmin();
  const project = data?.projectDetailsData?.[id] || data?.projectDetailsData?.['digivahan'];

  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-details-page">
      <Link to="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: 15, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      {/* Header */}
      <div className="pd-header">
        <div className="pd-header-left">
          <div className="pd-icon-wrapper">
            <Folder size={28} />
          </div>
          <div>
            <h1 className="pd-title">Projects</h1>
            <p className="pd-subtitle">Things I've built with passion and purpose</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pd-hero">
        <div className="pd-hero-info">
          <div className="pd-badge-current">
            <Star size={12} /> {project.badge}
          </div>

          <div className="pd-title-row">
            <h2 className="pd-project-name">{project.name}</h2>
            {project.verified && <CheckCircle2 size={20} className="text-blue-500" style={{ color: '#3b82f6' }} />}
          </div>

          <p className="pd-desc">{project.description}</p>

          <div className="pd-tags">
            {project.tags.map(tag => (
              <span className="pd-tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="pd-stats">
            {project.stats.map(stat => {
              const StatIcon = iconMap[stat.icon] || Star;
              return (
                <div className="pd-stat-item" key={stat.label}>
                  <div className="pd-stat-label">
                    {stat.customIconUrl ? (
                      <img src={stat.customIconUrl} alt="" style={{ width: 12, height: 12, objectFit: 'contain' }} />
                    ) : (
                      <StatIcon size={12} />
                    )} 
                    {stat.label}
                  </div>
                  <div className="pd-stat-value">
                    {stat.isStar && <Star size={14} fill="#f59e0b" color="#f59e0b" style={{ marginRight: 4 }} />}
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pd-hero-actions">
            <a href={project.liveUrl || '#'} className="pd-btn-primary" target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> View Live App
            </a>
            <a href={project.storeUrl || '#'} className="pd-btn-secondary" target="_blank" rel="noreferrer">
              <Smartphone size={16} /> View on Play Store
            </a>
          </div>
        </div>

        <div className="pd-hero-image-wrapper">
          <img src={project.mainImage} alt={project.name} className="pd-hero-image" />
        </div>
      </div>

      {/* Overview Section */}
      <div className="pd-overview-section">
        <div className="pd-overview-left">
          <div className="pd-section-header">
            <div className="pd-section-icon"><BarChart size={16} /></div>
            <h3 className="pd-section-title">Project Overview</h3>
          </div>
          <p className="pd-overview-text">{project.overviewText}</p>
          <div className="pd-overview-points">
            {project.overviewPoints.map((point, i) => (
              <div className="pd-point" key={i}>
                <CheckCircle2 size={16} className="text-primary" style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pd-overview-right">
          <div className="pd-meta-table">
            {project.metaTable.map(meta => {
              const MetaIcon = iconMap[meta.icon] || CheckCircle;
              const isUrl = meta.icon && (meta.icon.startsWith('http') || meta.icon.startsWith('data:'));
              return (
                <div className="pd-meta-row" key={meta.label}>
                  <div className="pd-meta-label">
                    {isUrl ? <img src={meta.icon} alt="" style={{width: 14, height: 14, objectFit: 'contain'}} /> : <MetaIcon size={14} />} {meta.label}
                  </div>
                  <div className="pd-meta-value">{meta.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="pd-section-header">
        <div className="pd-section-icon"><Star size={16} /></div>
        <h3 className="pd-section-title">Key Highlights</h3>
      </div>
      <div className="pd-highlights-grid">
        {project.highlights.map((hl, i) => {
          const HlIcon = iconMap[hl.icon] || CheckCircle2;
          const isUrl = hl.icon && (hl.icon.startsWith('http') || hl.icon.startsWith('data:'));
          return (
            <div className="pd-highlight-card" key={i}>
              <div className="pd-hl-icon-wrapper">
                {isUrl ? <img src={hl.icon} alt="" style={{width: 20, height: 20, objectFit: 'contain'}} /> : <HlIcon size={20} />}
              </div>
              <div>
                <h4 className="pd-hl-title">{hl.title}</h4>
                <p className="pd-hl-desc">{hl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Screenshots Section */}
      <div className="pd-section-header">
        <div className="pd-section-icon"><Smartphone size={16} /></div>
        <h3 className="pd-section-title">Screenshots</h3>
      </div>
      <div className="pd-screenshots-scroll">
        {project.screenshots.map((src, i) => (
          <img src={src} alt="Screenshot" className="pd-screenshot-img" key={i} />
        ))}
      </div>

      {/* Tech Stack */}
      <div className="pd-section-header">
        <div className="pd-section-icon"><Code2 size={16} /></div>
        <h3 className="pd-section-title">Tech Stack Used</h3>
      </div>
      <div className="pd-tech-row">
        {project.techStack.map(tech => (
          <div className="pd-tech-pill" key={tech.name}>
            <img src={tech.icon} alt={tech.name} className="pd-tech-pill-icon" />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

