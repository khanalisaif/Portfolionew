import { useState } from 'react';
import { Code2, ChevronRight, ChevronDown, Lightbulb, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { skillsData } from '../data';
import { useFadeUp } from '../hooks/useFadeUp';

// Simple donut chart using SVG
function DonutChart({ levels }) {
  const total = levels.reduce((s, l) => s + l.count, 0);
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const r = 44;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = levels.map(level => {
    const pct = level.count / total;
    const dash = pct * circumference;
    const seg = { ...level, dash, offset };
    offset += dash;
    return seg;
  });

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={10}
          strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
          strokeDashoffset={-seg.offset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

const skillIconColors = [
  'from-violet-500 to-purple-600',
  'from-orange-400 to-red-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-600',
  'from-yellow-400 to-orange-500',
  'from-red-500 to-pink-600',
  'from-indigo-500 to-blue-600',
  'from-gray-600 to-gray-800',
];

export default function SkillsSection() {
  const ref = useFadeUp();
  const [showAll, setShowAll] = useState(false);
  const { sectionTitle, sectionSubtitle, viewAllUrl, technicalSkills,
    skillsOverview, popularTools, learningNow, stats } = skillsData;

  const displayedSkills = showAll ? technicalSkills : technicalSkills.slice(0, 6);

  return (
    <section id="skills" className="section-container" style={{ paddingTop: 0 }}>
      <div ref={ref} className="fade-up">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-icon">
              <Code2 size={22} />
            </div>
            <div>
              <div className="section-title">{sectionTitle}</div>
              <div className="section-subtitle">{sectionSubtitle}</div>
            </div>
          </div>
          <Link to="/all-skills" className="section-view-all" id="skills-view-all">
            View All Skills <ChevronRight size={14} />
          </Link>
        </div>

        {/* Main Layout */}
        <div className="skills-layout">
          {/* Left: Technical Skills */}
          <div className="skills-main">
            <div className="skills-section-title">Technical Skills</div>
            <div className="skills-section-sub">Technologies &amp; programming languages I work with</div>

            <div className="skills-grid">
              {displayedSkills.map((skill, i) => (
                <div className="skill-card" key={skill.id} id={`skill-${skill.id}`}>
                  <div className="skill-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {skill.iconUrl ? (
                        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                          <img src={skill.iconUrl} alt={skill.name} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <div className={`orbit-card-icon bg-gradient-to-br ${skillIconColors[i % skillIconColors.length]}`} style={{ width: 32, height: 32, borderRadius: 8 }}>
                          <Code2 size={14} />
                        </div>
                      )}
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className={`skill-level-badge ${skill.levelColor}`}>{skill.level}</span>
                  </div>
                  <p className="skill-desc">{skill.description}</p>
                  <div className="skill-meta">
                    <div>
                      <div className="skill-meta-item-label">Platform</div>
                      <div className="skill-meta-item-value">{skill.platform}</div>
                    </div>
                    <div>
                      <div className="skill-meta-item-label">Used For</div>
                      <div className="skill-meta-item-value">{skill.usedFor}</div>
                    </div>
                    <div>
                      <div className="skill-meta-item-label">Projects</div>
                      <div className="skill-meta-item-value">{skill.projects}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {technicalSkills.length > 6 && (
              <button
                className="explore-more-btn"
                onClick={() => setShowAll(!showAll)}
                id="explore-more-skills-btn"
              >
                {showAll ? 'Show Less' : 'Explore More Skills'} <ChevronDown size={14} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="skills-sidebar">
            {/* Skills Overview */}
            <div className="sidebar-card" id="skills-overview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div className="section-icon" style={{ width: 32, height: 32, borderRadius: 8 }}>
                  <Wrench size={14} />
                </div>
                <div>
                  <div className="sidebar-card-title">Skills Overview</div>
                  <div className="sidebar-card-sub" style={{ marginBottom: 0 }}>Summary of my technical skills</div>
                </div>
              </div>
              <div style={{ height: 12 }} />
              <div className="donut-wrapper">
                <div style={{ position: 'relative' }}>
                  <DonutChart levels={skillsOverview.levels} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div className="donut-total" style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{skillsOverview.total}</div>
                    <div className="donut-label" style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>{skillsOverview.label}</div>
                  </div>
                </div>
                <div className="donut-legend">
                  {skillsOverview.levels.map((level, i) => (
                    <div className="donut-legend-item" key={i}>
                      <div className="donut-dot" style={{ background: level.color }} />
                      <span>{level.name}</span>
                      <span className="donut-count">{level.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Tools */}
            <div className="sidebar-card" id="popular-tools-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div className="section-icon" style={{ width: 32, height: 32, borderRadius: 8 }}>
                  <Wrench size={14} />
                </div>
                <div>
                  <div className="sidebar-card-title">Popular Tools</div>
                  <div className="sidebar-card-sub" style={{ marginBottom: 0 }}>Tools &amp; technologies I frequently use</div>
                </div>
              </div>
              <div style={{ height: 12 }} />
              <div className="tools-grid">
                {popularTools.map((tool, i) => (
                  <div className="tool-item" key={i} id={`tool-${i}`}>
                    <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={tool.iconUrl} alt={tool.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                    </div>
                    <div className="tool-name" style={{ fontSize: 10, fontWeight: 600, color: '#475569', textAlign: 'center' }}>{tool.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning & Exploring */}
            <div className="sidebar-card" id="learning-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div className="section-icon" style={{ width: 32, height: 32, borderRadius: 8 }}>
                  <Lightbulb size={14} />
                </div>
                <div>
                  <div className="sidebar-card-title">Learning &amp; Exploring</div>
                  <div className="sidebar-card-sub" style={{ marginBottom: 0 }}>Technologies I'm currently learning</div>
                </div>
              </div>
              <div style={{ height: 12 }} />
              <div className="learning-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {learningNow.map((item, i) => (
                  <span className="learning-chip" key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 20, fontSize: 11, fontWeight: 600, color: '#475569' }}>
                    <img src={item.iconUrl} alt={item.name} style={{ width: 14, height: 14, objectFit: 'contain' }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="skills-cta" style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 24 }} id="skills-cta">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            <div className="section-icon" style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0 }}>
              <Lightbulb size={22} />
            </div>
            <div className="skills-cta-text">
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Continuous Learner</h4>
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>I love exploring new technologies and improving my skills. I believe in continuous learning to stay up-to-date and build better solutions.</p>
            </div>
          </div>

          <div className="skills-stats" style={{ display: 'flex', gap: 32, flexShrink: 0, paddingLeft: 24, marginLeft: 'auto' }}>
            {stats.map((stat, i) => (
              <div className="skills-stat" key={i} style={{ textAlign: 'center' }}>
                <div className="skills-stat-value" style={{ fontSize: 20, fontWeight: 800, color: '#4f46e5' }}>{stat.value}</div>
                <div className="skills-stat-label" style={{ fontSize: 10, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
