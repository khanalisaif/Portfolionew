import React, { useState, useRef, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { Code2, Save, Plus, Trash2, CheckCircle, ChevronDown, ChevronUp, Layers, PenTool, LayoutDashboard, BarChart3, AlertCircle, Loader2 } from 'lucide-react';
import '../../admin.css';

/* ── Hex color swatches for Levels (used directly in DonutChart SVG) ── */
const HEX_COLORS = [
  '#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316',
  '#f59e0b','#eab308','#22c55e','#10b981','#14b8a6',
  '#06b6d4','#0ea5e9','#3b82f6','#64748b','#a855f7',
  '#e11d48','#0891b2',
];

function LevelColorPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  return (
    <div style={{ position: 'relative', flexShrink: 0 }} ref={ref}>
      <div
        onClick={() => setOpen(o => !o)}
        title="Pick color"
        style={{
          width: 34, height: 34, borderRadius: 8,
          background: value || '#6366f1',
          border: '2px solid #e2e8f0',
          cursor: 'pointer',
          boxShadow: open ? '0 0 0 3px rgba(99,102,241,0.25)' : 'none',
          transition: 'box-shadow 0.15s',
        }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: 40, left: 0,
          background: 'white', border: '1px solid #e2e8f0',
          borderRadius: 12, padding: 8, zIndex: 100,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.12)',
          display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 5,
          width: 160,
        }}>
          {HEX_COLORS.map(hex => (
            <div
              key={hex}
              onClick={() => { onChange(hex); setOpen(false); }}
              style={{
                width: 20, height: 20, borderRadius: 5,
                background: hex, cursor: 'pointer',
                border: value === hex ? '2px solid #1e293b' : '2px solid transparent',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const SkillsEdit = () => {
  const { data, updateData } = useBackend();

  // Section Metadata
  const [sectionData, setSectionData] = useState({ sectionTitle: '', sectionSubtitle: '', viewAllUrl: '' });
  const [skillsOverview, setSkillsOverview] = useState({ total: '', label: '', levels: [] });
  const [stats, setStats] = useState([]);

  // Main Lists
  const [techSkills, setTechSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [learning, setLearning] = useState([]);

  // UI State
  const [activeTab, setActiveTab] = useState('technical');
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (data.skillsData) {
      const s = data.skillsData;
      setSectionData({
        sectionTitle: s.sectionTitle || '',
        sectionSubtitle: s.sectionSubtitle || '',
        viewAllUrl: s.viewAllUrl || ''
      });
      setSkillsOverview(s.skillsOverview || { total: '', label: '', levels: [] });
      setStats(s.stats || []);
      setTechSkills(s.technicalSkills || []);
      setTools(s.popularTools || []);
      setLearning(s.learningNow || []);
    }
  }, [data.skillsData]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));

  const updateOverview = (f, v) => setSkillsOverview(p => ({ ...p, [f]: v }));
  const addLevel = () => setSkillsOverview(p => ({ ...p, levels: [...(p.levels || []), { name: '', count: 0, color: '#6366f1' }] }));
  const updateLevel = (i, f, v) => {
    const nl = [...(skillsOverview.levels || [])];
    nl[i] = { ...nl[i], [f]: v };
    setSkillsOverview(p => ({ ...p, levels: nl }));
  };
  const removeLevel = (i) => setSkillsOverview(p => ({ ...p, levels: (p.levels || []).filter((_, idx) => idx !== i) }));

  const addStat = () => setStats([...stats, { value: '', label: '' }]);
  const updateStat = (i, f, v) => {
    const ns = [...stats];
    ns[i] = { ...ns[i], [f]: v };
    setStats(ns);
  };
  const removeStat = (i) => setStats(stats.filter((_, idx) => idx !== i));

  const addTechSkill = () => {
    const ns = {
      id: `skill-${Date.now()}`, name: 'New Skill', iconUrl: '', description: '',
      level: '', levelColor: 'text-blue-600 bg-blue-50', platform: '', usedFor: '', projects: ''
    };
    setTechSkills([ns, ...techSkills]);
    setExpandedId(ns.id);
  };
  const updateTechSkill = (id, f, v) => setTechSkills(techSkills.map(s => s.id === id ? { ...s, [f]: v } : s));
  const removeTechSkill = (id) => setTechSkills(techSkills.filter(s => s.id !== id));

  const updateList = (listName, setter, index, field, value) => {
    const list = [...listName];
    list[index] = { ...list[index], [field]: value };
    setter(list);
  };

  const addListItem = (setter, currentList) => setter([{ name: '', iconUrl: '' }, ...currentList]);
  const removeListItem = (setter, currentList, index) => setter(currentList.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const result = await updateData('skillsData', {
      ...data.skillsData,
      ...sectionData,
      skillsOverview,
      stats,
      technicalSkills: techSkills,
      popularTools: tools,
      learningNow: learning
    });
    setSaving(false);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setSaveError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Header & Section Data */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><Code2 size={19} /></div>
          <div>
            <h2 className="a-card-title">Skills Section</h2>
            <p className="a-card-subtitle">Manage your technical skills, tools, and learning paths</p>
          </div>
        </div>
      </div>

      <div className="a-tabs">
        <button type="button" className={`a-tab red ${activeTab === 'technical' ? 'active' : ''}`} onClick={() => setActiveTab('technical')}>
          <Code2 size={16} /> Technical Skills
        </button>
        <button type="button" className={`a-tab red ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <LayoutDashboard size={16} /> Overview & Stats
        </button>
        <button type="button" className={`a-tab red ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>
          <PenTool size={16} /> Popular Tools
        </button>
        <button type="button" className={`a-tab red ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
          <Layers size={16} /> Learning Now
        </button>
      </div>

      {activeTab === 'technical' && (
        <div className="a-fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Technical Skills ({techSkills.length})
            </h3>
            <button type="button" onClick={addTechSkill} className="a-btn a-btn-sm a-btn-ghost-red" style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fef2f2' }}>
              <Plus size={13} /> Add Skill
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {techSkills.map(skill => {
              const isOpen = expandedId === skill.id;
              return (
                <div key={skill.id} className={`a-accordion red${isOpen ? ' open' : ''}`}>
                  <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : skill.id)}>
                    <div className="a-accordion-avatar" style={{ borderRadius: 8, background: '#f8fafc', padding: 4 }}>
                      {skill.iconUrl ? <img src={skill.iconUrl} alt="" style={{ objectFit: 'contain' }} /> : <Code2 size={18} color="#94a3b8" />}
                    </div>
                    <div className="a-accordion-info">
                      <h4>{skill.name || 'Untitled Skill'}</h4>
                      <p>{skill.level || 'No level'} &bull; {skill.platform || 'No platform'}</p>
                    </div>
                    <div className="a-accordion-actions">
                      <span onClick={(e) => { e.stopPropagation(); removeTechSkill(skill.id); }} className="a-btn-icon danger" style={{ width: 28, height: 28 }}><Trash2 size={14} /></span>
                      <div className={`a-chevron red${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="a-accordion-body">
                      <div className="a-grid-2" style={{ marginBottom: 12 }}>
                        <div className="a-field">
                          <label className="a-label">Skill Name</label>
                          <input type="text" value={skill.name} onChange={e => updateTechSkill(skill.id, 'name', e.target.value)} className="a-input red" placeholder="Kotlin" />
                        </div>
                        <ImageUpload label="Skill Icon" value={skill.iconUrl} onChange={v => updateTechSkill(skill.id, 'iconUrl', v)} size="sm" />
                      </div>

                      <div className="a-field">
                        <label className="a-label">Description</label>
                        <input type="text" value={skill.description || ''} onChange={e => updateTechSkill(skill.id, 'description', e.target.value)} className="a-input red" placeholder="Modern programming language..." />
                      </div>

                      <div className="a-grid-2">
                        <div className="a-field">
                          <label className="a-label">Level Name</label>
                          <input type="text" value={skill.level} onChange={e => updateTechSkill(skill.id, 'level', e.target.value)} className="a-input red" placeholder="Expert" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Platform</label>
                          <input type="text" value={skill.platform || ''} onChange={e => updateTechSkill(skill.id, 'platform', e.target.value)} className="a-input red" placeholder="Android" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Used For</label>
                          <input type="text" value={skill.usedFor || ''} onChange={e => updateTechSkill(skill.id, 'usedFor', e.target.value)} className="a-input red" placeholder="Android Apps" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Projects Count</label>
                          <input type="text" value={skill.projects || ''} onChange={e => updateTechSkill(skill.id, 'projects', e.target.value)} className="a-input red" placeholder="12+" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="a-fade-up">
          {/* Skills Overview */}
          <div className="a-card" style={{ marginBottom: 20 }}>
            <div className="a-card-header" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LayoutDashboard size={18} color="#ef4444" />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Skills Overview Badge</h3>
              </div>
            </div>
            <div className="a-card-body">
              <div className="a-grid-2" style={{ marginBottom: 16 }}>
                <div className="a-field">
                  <label className="a-label">Total Amount</label>
                  <input type="text" value={skillsOverview.total} onChange={e => updateOverview('total', e.target.value)} className="a-input red" placeholder="18+" />
                </div>
                <div className="a-field">
                  <label className="a-label">Total Label</label>
                  <input type="text" value={skillsOverview.label} onChange={e => updateOverview('label', e.target.value)} className="a-input red" placeholder="Technologies" />
                </div>
              </div>
              <div className="a-section-divider">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Levels Configuration</h3>
                <button type="button" onClick={addLevel} className="a-btn a-btn-xs a-btn-ghost-red" style={{ color: '#ef4444', borderColor: '#fecaca' }}><Plus size={11} /> Add Level</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {(skillsOverview.levels || []).map((lvl, i) => (
                  <div key={i} className="a-row" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 90px auto', gap: 10, alignItems: 'center' }}>
                    <LevelColorPicker value={lvl.color} onChange={v => updateLevel(i, 'color', v)} />
                    <input type="text" value={lvl.name} onChange={e => updateLevel(i, 'name', e.target.value)} className="a-input red" placeholder="Expert" />
                    <input type="number" value={lvl.count} onChange={e => updateLevel(i, 'count', parseInt(e.target.value) || 0)} className="a-input red" placeholder="6" />
                    <button type="button" onClick={() => removeLevel(i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="a-card">
            <div className="a-card-header" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BarChart3 size={18} color="#ef4444" />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Global Stats</h3>
                </div>
                <button type="button" onClick={addStat} className="a-btn a-btn-xs a-btn-ghost-red" style={{ color: '#ef4444', borderColor: '#fecaca' }}><Plus size={11} /> Add Stat</button>
              </div>
            </div>
            <div className="a-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stats.map((st, i) => (
                  <div key={i} className="a-row" style={{ display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 10 }}>
                    <input type="text" value={st.value} onChange={e => updateStat(i, 'value', e.target.value)} className="a-input red" placeholder="20+" />
                    <input type="text" value={st.label} onChange={e => updateStat(i, 'label', e.target.value)} className="a-input red" placeholder="Technologies Worked With" />
                    <button type="button" onClick={() => removeStat(i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="a-fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Popular Tools ({tools.length})
            </h3>
            <button type="button" onClick={() => addListItem(setTools, tools)} className="a-btn a-btn-sm a-btn-ghost-red" style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fef2f2' }}>
              <Plus size={13} /> Add Tool
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {tools.map((item, i) => (
              <div key={i} className="a-row" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {item.iconUrl ? <img src={item.iconUrl} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} /> : <PenTool size={20} color="#94a3b8" />}
                    <input type="text" value={item.name} onChange={e => updateList(tools, setTools, i, 'name', e.target.value)} className="a-input red" placeholder="Tool Name" style={{ width: 160 }} />
                  </div>
                  <button type="button" onClick={() => removeListItem(setTools, tools, i)} className="a-btn-icon danger" style={{ width: 28, height: 28 }}><Trash2 size={14} /></button>
                </div>
                <ImageUpload label="Tool Icon" value={item.iconUrl} onChange={v => updateList(tools, setTools, i, 'iconUrl', v)} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'learning' && (
        <div className="a-fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Learning Now ({learning.length})
            </h3>
            <button type="button" onClick={() => addListItem(setLearning, learning)} className="a-btn a-btn-sm a-btn-ghost-red" style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fef2f2' }}>
              <Plus size={13} /> Add Learning
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {learning.map((item, i) => (
              <div key={i} className="a-row" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {item.iconUrl ? <img src={item.iconUrl} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} /> : <Layers size={20} color="#94a3b8" />}
                    <input type="text" value={item.name} onChange={e => updateList(learning, setLearning, i, 'name', e.target.value)} className="a-input red" placeholder="Skill Name" style={{ width: 160 }} />
                  </div>
                  <button type="button" onClick={() => removeListItem(setLearning, learning, i)} className="a-btn-icon danger" style={{ width: 28, height: 28 }}><Trash2 size={14} /></button>
                </div>
                <ImageUpload label="Learning Icon" value={item.iconUrl} onChange={v => updateList(learning, setLearning, i, 'iconUrl', v)} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-red'}`} disabled={saving}>
          {saving
            ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</>
            : saved
            ? <><CheckCircle size={17} /> Saved!</>
            : <><Save size={17} /> Save Skills</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
        {saveError && (
          <span style={{ color: '#ef4444', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={14} />{saveError}
          </span>
        )}
      </div>
    </form>
  );
};

export default SkillsEdit;

