import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import ImageUpload from '../../components/ImageUpload';
import { Award, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle, BarChart3 } from 'lucide-react';
import '../../admin.css';

const CertificatesEdit = () => {
  const { data, updateData } = useAdmin();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState([]);
  const [sectionData, setSectionData] = useState({
    sectionTitle: '', sectionSubtitle: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data.certificatesData) {
      setEntries(data.certificatesData.entries || []);
      setStats(data.certificatesData.stats || []);
      setSectionData({
        sectionTitle: data.certificatesData.sectionTitle || '',
        sectionSubtitle: data.certificatesData.sectionSubtitle || '',
      });
    }
  }, [data.certificatesData]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));
  const updateEntry = (id, field, value) => setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  
  const addEntry = () => {
    const ne = {
      id: `cert-${Date.now()}`, title: 'New Certificate', issuer: 'Issuer', date: '', description: '', image: ''
    };
    setEntries([ne, ...entries]);
    setExpandedId(ne.id);
  };
  
  const removeEntry = (id) => setEntries(entries.filter(e => e.id !== id));

  const addStat = () => setStats([...stats, { value: '', label: '' }]);
  const updateStat = (index, field, value) => {
    const ns = [...stats];
    ns[index] = { ...ns[index], [field]: value };
    setStats(ns);
  };
  const removeStat = (index) => setStats(stats.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('certificatesData', { ...data.certificatesData, ...sectionData, stats, entries });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Header & Section Data */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)' }}>
          <div className="a-icon-badge yellow" style={{ background: '#fef08a', color: '#854d0e' }}><Award size={19} /></div>
          <div>
            <h2 className="a-card-title">Certificates Section</h2>
            <p className="a-card-subtitle">Manage your professional certifications and licenses</p>
          </div>
        </div>
        <div className="a-card-body">
          <div className="a-grid-2">
            <div className="a-field">
              <label className="a-label">Section Title</label>
              <input type="text" value={sectionData.sectionTitle} onChange={e => updateSection('sectionTitle', e.target.value)} className="a-input" style={{ borderColor: '#fde047' }} placeholder="Certificates" />
            </div>
            <div className="a-field">
              <label className="a-label">Section Subtitle</label>
              <input type="text" value={sectionData.sectionSubtitle} onChange={e => updateSection('sectionSubtitle', e.target.value)} className="a-input" style={{ borderColor: '#fde047' }} placeholder="My professional certifications" />
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="a-section-divider">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Global Stats</h3>
              <button type="button" onClick={addStat} className="a-btn a-btn-xs" style={{ background: '#fef9c3', color: '#854d0e', borderColor: '#fde047' }}><Plus size={11} /> Add Stat</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stats.map((stat, i) => (
                <div key={i} className="a-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
                  <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} className="a-input" placeholder="Label (e.g. Total Certificates)" style={{ borderColor: '#fef08a' }} />
                  <input type="text" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} className="a-input" placeholder="Value (e.g. 10+)" style={{ borderColor: '#fef08a' }} />
                  <button type="button" onClick={() => removeStat(i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                </div>
              ))}
              {stats.length === 0 && <p className="a-text-hint" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>No stats yet.</p>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Certificate Entries ({entries.length})
        </h3>
        <button type="button" onClick={addEntry} className="a-btn a-btn-sm" style={{ background: '#fef9c3', color: '#854d0e', borderColor: '#fde047' }}>
          <Plus size={13} /> Add Certificate
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map((entry) => {
          const isOpen = expandedId === entry.id;
          return (
            <div key={entry.id} className={`a-accordion${isOpen ? ' open' : ''}`} style={{ borderColor: isOpen ? '#fde047' : '#e2e8f0' }}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : entry.id)}>
                <div className="a-accordion-avatar" style={{ background: '#fef9c3', color: '#854d0e' }}>
                  {entry.image 
                    ? <img src={entry.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                    : <Award size={20} />
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{entry.title || 'Untitled Certificate'}</h4>
                  <p>{entry.issuer || 'No Issuer'} &bull; {entry.date || 'No Date'}</p>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  <div style={{ marginBottom: 16 }}>
                    <ImageUpload label="Certificate Image" value={entry.image || ''} onChange={v => updateEntry(entry.id, 'image', v)} size="md" />
                  </div>
                  <div className="a-grid-2">
                    <div className="a-field">
                      <label className="a-label">Certificate Title</label>
                      <input type="text" value={entry.title || ''} onChange={e => updateEntry(entry.id, 'title', e.target.value)} className="a-input" style={{ borderColor: '#fef08a' }} placeholder="Google Android Developer" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Issuer</label>
                      <input type="text" value={entry.issuer || ''} onChange={e => updateEntry(entry.id, 'issuer', e.target.value)} className="a-input" style={{ borderColor: '#fef08a' }} placeholder="Google" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Date</label>
                      <input type="text" value={entry.date || ''} onChange={e => updateEntry(entry.id, 'date', e.target.value)} className="a-input" style={{ borderColor: '#fef08a' }} placeholder="Aug 2023" />
                    </div>
                  </div>
                  <div className="a-field" style={{ marginTop: 16 }}>
                    <label className="a-label">Description</label>
                    <textarea value={entry.description || ''} onChange={e => updateEntry(entry.id, 'description', e.target.value)} rows="3" className="a-textarea" style={{ borderColor: '#fef08a' }} placeholder="Describe the certification..." />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap" style={{ background: '#fef9c3' }}><Award size={24} color="#ca8a04" /></div>
            <h4>No certificates yet</h4>
            <p>Click "Add Certificate" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : ''}`} style={{ background: saved ? '' : '#eab308', color: 'white', borderColor: saved ? '' : '#ca8a04' }}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Certificates</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default CertificatesEdit;
