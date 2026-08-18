import React, { useState, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { GraduationCap, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle, BarChart3, Sparkles, Pin, AlertCircle, Loader2 } from 'lucide-react';
import '../../admin.css';

const AllEducationEdit = () => {
  const { data, updateData } = useBackend();
  const [entries, setEntries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    // Load allEducationData. Also determine which ones are pinned by checking if their ID exists in educationData.entries.
    const pinnedIds = data.educationData?.entries?.map(e => e.id) || [];
    let loadedEntries = [];
    
    if (data.allEducationData && data.allEducationData.length > 0) {
      loadedEntries = data.allEducationData;
    } else if (data.educationData?.entries && data.educationData.entries.length > 0) {
      loadedEntries = data.educationData.entries;
    }

    // Set isPinned flag on loaded entries
    loadedEntries = loadedEntries.map(entry => ({
      ...entry,
      isPinned: pinnedIds.includes(entry.id)
    }));
    
    setEntries(loadedEntries);
  }, [data]);

  const updateEntry = (id, field, value) => setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  
  const addEntry = () => {
    const ne = {
      id: `edu-${Date.now()}`, universityName: 'New Education', location: '', universityImage: '',
      degree: '', type: '', period: '', universityLogo: '', stats: [], keyAchievements: [], certificates: [], isPinned: false
    };
    setEntries([ne, ...entries]);
    setExpandedId(ne.id);
  };
  
  const removeEntry = (id) => setEntries(entries.filter(e => e.id !== id));

  // Stats
  const addStat = (id) => updateEntry(id, 'stats', [...(entries.find(e => e.id === id)?.stats || []), { label: '', value: '', sub: '' }]);
  const updateStat = (eid, sid, f, v) => {
    const e = entries.find(x => x.id === eid);
    const ns = [...(e.stats || [])];
    ns[sid] = { ...ns[sid], [f]: v };
    updateEntry(eid, 'stats', ns);
  };
  const removeStat = (eid, sid) => updateEntry(eid, 'stats', (entries.find(e => e.id === eid)?.stats || []).filter((_, i) => i !== sid));

  // Achievements
  const addAchievement = (eid) => {
    const e = entries.find(x => x.id === eid);
    updateEntry(eid, 'keyAchievements', [...(e.keyAchievements || []), '']);
  };
  const updateAchievement = (eid, idx, val) => {
    const e = entries.find(x => x.id === eid);
    const arr = [...(e.keyAchievements || [])];
    arr[idx] = val;
    updateEntry(eid, 'keyAchievements', arr);
  };
  const removeAchievement = (eid, idx) => {
    const e = entries.find(x => x.id === eid);
    updateEntry(eid, 'keyAchievements', (e.keyAchievements || []).filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    // Save full education list array → PUT /api/education/all
    const r1 = await updateData('allEducationData', entries);
    // Save pinned entries to the hero section → PUT /api/education
    const pinnedEntries = entries.filter(e => e.isPinned);
    const r2 = await updateData('educationData', { ...data.educationData, entries: pinnedEntries });
    setSaving(false);
    if (r1.success && r2.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setSaveError(r1.error || r2.error || 'Save failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge blue" style={{ background: '#e0f2fe', color: '#0284c7' }}><GraduationCap size={19} /></div>
          <div>
            <h2 className="a-card-title">All Education Section</h2>
            <p className="a-card-subtitle">Manage your full academic history. Pin items to show them on the homepage.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Education Entries ({entries.length})
        </h3>
        <button type="button" onClick={addEntry} className="a-btn a-btn-sm" style={{ background: '#e0f2fe', color: '#0284c7', borderColor: '#bae6fd' }}>
          <Plus size={13} /> Add Entry
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map(entry => {
          const isOpen = expandedId === entry.id;
          return (
            <div key={entry.id} className={`a-accordion blue${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : entry.id)}>
                <div className="a-accordion-avatar">
                  {entry.universityLogo
                    ? <img src={entry.universityLogo} alt="" />
                    : <span className="a-accordion-avatar-fallback">{(entry.universityName || '?')[0]}</span>
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{entry.universityName || 'Untitled Entry'}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ margin: 0 }}>{entry.degree || 'No degree'} &bull; {entry.period || 'No period'}</p>
                    {entry.isPinned && <span className="a-badge blue" style={{ padding: '2px 6px', fontSize: 10 }}><Pin size={10} style={{ marginRight: 2 }} /> Pinned</span>}
                  </div>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron blue${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  
                  <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input 
                      type="checkbox" 
                      id={`pin-${entry.id}`}
                      checked={entry.isPinned || false} 
                      onChange={(e) => updateEntry(entry.id, 'isPinned', e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: '#0ea5e9', cursor: 'pointer' }}
                    />
                    <label htmlFor={`pin-${entry.id}`} style={{ fontSize: 14, fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Pin size={15} color="#0ea5e9" /> Pin to Homepage
                    </label>
                  </div>

                  <div className="a-grid-2" style={{ marginBottom: 16 }}>
                    <ImageUpload label="University Logo" value={entry.universityLogo} onChange={v => updateEntry(entry.id, 'universityLogo', v)} size="md" />
                    <ImageUpload label="University Cover Image" value={entry.universityImage} onChange={v => updateEntry(entry.id, 'universityImage', v)} size="lg" />
                  </div>

                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">University Name</label>
                      <input type="text" value={entry.universityName} onChange={e => updateEntry(entry.id, 'universityName', e.target.value)} className="a-input blue" placeholder="Harvard University" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Location</label>
                      <input type="text" value={entry.location || ''} onChange={e => updateEntry(entry.id, 'location', e.target.value)} className="a-input blue" placeholder="Cambridge, MA" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Degree</label>
                      <input type="text" value={entry.degree} onChange={e => updateEntry(entry.id, 'degree', e.target.value)} className="a-input blue" placeholder="B.S. Computer Science" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Degree Type (Abbreviation)</label>
                      <input type="text" value={entry.type || ''} onChange={e => updateEntry(entry.id, 'type', e.target.value)} className="a-input blue" placeholder="B.TECH" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Period</label>
                      <input type="text" value={entry.period} onChange={e => updateEntry(entry.id, 'period', e.target.value)} className="a-input blue" placeholder="2018 - 2022" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Description (Optional)</label>
                      <input type="text" value={entry.description || ''} onChange={e => updateEntry(entry.id, 'description', e.target.value)} className="a-input blue" placeholder="Brief info..." />
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ marginTop: 8 }}>
                    <div className="a-section-divider">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Stats Badges</h3>
                      <button type="button" onClick={() => addStat(entry.id)} className="a-btn a-btn-xs" style={{ background: '#e0f2fe', color: '#0284c7', borderColor: '#bae6fd' }}><Plus size={11} /> Add Stat</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(entry.stats || []).map((stat, i) => (
                        <div key={i} className="a-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 10 }}>
                          <input type="text" value={stat.label} onChange={e => updateStat(entry.id, i, 'label', e.target.value)} className="a-input blue" placeholder="CGPA" />
                          <input type="text" value={stat.value} onChange={e => updateStat(entry.id, i, 'value', e.target.value)} className="a-input blue" placeholder="8.5 / 10" />
                          <input type="text" value={stat.sub || ''} onChange={e => updateStat(entry.id, i, 'sub', e.target.value)} className="a-input blue" placeholder="(optional sub)" />
                          <button type="button" onClick={() => removeStat(entry.id, i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                        </div>
                      ))}
                      {(entry.stats || []).length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>No stats yet.</p>}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="a-field" style={{ marginTop: 8 }}>
                    <div className="a-section-divider">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Sparkles size={13} /> Key Achievements</h3>
                      <button type="button" onClick={() => addAchievement(entry.id)} className="a-btn a-btn-xs" style={{ background: '#e0f2fe', color: '#0284c7', borderColor: '#bae6fd' }}>
                        <Plus size={11} /> Add Achievement
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {(entry.keyAchievements || []).length === 0 && (
                        <div style={{ fontSize: 12.5, color: '#94a3b8', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0', textAlign: 'center' }}>
                          No achievements yet — click «Add Achievement» to start
                        </div>
                      )}
                      {(entry.keyAchievements || []).map((ach, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, minWidth: 18, textAlign: 'right' }}>{idx + 1}.</span>
                          <input
                            type="text"
                            value={ach}
                            onChange={e => updateAchievement(entry.id, idx, e.target.value)}
                            className="a-input blue"
                            style={{ flex: 1, padding: '7px 10px', fontSize: 13 }}
                            placeholder={`Achievement ${idx + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeAchievement(entry.id, idx)}
                            className="a-btn-icon danger"
                            style={{ width: 28, height: 28, flexShrink: 0 }}
                            title="Remove achievement"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap"><GraduationCap size={24} color="#94a3b8" /></div>
            <h4>No education entries yet</h4>
            <p>Click "Add Entry" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : ''}`} style={{ background: saved ? '' : '#0284c7', color: 'white', borderColor: saved ? '' : '#0369a1' }}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save All Education</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default AllEducationEdit;

