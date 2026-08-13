import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Code2, AlertCircle, Save, CheckCircle } from 'lucide-react';
import '../../admin.css';

const GenericSectionEditor = ({ sectionKey, title, description }) => {
  const { data, updateData } = useAdmin();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data[sectionKey]) {
      setJsonText(JSON.stringify(data[sectionKey], null, 2));
    }
  }, [data, sectionKey]);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonText);
      updateData(sectionKey, parsedData);
      setError('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError('Invalid JSON format. Please check for missing quotes or commas.');
    }
  };

  return (
    <form onSubmit={handleSave} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Header */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge blue"><Code2 size={19} /></div>
          <div>
            <h2 className="a-card-title">{title}</h2>
            <p className="a-card-subtitle">{description}</p>
          </div>
        </div>
        <div className="a-card-body">
          {error && (
            <div className="a-alert red" style={{ marginBottom: 20 }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div style={{ background: '#0f172a', borderRadius: 16, overflow: 'hidden', border: '1px solid #1e293b' }}>
            {/* Fake editor titlebar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: '#020617', borderBottom: '1px solid #1e293b' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }}></span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ marginLeft: 12, fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{sectionKey}.json</span>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              style={{
                width: '100%',
                minHeight: 360,
                padding: 20,
                background: '#0f172a',
                color: '#4ade80',
                fontFamily: 'monospace',
                fontSize: 13,
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.5
              }}
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-primary'}`}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Changes</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> JSON applied successfully.</span>}
      </div>
    </form>
  );
};

export default GenericSectionEditor;