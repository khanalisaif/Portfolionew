import React, { useState, useEffect } from 'react';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { Briefcase, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle, Tag, Link2, BarChart3, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import '../../admin.css';

const ProjectsEdit = () => {
  const { data, updateData } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [details, setDetails] = useState({});
  const [sectionData, setSectionData] = useState({
    sectionTitle: '', sectionSubtitle: '', viewAllUrl: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from context
    let apd = data.allProjectsData || data.projectsData?.featured || [];
    
    // Initialize featuredType based on badge if not set
    if (apd.length > 0) {
      apd = apd.map((p, i) => {
        if (p.featuredType) return p;
        if (p.badge === 'Current Project') return { ...p, featuredType: 'current' };
        if (p.badge === 'Top Rated') return { ...p, featuredType: 'top' };
        // Fallback for initial load if no badges match
        if (!data.allProjectsData && i < 2) return { ...p, featuredType: i === 0 ? 'current' : 'top' };
        return { ...p, featuredType: 'none' };
      });
    }
    
    setProjects(apd);
    
    setDetails(data.projectDetailsData || {});

    if (data.projectsData) {
      setSectionData({
        sectionTitle: data.projectsData.sectionTitle || 'Featured Projects',
        sectionSubtitle: data.projectsData.sectionSubtitle || "Things I've built with passion and purpose",
        viewAllUrl: data.projectsData.viewAllUrl || '/all-projects',
      });
    }
  }, [data]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));

  const updateProjectBasic = (id, field, value) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    // Sync some fields to details
    if (field === 'name' || field === 'description' || field === 'image' || field === 'tags' || field === 'stats' || field === 'liveUrl' || field === 'storeUrl') {
       const mappedField = field === 'image' ? 'mainImage' : field;
       setDetails(prev => ({
         ...prev,
         [id]: { ...(prev[id] || {}), [mappedField]: value }
       }));
    }
  };

  const updateProjectDetail = (id, field, value) => {
    setDetails(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value }
    }));
  };

  const addProject = () => {
    const id = `proj-${Date.now()}`;
    const np = {
      id, name: 'New Project', description: '', image: '',
      badge: 'New', tags: [], verified: false, githubUrl: '', liveUrl: '', storeUrl: '', stats: [], category: 'other', featuredType: 'none'
    };
    const nd = {
      id, name: 'New Project', description: '', mainImage: '',
      tags: [], stats: [], screenshots: [], overviewPoints: [], metaTable: [], highlights: [], techStack: []
    };
    setProjects([np, ...projects]);
    setDetails(prev => ({ ...prev, [id]: nd }));
    setExpandedId(id);
  };

  const removeProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setDetails(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const updateTags = (id, text) => updateProjectBasic(id, 'tags', text.split(',').map(t => t.trim()).filter(Boolean));

  // Stats
  const addStat = (id) => updateProjectBasic(id, 'stats', [...(projects.find(p => p.id === id)?.stats || []), { icon: 'star', label: '', value: '' }]);
  const updateStat = (pid, sid, f, v) => {
    const p = projects.find(x => x.id === pid);
    const ns = [...(p.stats || [])];
    ns[sid] = { ...ns[sid], [f]: v };
    updateProjectBasic(pid, 'stats', ns);
  };
  const removeStat = (pid, sid) => updateProjectBasic(pid, 'stats', (projects.find(p => p.id === pid)?.stats || []).filter((_, i) => i !== sid));

  // Screenshots
  const addScreenshot = (pid) => {
    const current = details[pid]?.screenshots || [];
    updateProjectDetail(pid, 'screenshots', [...current, '']);
  };
  const updateScreenshot = (pid, sid, val) => {
    const current = [...(details[pid]?.screenshots || [])];
    current[sid] = val;
    updateProjectDetail(pid, 'screenshots', current);
  };
  const removeScreenshot = (pid, sid) => {
    const current = (details[pid]?.screenshots || []).filter((_, i) => i !== sid);
    updateProjectDetail(pid, 'screenshots', current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('allProjectsData', projects);
    updateData('projectDetailsData', details);
    
    const featuredProjects = projects.filter(p => p.featuredType === 'current' || p.featuredType === 'top');
    updateData('projectsData', { ...data.projectsData, ...sectionData, featured: featuredProjects }); // keep only selected as featured
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Header & Section Data */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fff 100%)' }}>
          <div className="a-icon-badge green"><Briefcase size={19} /></div>
          <div>
            <h2 className="a-card-title">Projects Hub</h2>
            <p className="a-card-subtitle">Manage all projects, their details, and screenshots</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          All Projects ({projects.length})
        </h3>
        <button type="button" onClick={addProject} className="a-btn a-btn-sm a-btn-ghost-green" style={{ color: '#059669', borderColor: '#a7f3d0', background: '#ecfdf5' }}>
          <Plus size={13} /> Add Project
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {projects.map(project => {
          const isOpen = expandedId === project.id;
          const detail = details[project.id] || {};
          return (
            <div key={project.id} className={`a-accordion green${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : project.id)}>
                <div className="a-accordion-avatar" style={{ width: 64, borderRadius: 10 }}>
                  {project.image
                    ? <img src={project.image} alt="" />
                    : <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>No img</span>
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{project.name || 'Untitled Project'}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    {project.badge && <span className="a-badge green">{project.badge}</span>}
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{project.tags?.slice(0,3).join(' · ')}</span>
                  </div>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeProject(project.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron green${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  <ImageUpload label="Project Cover Image" value={project.image} onChange={v => updateProjectBasic(project.id, 'image', v)} size="lg" />

                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">Project Name</label>
                      <input type="text" value={project.name} onChange={e => updateProjectBasic(project.id, 'name', e.target.value)} className="a-input" placeholder="E-commerce App" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Homepage Display Status</label>
                      <p className="a-hint">Select to feature this project on the main homepage</p>
                      <select 
                        value={project.featuredType || 'none'} 
                        onChange={e => {
                          updateProjectBasic(project.id, 'featuredType', e.target.value);
                          if (e.target.value === 'current') updateProjectBasic(project.id, 'badge', 'Current Project');
                          else if (e.target.value === 'top') updateProjectBasic(project.id, 'badge', 'Top Rated');
                        }} 
                        className="a-select"
                      >
                        <option value="none">Don't show on Homepage</option>
                        <option value="current">Show as "Current Project"</option>
                        <option value="top">Show as "Top Rated"</option>
                      </select>
                    </div>
                  </div>

                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">Badge Text</label>
                      <p className="a-hint">e.g. Featured, Latest, B2B</p>
                      <input type="text" value={project.badge || ''} onChange={e => updateProjectBasic(project.id, 'badge', e.target.value)} className="a-input" placeholder="Featured" />
                    </div>
                  </div>

                  <div className="a-field">
                    <label className="a-label">Brief Description (Summary)</label>
                    <textarea value={project.description} onChange={e => updateProjectBasic(project.id, 'description', e.target.value)} rows="2" className="a-textarea" placeholder="A brief description of what the project is..." />
                  </div>
                  
                  <div className="a-field">
                    <label className="a-label">Detailed Overview (for Details Page)</label>
                    <textarea value={detail.overviewText || ''} onChange={e => updateProjectDetail(project.id, 'overviewText', e.target.value)} rows="3" className="a-textarea" placeholder="Full detailed explanation..." />
                  </div>

                  <div className="a-field">
                    <div className="a-section-divider"><h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Tag size={13} /> Technology Tags</h3></div>
                    <p className="a-hint" style={{ marginTop: '-8px', marginBottom: 4 }}>Comma separated: Android, Kotlin, Firebase</p>
                    <div className="admin-input-group">
                      <span className="admin-input-icon"><Tag size={14} /></span>
                      <input
                        type="text"
                        value={(project.tags || []).join(', ')}
                        onChange={e => updateTags(project.id, e.target.value)}
                        className="a-input"
                        placeholder="React, Tailwind, Node"
                        style={{ paddingLeft: 38 }}
                      />
                    </div>
                  </div>

                  {/* Links */}
                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">Live/Demo URL</label>
                      <div className="admin-input-group">
                        <span className="admin-input-icon"><Link2 size={14} /></span>
                        <input type="text" value={project.liveUrl || ''} onChange={e => updateProjectBasic(project.id, 'liveUrl', e.target.value)} className="a-input" placeholder="https://..." style={{ paddingLeft: 38 }} />
                      </div>
                    </div>
                    <div className="a-field">
                      <label className="a-label">GitHub URL</label>
                      <div className="admin-input-group">
                        <span className="admin-input-icon"><Link2 size={14} /></span>
                        <input type="text" value={project.githubUrl || ''} onChange={e => updateProjectBasic(project.id, 'githubUrl', e.target.value)} className="a-input" placeholder="https://github.com/..." style={{ paddingLeft: 38 }} />
                      </div>
                    </div>
                  </div>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, cursor: 'pointer', width: 'fit-content' }}>
                    <input
                      type="checkbox"
                      checked={project.verified || false}
                      onChange={e => updateProjectBasic(project.id, 'verified', e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: '#10b981' }}
                    />
                    <ShieldCheck size={16} color="#10b981" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Show verified badge</span>
                  </label>

                  {/* Stats */}
                  <div style={{ marginTop: 8 }}>
                    <div className="a-section-divider">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Stats</h3>
                      <button type="button" onClick={() => addStat(project.id)} className="a-btn a-btn-xs a-btn-ghost-green" style={{ color: '#059669', borderColor: '#a7f3d0' }}><Plus size={11} /> Add Stat</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(project.stats || []).map((stat, i) => (
                        <div key={i} className="a-row" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr auto', gap: 10, width: '100%' }}>
                            <select value={stat.icon} onChange={e => updateStat(project.id, i, 'icon', e.target.value)} className="a-select">
                              <option value="users">👥 Users</option>
                              <option value="download">⬇️ Downloads</option>
                              <option value="star">⭐ Rating</option>
                              <option value="activity">📈 Activity</option>
                              <option value="calendar">📅 Year</option>
                            </select>
                            <input type="text" value={stat.label} onChange={e => updateStat(project.id, i, 'label', e.target.value)} className="a-input" placeholder="Label" />
                            <input type="text" value={stat.value} onChange={e => updateStat(project.id, i, 'value', e.target.value)} className="a-input" placeholder="50K+" />
                            <button type="button" onClick={() => removeStat(project.id, i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                          </div>
                          <ImageUpload label="Custom Icon URL (Override)" value={stat.customIconUrl} onChange={v => updateStat(project.id, i, 'customIconUrl', v)} size="sm" />
                        </div>
                      ))}
                      {(project.stats || []).length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>No stats yet.</p>}
                    </div>
                  </div>

                  {/* Screenshots Gallery */}
                  <div style={{ marginTop: 16 }}>
                    <div className="a-section-divider">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ImageIcon size={13} /> Screenshots Gallery</h3>
                      <button type="button" onClick={() => addScreenshot(project.id)} className="a-btn a-btn-xs a-btn-ghost-green" style={{ color: '#059669', borderColor: '#a7f3d0' }}><Plus size={11} /> Add Screenshot</button>
                    </div>
                    <p className="a-hint" style={{ marginTop: '-8px', marginBottom: 12 }}>Add multiple screenshots to be displayed in the project details page.</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {(detail.screenshots || []).map((src, i) => (
                        <div key={i} style={{ width: '100%', maxWidth: 300, background: '#f8fafc', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0', position: 'relative' }}>
                          <ImageUpload label={`Screenshot ${i+1}`} value={src} onChange={v => updateScreenshot(project.id, i, v)} size="md" />
                          <button 
                            type="button" 
                            onClick={() => removeScreenshot(project.id, i)} 
                            className="a-btn-icon danger" 
                            style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: '1px solid #fecaca' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      {(detail.screenshots || []).length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0', width: '100%' }}>No screenshots added yet.</p>}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap"><Briefcase size={24} color="#94a3b8" /></div>
            <h4>No projects yet</h4>
            <p>Click "Add Project" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-green'}`} style={{ background: saved ? '' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Projects</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default ProjectsEdit;
