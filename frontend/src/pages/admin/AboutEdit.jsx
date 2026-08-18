import React, { useState, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import { Info, Save, Plus, Trash2, CheckCircle, BarChart, Heart, Code2, AlertCircle, Loader2 } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';
import '../../admin.css';

const AboutEdit = () => {
  const { data, updateData } = useBackend();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [form, setForm] = useState({
    careerObjective: '',
    quote: '',
    stats: [],
    coreValues: [],
    whatIWorkOn: []
  });

  useEffect(() => {
    const about = data.aboutData || data.aboutPageData;
    if (about) {
      setForm({
        careerObjective: about.careerObjective || '',
        quote: about.quote || '',
        techStack: about.techStack || '',
        descriptions: about.descriptions || [],
        stats: about.stats || [],
        coreValues: about.coreValues || [],
        whatIWorkOn: about.whatIWorkOn || []
      });
    }
  }, [data.aboutData, data.aboutPageData]);

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  // Generic array updaters
  const addArrayItem = (key, defaultItem) => {
    set(key, [...form[key], defaultItem]);
  };
  const updateArrayItem = (key, idx, field, value) => {
    const arr = [...form[key]];
    arr[idx] = { ...arr[idx], [field]: value };
    set(key, arr);
  };
  const removeArrayItem = (key, idx) => {
    set(key, form[key].filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const currentAbout = data.aboutData || data.aboutPageData || {};
    const result = await updateData('aboutData', { ...currentAbout, ...form });
    setSaving(false);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setSaveError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 880 }}>
      {/* Introduction */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><Info size={19} /></div>
          <div>
            <h2 className="a-card-title">Introduction & Objective</h2>
            <p className="a-card-subtitle">Your career objective and personal quote</p>
          </div>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="a-label">Tech Stack Highlight</label>
            <input
              className="a-input"
              value={form.techStack || ''}
              onChange={(e) => set('techStack', e.target.value)}
              placeholder="Java • Kotlin • Swift • UIKit"
            />
          </div>
          <div>
            <label className="a-label">About Me Paragraphs</label>
            <p className="a-hint">Each new line represents a new paragraph.</p>
            <textarea
              className="a-input"
              rows={5}
              value={form.descriptions ? form.descriptions.join('\n') : ''}
              onChange={(e) => set('descriptions', e.target.value.split('\n'))}
              placeholder="I am a developer with over 3 years of experience..."
            />
          </div>
          <div>
            <label className="a-label">Career Objective</label>
            <textarea
              className="a-input"
              rows={4}
              value={form.careerObjective}
              onChange={(e) => set('careerObjective', e.target.value)}
              placeholder="My goal is to build reliable..."
            />
          </div>
          <div>
            <label className="a-label">Personal Quote</label>
            <textarea
              className="a-input"
              rows={2}
              value={form.quote}
              onChange={(e) => set('quote', e.target.value)}
              placeholder="Great mobile applications are built by..."
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fff 100%)' }}>
          <div className="a-icon-badge green"><BarChart size={19} /></div>
          <div>
            <h2 className="a-card-title">Statistics</h2>
            <p className="a-card-subtitle">Key numbers displayed below the orbit section</p>
          </div>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {form.stats.map((stat, i) => (
            <div key={i} className="a-exp-item" style={{ padding: 16 }}>
              <div className="a-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'flex-start' }}>
                <div>
                  <label className="a-label">Value (e.g. 40+)</label>
                  <input className="a-input" value={stat.value} onChange={e => updateArrayItem('stats', i, 'value', e.target.value)} />
                </div>
                <div>
                  <label className="a-label">Label (e.g. Apps)</label>
                  <input className="a-input" value={stat.label} onChange={e => updateArrayItem('stats', i, 'label', e.target.value)} />
                </div>
                <div>
                  <label className="a-label">Icon Name (lucide)</label>
                  <input className="a-input" value={stat.icon} onChange={e => updateArrayItem('stats', i, 'icon', e.target.value)} />
                </div>
                <ImageUpload label="Custom Icon (Override)" value={stat.customIconUrl} onChange={v => updateArrayItem('stats', i, 'customIconUrl', v)} size="sm" />
                <button type="button" onClick={() => removeArrayItem('stats', i)} className="a-btn-icon red" style={{ marginTop: 28 }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('stats', { value: '', label: '', icon: 'star' })} className="a-btn-outline" style={{ alignSelf: 'flex-start' }}>
            <Plus size={16} /> Add Statistic
          </button>
        </div>
      </div>

      {/* Core Values */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fff 100%)' }}>
          <div className="a-icon-badge pink"><Heart size={19} /></div>
          <div>
            <h2 className="a-card-title">Core Values</h2>
            <p className="a-card-subtitle">The principles you follow in your work</p>
          </div>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="a-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {form.coreValues.map((cv, i) => (
              <div key={i} className="a-exp-item" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>Value #{i + 1}</div>
                  <button type="button" onClick={() => removeArrayItem('coreValues', i)} className="a-btn-icon red"><Trash2 size={16} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label className="a-label">Title</label>
                    <input className="a-input" value={cv.title} onChange={e => updateArrayItem('coreValues', i, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className="a-label">Description</label>
                    <textarea className="a-input" rows={2} value={cv.description} onChange={e => updateArrayItem('coreValues', i, 'description', e.target.value)} />
                  </div>
                  <div className="a-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                      <label className="a-label">Icon (lucide)</label>
                      <input className="a-input" value={cv.icon} onChange={e => updateArrayItem('coreValues', i, 'icon', e.target.value)} />
                    </div>
                    <ImageUpload label="Custom Icon (Override)" value={cv.customIconUrl} onChange={v => updateArrayItem('coreValues', i, 'customIconUrl', v)} size="sm" />
                    <div>
                      <label className="a-label">Color Classes</label>
                      <input className="a-input" value={cv.color} onChange={e => updateArrayItem('coreValues', i, 'color', e.target.value)} placeholder="text-blue-600 bg-blue-50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addArrayItem('coreValues', { title: '', description: '', icon: 'star', color: 'text-indigo-600 bg-indigo-50' })} className="a-btn-outline" style={{ alignSelf: 'flex-start' }}>
            <Plus size={16} /> Add Core Value
          </button>
        </div>
      </div>

      {/* What I Work On */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff 100%)' }}>
          <div className="a-icon-badge orange"><Code2 size={19} /></div>
          <div>
            <h2 className="a-card-title">What I Work On</h2>
            <p className="a-card-subtitle">Technologies and domains you specialize in</p>
          </div>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="a-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {form.whatIWorkOn.map((item, i) => (
              <div key={i} className="a-exp-item" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input className="a-input" value={item.title} onChange={e => updateArrayItem('whatIWorkOn', i, 'title', e.target.value)} placeholder="Title" />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="a-input" value={item.icon} onChange={e => updateArrayItem('whatIWorkOn', i, 'icon', e.target.value)} placeholder="Icon name" style={{ flex: 1 }} />
                    <input className="a-input" value={item.color} onChange={e => updateArrayItem('whatIWorkOn', i, 'color', e.target.value)} placeholder="Color classes" style={{ flex: 1 }} />
                  </div>
                  <ImageUpload label="Custom Icon (Override)" value={item.customIconUrl} onChange={v => updateArrayItem('whatIWorkOn', i, 'customIconUrl', v)} size="sm" />
                </div>
                <button type="button" onClick={() => removeArrayItem('whatIWorkOn', i)} className="a-btn-icon red"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addArrayItem('whatIWorkOn', { title: '', icon: 'star', color: 'text-blue-500 bg-blue-50' })} className="a-btn-outline" style={{ alignSelf: 'flex-start' }}>
            <Plus size={16} /> Add Specialty
          </button>
        </div>
      </div>

      <div style={{ height: 100 }}></div>

      {/* Fixed Save Bar */}
      <div className="a-save-bar">
        {saved && (
          <div className="a-save-msg">
            <CheckCircle size={18} />
            <span>Changes saved successfully!</span>
          </div>
        )}
        {saveError && (
          <span style={{ color: '#ef4444', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={14} />{saveError}
          </span>
        )}
        <div style={{ flex: 1 }}></div>
        <button type="submit" className="a-btn-primary" disabled={saving} style={{ padding: '10px 24px', fontSize: 15 }}>
          {saving
            ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</>
            : <><Save size={18} /> Save Changes</>}
        </button>
      </div>
    </form>
  );
};

export default AboutEdit;
