import React, { useState, useEffect } from 'react';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { BookOpen, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle, BarChart3, Sparkles, Award } from 'lucide-react';
import '../../admin.css';

const EducationEdit = () => {
  const { data, updateData } = useAdmin();
  const [entries, setEntries] = useState([]);
  const [sectionData, setSectionData] = useState({
    sectionTitle: '', sectionSubtitle: '', viewAllUrl: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('education');

  useEffect(() => {
    if (data.educationData) {
      setEntries(data.educationData.entries || []);
      setSectionData({
        sectionTitle: data.educationData.sectionTitle || '',
        sectionSubtitle: data.educationData.sectionSubtitle || '',
        viewAllUrl: data.educationData.viewAllUrl || '',
      });
    }
  }, [data.educationData]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));

  const updateEntry = (id, field, value) => setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  const addEntry = () => {
    const ne = {
      id: `edu-${Date.now()}`, universityName: 'New Education', location: '', universityImage: '',
      degree: '', type: '', period: '', universityLogo: '', stats: [], keyAchievements: [], certificates: []
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
  const updateAchievements = (id, text) => updateEntry(id, 'keyAchievements', text.split('\n').map(a => a.trim()).filter(Boolean));

  // Certificates
  const addCert = (id) => updateEntry(id, 'certificates', [...(entries.find(e => e.id === id)?.certificates || []), { title: '', year: '', image: '' }]);
  const updateCert = (eid, cid, f, v) => {
    const e = entries.find(x => x.id === eid);
    const nc = [...(e.certificates || [])];
    nc[cid] = { ...nc[cid], [f]: v };
    updateEntry(eid, 'certificates', nc);
  };
  const removeCert = (eid, cid) => updateEntry(eid, 'certificates', (entries.find(e => e.id === eid)?.certificates || []).filter((_, i) => i !== cid));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('educationData', { ...data.educationData, ...sectionData, entries });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      
      <div className="a-tabs">
        <button type="button" className={`a-tab purple ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
          <BookOpen size={16} /> Education Details
        </button>
        <button type="button" className={`a-tab purple ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>
          <Award size={16} /> Certificates
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {activeTab === 'education' ? 'Education Entries' : 'Certificates by University'} ({entries.length})
        </h3>
        {activeTab === 'education' && (
          <button type="button" onClick={addEntry} className="a-btn a-btn-sm a-btn-ghost-purple">
            <Plus size={13} /> Add Entry
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map(entry => {
          const isOpen = expandedId === entry.id;
          return (
            <div key={entry.id} className={`a-accordion purple${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : entry.id)}>
                <div className="a-accordion-avatar">
                  {entry.universityLogo
                    ? <img src={entry.universityLogo} alt="" />
                    : <span className="a-accordion-avatar-fallback">{(entry.universityName || '?')[0]}</span>
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{entry.universityName || 'Untitled Entry'}</h4>
                  {activeTab === 'education' ? (
                    <p>{entry.degree || 'No degree'} &bull; {entry.period || 'No period'}</p>
                  ) : (
                    <p>{(entry.certificates || []).length} Certificates added</p>
                  )}
                </div>
                <div className="a-accordion-actions">
                  {activeTab === 'education' && (
                    <span
                      onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                      className="a-btn-icon danger"
                      style={{ width: 28, height: 28 }}
                    >
                      <Trash2 size={14} />
                    </span>
                  )}
                  <div className={`a-chevron purple${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  
                  {activeTab === 'education' && (
                    <>
                      <div className="a-grid-2" style={{ marginBottom: 16 }}>
                        <ImageUpload label="University Logo" value={entry.universityLogo} onChange={v => updateEntry(entry.id, 'universityLogo', v)} size="md" />
                        <ImageUpload label="University Cover Image" value={entry.universityImage} onChange={v => updateEntry(entry.id, 'universityImage', v)} size="lg" />
                      </div>

                      <div className="a-grid-2">
                        <div className="a-field">
                          <label className="a-label">University Name</label>
                          <input type="text" value={entry.universityName} onChange={e => updateEntry(entry.id, 'universityName', e.target.value)} className="a-input purple" placeholder="Harvard University" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Location</label>
                          <input type="text" value={entry.location || ''} onChange={e => updateEntry(entry.id, 'location', e.target.value)} className="a-input purple" placeholder="Cambridge, MA" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Degree</label>
                          <input type="text" value={entry.degree} onChange={e => updateEntry(entry.id, 'degree', e.target.value)} className="a-input purple" placeholder="B.S. Computer Science" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Degree Type (Abbreviation)</label>
                          <input type="text" value={entry.type || ''} onChange={e => updateEntry(entry.id, 'type', e.target.value)} className="a-input purple" placeholder="B.TECH" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Period</label>
                          <input type="text" value={entry.period} onChange={e => updateEntry(entry.id, 'period', e.target.value)} className="a-input purple" placeholder="2018 - 2022" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Description (Optional)</label>
                          <input type="text" value={entry.description || ''} onChange={e => updateEntry(entry.id, 'description', e.target.value)} className="a-input purple" placeholder="Brief info..." />
                        </div>
                      </div>

                      {/* Stats */}
                      <div style={{ marginTop: 8 }}>
                        <div className="a-section-divider">
                          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Stats Badges</h3>
                          <button type="button" onClick={() => addStat(entry.id)} className="a-btn a-btn-xs a-btn-ghost-purple"><Plus size={11} /> Add Stat</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {(entry.stats || []).map((stat, i) => (
                            <div key={i} className="a-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 10 }}>
                              <input type="text" value={stat.label} onChange={e => updateStat(entry.id, i, 'label', e.target.value)} className="a-input purple" placeholder="CGPA" />
                              <input type="text" value={stat.value} onChange={e => updateStat(entry.id, i, 'value', e.target.value)} className="a-input purple" placeholder="8.5 / 10" />
                              <input type="text" value={stat.sub || ''} onChange={e => updateStat(entry.id, i, 'sub', e.target.value)} className="a-input purple" placeholder="(optional sub)" />
                              <button type="button" onClick={() => removeStat(entry.id, i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                            </div>
                          ))}
                          {(entry.stats || []).length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>No stats yet.</p>}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="a-field" style={{ marginTop: 8 }}>
                        <div className="a-section-divider"><h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Sparkles size={13} /> Key Achievements</h3></div>
                        <p className="a-hint">One achievement per line</p>
                        <textarea
                          value={(entry.keyAchievements || []).join('\n')}
                          onChange={e => updateAchievements(entry.id, e.target.value)}
                          rows="3"
                          className="a-textarea purple"
                          placeholder="Graduated with honors&#10;Lead of robotics club"
                        />
                      </div>
                    </>
                  )}

                  {/* Certificates */}
                  {activeTab === 'certificates' && (
                    <div style={{ marginTop: 8 }}>
                      <div className="a-section-divider">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Award size={13} /> Certificates for {entry.universityName}</h3>
                        <button type="button" onClick={() => addCert(entry.id)} className="a-btn a-btn-xs a-btn-ghost-purple"><Plus size={11} /> Add Cert</button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {(entry.certificates || []).map((cert, i) => (
                          <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 16, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 22, height: 22, background: '#f5f3ff', color: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                                Certificate
                              </span>
                              <button type="button" onClick={() => removeCert(entry.id, i)} className="a-btn-icon danger" style={{ width: 26, height: 26 }}><Trash2 size={13} /></button>
                            </div>
                            <div className="a-grid-2">
                              <div className="a-field">
                                <label className="a-label">Certificate Title</label>
                                <input type="text" value={cert.title || ''} onChange={e => updateCert(entry.id, i, 'title', e.target.value)} className="a-input purple" placeholder="Google IT Support" />
                              </div>
                              <div className="a-field">
                                <label className="a-label">Year / Date</label>
                                <input type="text" value={cert.year || ''} onChange={e => updateCert(entry.id, i, 'year', e.target.value)} className="a-input purple" placeholder="2022" />
                              </div>
                            </div>
                            <ImageUpload label="Certificate Image" value={cert.image} onChange={v => updateCert(entry.id, i, 'image', v)} size="sm" />
                          </div>
                        ))}
                        {(entry.certificates || []).length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>No certificates yet.</p>}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap"><BookOpen size={24} color="#94a3b8" /></div>
            <h4>No education entries yet</h4>
            <p>Click "Add Entry" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-purple'}`}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Education</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default EducationEdit;

