import React, { useState, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import { Briefcase, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import '../../admin.css';

const ExperienceEdit = () => {
  const { data, updateData } = useBackend();
  const [entries, setEntries] = useState([]);
  const [sectionData, setSectionData] = useState({
    sectionTitle: '', sectionSubtitle: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (data.experienceData) {
      setEntries(data.experienceData.entries || []);
      setSectionData({
        sectionTitle: data.experienceData.sectionTitle || '',
        sectionSubtitle: data.experienceData.sectionSubtitle || '',
      });
    }
  }, [data.experienceData]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));
  const updateEntry = (id, field, value) => setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  
  const addEntry = () => {
    const ne = {
      id: `exp-${Date.now()}`, role: 'New Role', company: 'Company Name', location: '', period: '', description: ''
    };
    setEntries([ne, ...entries]);
    setExpandedId(ne.id);
  };
  
  const removeEntry = (id) => setEntries(entries.filter(e => e.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const result = await updateData('experienceData', { ...data.experienceData, ...sectionData, entries });
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
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge purple"><Briefcase size={19} /></div>
          <div>
            <h2 className="a-card-title">Experience Section</h2>
            <p className="a-card-subtitle">Manage your professional journey</p>
          </div>
        </div>
        <div className="a-card-body a-grid-2">
          <div className="a-field">
            <label className="a-label">Section Title</label>
            <input type="text" value={sectionData.sectionTitle} onChange={e => updateSection('sectionTitle', e.target.value)} className="a-input purple" placeholder="Experience" />
          </div>
          <div className="a-field">
            <label className="a-label">Section Subtitle</label>
            <input type="text" value={sectionData.sectionSubtitle} onChange={e => updateSection('sectionSubtitle', e.target.value)} className="a-input purple" placeholder="My professional journey" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Experience Entries ({entries.length})
        </h3>
        <button type="button" onClick={addEntry} className="a-btn a-btn-sm a-btn-ghost-purple">
          <Plus size={13} /> Add Entry
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map((entry, index) => {
          const isOpen = expandedId === entry.id;
          return (
            <div key={entry.id} className={`a-accordion purple${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : entry.id)}>
                <div className="a-accordion-avatar">
                  <span className="a-accordion-avatar-fallback">{(entry.role || '?')[0]}</span>
                </div>
                <div className="a-accordion-info">
                  <h4>{entry.role || 'Untitled Role'}</h4>
                  <p>{entry.company || 'No Company'} &bull; {entry.period || 'No Period'}</p>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron purple${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">Role / Job Title</label>
                      <input type="text" value={entry.role || ''} onChange={e => updateEntry(entry.id, 'role', e.target.value)} className="a-input purple" placeholder="Senior Developer" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Company Name</label>
                      <input type="text" value={entry.company || ''} onChange={e => updateEntry(entry.id, 'company', e.target.value)} className="a-input purple" placeholder="Tech Solutions" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Location</label>
                      <input type="text" value={entry.location || ''} onChange={e => updateEntry(entry.id, 'location', e.target.value)} className="a-input purple" placeholder="Bangalore, India" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Period</label>
                      <input type="text" value={entry.period || ''} onChange={e => updateEntry(entry.id, 'period', e.target.value)} className="a-input purple" placeholder="2023 - Present" />
                    </div>
                  </div>
                  <div className="a-field" style={{ marginTop: 16 }}>
                    <label className="a-label">Description</label>
                    <textarea value={entry.description || ''} onChange={e => updateEntry(entry.id, 'description', e.target.value)} rows="3" className="a-textarea purple" placeholder="Describe your responsibilities..." />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap"><Briefcase size={24} color="#94a3b8" /></div>
            <h4>No experience entries yet</h4>
            <p>Click "Add Entry" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-purple'}`} disabled={saving}>
          {saving
            ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</>
            : saved
            ? <><CheckCircle size={17} /> Saved!</>
            : <><Save size={17} /> Save Experience</>}
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

export default ExperienceEdit;

