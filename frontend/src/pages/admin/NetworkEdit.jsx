import React, { useState, useEffect } from 'react';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { Users, Save, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle } from 'lucide-react';
import '../../admin.css';

const NetworkEdit = () => {
  const { data, updateData } = useAdmin();
  const [connections, setConnections] = useState([]);
  const [sectionData, setSectionData] = useState({
    sectionTitle: '', sectionSubtitle: '', centerLabel: '', centerSubLabel: '', centerAvatar: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data.networkData) {
      setConnections(data.networkData.connections || []);
      setSectionData({
        sectionTitle: data.networkData.sectionTitle || '',
        sectionSubtitle: data.networkData.sectionSubtitle || '',
        centerLabel: data.networkData.centerLabel || '',
        centerSubLabel: data.networkData.centerSubLabel || '',
        centerAvatar: data.networkData.centerAvatar || ''
      });
    }
  }, [data.networkData]);

  const updateSection = (f, v) => setSectionData(p => ({ ...p, [f]: v }));

  const updateConn = (id, field, value) => setConnections(connections.map(c => c.id === id ? { ...c, [field]: value } : c));
  const addConn = () => {
    const nc = {
      id: `conn-${Date.now()}`, name: 'New Connection', role: '', avatar: '',
      skill: '', skillIcon: 'globe', angle: 0
    };
    setConnections([nc, ...connections]);
    setExpandedId(nc.id);
  };
  const removeConn = (id) => setConnections(connections.filter(c => c.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('networkData', { ...data.networkData, ...sectionData, connections });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Network Center Config */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><Users size={19} /></div>
          <div>
            <h2 className="a-card-title">Network Section</h2>
            <p className="a-card-subtitle">Manage the center node and section settings</p>
          </div>
        </div>
        <div className="a-card-body">
          <div className="a-grid-2" style={{ marginBottom: 16 }}>
            <div className="a-field">
              <label className="a-label">Center Label (You)</label>
              <input type="text" value={sectionData.centerLabel} onChange={e => updateSection('centerLabel', e.target.value)} className="a-input orange" placeholder="Me" />
            </div>
            <div className="a-field">
              <label className="a-label">Center Sub-label</label>
              <input type="text" value={sectionData.centerSubLabel} onChange={e => updateSection('centerSubLabel', e.target.value)} className="a-input orange" placeholder="Android Developer" />
            </div>
          </div>
          <ImageUpload label="Center Avatar" value={sectionData.centerAvatar} onChange={v => updateSection('centerAvatar', v)} size="md" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Connections ({connections.length})
        </h3>
        <button type="button" onClick={addConn} className="a-btn a-btn-sm a-btn-ghost-orange">
          <Plus size={13} /> Add Connection
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {connections.map(conn => {
          const isOpen = expandedId === conn.id;
          return (
            <div key={conn.id} className={`a-accordion orange${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : conn.id)}>
                <div className="a-accordion-avatar" style={{ border: `2px solid #ccc` }}>
                  {conn.avatar
                    ? <img src={conn.avatar} alt="" />
                    : <span className="a-accordion-avatar-fallback">{(conn.name || '?')[0]}</span>
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{conn.name || 'Untitled Connection'}</h4>
                  <p>{conn.role || 'No role'} &bull; Angle {conn.angle}°</p>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeConn(conn.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron orange${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="a-accordion-body">
                  <ImageUpload label="Connection Avatar" value={conn.avatar} onChange={v => updateConn(conn.id, 'avatar', v)} size="md" />

                  <div className="a-grid-2" style={{ marginTop: 16 }}>
                    <div className="a-field">
                      <label className="a-label">Name</label>
                      <input type="text" value={conn.name} onChange={e => updateConn(conn.id, 'name', e.target.value)} className="a-input orange" placeholder="Jane Doe" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Role</label>
                      <input type="text" value={conn.role} onChange={e => updateConn(conn.id, 'role', e.target.value)} className="a-input orange" placeholder="Designer" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Skill Text</label>
                      <input type="text" value={conn.skill} onChange={e => updateConn(conn.id, 'skill', e.target.value)} className="a-input orange" placeholder="UI/UX" />
                    </div>
                    <div className="a-field">
                      <label className="a-label">Skill Icon</label>
                      <select value={conn.skillIcon || 'globe'} onChange={e => updateConn(conn.id, 'skillIcon', e.target.value)} className="a-select orange">
                        <option value="android">Android</option>
                        <option value="apple">Apple</option>
                        <option value="server">Server</option>
                        <option value="search">Search</option>
                        <option value="cloud">Cloud</option>
                        <option value="globe">Globe</option>
                      </select>
                    </div>
                    <ImageUpload label="Custom Icon (Override)" value={conn.customSkillIconUrl} onChange={v => updateConn(conn.id, 'customSkillIconUrl', v)} size="sm" />
                  </div>

                  <div className="a-field" style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <label className="a-label">Position Angle (0-360)</label>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{conn.angle}°</span>
                    </div>
                    <input
                      type="range" min="0" max="360"
                      value={conn.angle || 0}
                      onChange={e => updateConn(conn.id, 'angle', parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: '#f97316' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {connections.length === 0 && (
          <div className="a-empty">
            <div className="a-empty-icon-wrap"><Users size={24} color="#94a3b8" /></div>
            <h4>No connections yet</h4>
            <p>Click "Add Connection" above to get started</p>
          </div>
        )}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-orange'}`}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Network</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default NetworkEdit;
