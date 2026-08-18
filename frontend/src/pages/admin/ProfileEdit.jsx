import React, { useState, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import FileUpload from '../../components/FileUpload';
import { User, Save, Plus, Trash2, CheckCircle, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import '../../admin.css';

const ProfileEdit = () => {
  const { data, updateData } = useBackend();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [form, setForm] = useState({
    name: '', nameParts: { first: '', last: '' }, titles: [],
    tagline: '', resumeUrl: '', hireEmail: '', avatarUrl: '',
    socialLinks: { linkedin: '', github: '', email: '', whatsapp: '' }
  });

  useEffect(() => {
    if (data.profileData) {
      setForm({
        name: data.profileData.name || '',
        nameParts: data.profileData.nameParts || { first: '', last: '' },
        titles: data.profileData.titles || [],
        tagline: data.profileData.tagline || '',
        resumeUrl: data.profileData.resumeUrl || '',
        hireEmail: data.profileData.hireEmail || '',
        avatarUrl: data.profileData.avatarUrl || '',
        socialLinks: data.profileData.socialLinks || { linkedin: '', github: '', email: '', whatsapp: '' }
      });
    }
  }, [data.profileData]);

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const setNested = (parent, f, v) => setForm(p => ({ ...p, [parent]: { ...p[parent], [f]: v } }));
  const addTitle = () => setForm(p => ({ ...p, titles: [...p.titles, ''] }));
  const updateTitle = (i, v) => { const t = [...form.titles]; t[i] = v; set('titles', t); };
  const removeTitle = (i) => set('titles', form.titles.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const result = await updateData('profileData', { ...data.profileData, ...form });
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
      {/* Basic Info */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><User size={19} /></div>
          <div>
            <h2 className="a-card-title">Basic Information</h2>
            <p className="a-card-subtitle">Your name, titles and contact shown on the Hero section</p>
          </div>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ImageUpload
            label="Profile Avatar"
            hint="Your main profile photo shown in the hero orbit section"
            value={form.avatarUrl}
            onChange={(v) => set('avatarUrl', v)}
            size="lg"
          />

          <div className="a-grid-2">
            <div className="a-field">
              <label className="a-label">Full Name</label>
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className="a-input" placeholder="Mustafa Hasan" />
            </div>
            <div className="a-field">
              <label className="a-label">Hire Email</label>
              <p className="a-hint">Used for the "Hire Me" button</p>
              <input type="email" value={form.hireEmail} onChange={e => set('hireEmail', e.target.value)} className="a-input" placeholder="you@example.com" />
            </div>
          </div>

          <div className="a-grid-2">
            <div className="a-field">
              <label className="a-label">First Name Part</label>
              <p className="a-hint">Highlighted/gradient part of name</p>
              <input type="text" value={form.nameParts?.first || ''} onChange={e => setNested('nameParts', 'first', e.target.value)} className="a-input" placeholder="Mustafa" />
            </div>
            <div className="a-field">
              <label className="a-label">Last Name Part</label>
              <p className="a-hint">Second accent-colored part of name</p>
              <input type="text" value={form.nameParts?.last || ''} onChange={e => setNested('nameParts', 'last', e.target.value)} className="a-input" placeholder=" Hasan" />
            </div>
          </div>

          <div className="a-field">
            <label className="a-label">Tagline / Bio</label>
            <p className="a-hint">Short description shown below your name</p>
            <textarea value={form.tagline} onChange={e => set('tagline', e.target.value)} rows="3" className="a-textarea" placeholder="I build beautiful Android applications..." />
          </div>

          <div className="a-field">
            <FileUpload
              label="Resume Document"
              hint="Upload your resume PDF or use an external URL (Google Drive, Dropbox, etc.)"
              value={form.resumeUrl}
              onChange={v => set('resumeUrl', v)}
            />
          </div>

          {/* Social Links */}
          <div className="a-section-divider"><h3 style={{ fontSize: 13, fontWeight: 700 }}>Social Links</h3></div>
          <div className="a-grid-2">
            <div className="a-field">
              <label className="a-label">LinkedIn URL</label>
              <input type="text" value={form.socialLinks?.linkedin || ''} onChange={e => setNested('socialLinks', 'linkedin', e.target.value)} className="a-input" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="a-field">
              <label className="a-label">GitHub URL</label>
              <input type="text" value={form.socialLinks?.github || ''} onChange={e => setNested('socialLinks', 'github', e.target.value)} className="a-input" placeholder="https://github.com/..." />
            </div>
          </div>
          <div className="a-grid-2">
            <div className="a-field">
              <label className="a-label">Email Action (mailto:)</label>
              <input type="text" value={form.socialLinks?.email || ''} onChange={e => setNested('socialLinks', 'email', e.target.value)} className="a-input" placeholder="mailto:you@example.com" />
            </div>
            <div className="a-field">
              <label className="a-label">WhatsApp Link</label>
              <input type="text" value={form.socialLinks?.whatsapp || ''} onChange={e => setNested('socialLinks', 'whatsapp', e.target.value)} className="a-input" placeholder="https://wa.me/..." />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Titles */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fff 100%)', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="a-icon-badge purple"><Sparkles size={18} /></div>
            <div>
              <h2 className="a-card-title">Animated Titles</h2>
              <p className="a-card-subtitle">These cycle in the hero section typewriter animation</p>
            </div>
          </div>
          <button type="button" onClick={addTitle} className="a-btn a-btn-sm a-btn-ghost-purple">
            <Plus size={13} /> Add Title
          </button>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {form.titles.map((title, i) => (
            <div key={i} className="a-row">
              <span className="a-row-num purple">{i + 1}</span>
              <input
                type="text"
                value={title}
                onChange={e => updateTitle(i, e.target.value)}
                placeholder="Android Developer"
                className="a-input"
                style={{ flex: 1, background: '#fff' }}
              />
              <button type="button" onClick={() => removeTitle(i)} className="a-btn-icon danger">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {form.titles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', background: '#fafafa', borderRadius: 12, border: '1.5px dashed #e2e8f0', color: '#94a3b8', fontSize: 13 }}>
              No titles yet. Click "Add Title" to add one.
            </div>
          )}
        </div>
      </div>

      {/* Save */}
      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-primary'}`} disabled={saving}>
          {saving ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Profile</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied to the live site.</span>}
        {saveError && <span style={{ color: '#ef4444', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{saveError}</span>}
      </div>
    </form>
  );
};

export default ProfileEdit;
