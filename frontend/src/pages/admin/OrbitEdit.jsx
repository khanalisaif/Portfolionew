import React, { useState, useEffect } from 'react';
import { useBackend } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { Navigation, Save, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Loader2, Trash2, Plus } from 'lucide-react';
import '../../admin.css';

const ICON_OPTIONS = [
  { value: 'certificate', label: '🏆 Certificate' },
  { value: 'network', label: '🌐 Network' },
  { value: 'code', label: '💻 Code' },
  { value: 'trophy', label: '🥇 Trophy' },
  { value: 'briefcase', label: '💼 Briefcase' },
  { value: 'dumbbell', label: '💪 Strength' },
  { value: 'star', label: '⭐ Star' },
  { value: 'heart', label: '❤️ Heart' },
  { value: 'book', label: '📚 Book' },
  { value: 'rocket', label: '🚀 Rocket' },
];

const GRADIENTS = [
  { value: 'from-blue-400 to-blue-600', label: 'Blue', style: 'linear-gradient(135deg,#60a5fa,#2563eb)' },
  { value: 'from-cyan-400 to-cyan-600', label: 'Cyan', style: 'linear-gradient(135deg,#22d3ee,#0891b2)' },
  { value: 'from-indigo-500 to-purple-600', label: 'Indigo→Purple', style: 'linear-gradient(135deg,#6366f1,#9333ea)' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple→Pink', style: 'linear-gradient(135deg,#a855f7,#ec4899)' },
  { value: 'from-violet-500 to-purple-700', label: 'Violet', style: 'linear-gradient(135deg,#8b5cf6,#7e22ce)' },
  { value: 'from-blue-500 to-indigo-600', label: 'Blue→Indigo', style: 'linear-gradient(135deg,#3b82f6,#4f46e5)' },
  { value: 'from-green-400 to-emerald-600', label: 'Green', style: 'linear-gradient(135deg,#4ade80,#059669)' },
  { value: 'from-amber-400 to-orange-500', label: 'Amber', style: 'linear-gradient(135deg,#fbbf24,#f97316)' },
  { value: 'from-rose-400 to-red-600', label: 'Rose', style: 'linear-gradient(135deg,#fb7185,#dc2626)' },
];

const POSITIONS = ['top-left','top-right','mid-left','mid-right','bot-left','bot-right'];

const OrbitEdit = () => {
  const { data, updateData } = useBackend();
  const [cards, setCards] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => { if (data.orbitCards) setCards(data.orbitCards); }, [data.orbitCards]);

  const handleChange = (id, field, value) => setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));

  const addItem = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    handleChange(cardId, 'items', [...(card?.items || []), '']);
  };
  const updateItem = (cardId, idx, value) => {
    const card = cards.find(c => c.id === cardId);
    const items = [...(card?.items || [])];
    items[idx] = value;
    handleChange(cardId, 'items', items);
  };
  const removeItem = (cardId, idx) => {
    const card = cards.find(c => c.id === cardId);
    handleChange(cardId, 'items', (card?.items || []).filter((_, i) => i !== idx));
  };

  const addCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      label: 'New Card',
      sublabel: 'Short description',
      icon: 'star',
      iconBg: 'from-blue-500 to-indigo-600',
      position: 'mid-right',
      items: [],
      viewAllLabel: 'View details',
      viewAllUrl: '/'
    };
    setCards([...cards, newCard]);
    setExpandedId(newCard.id);
  };

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const result = await updateData('orbitCards', cards);
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
      {/* Header */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><Navigation size={19} /></div>
          <div>
            <h2 className="a-card-title">Orbit Cards</h2>
            <p className="a-card-subtitle">The 6 cards floating around your profile photo in the hero section</p>
          </div>
        </div>
        <div className="a-card-body">
          <div className="a-alert amber">
            <span>💡</span>
            Each card has a fixed position. You can edit its content, icon, gradient color and popup items.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Orbit Cards ({cards.length})
        </h3>
        <button type="button" onClick={addCard} className="a-btn a-btn-sm a-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={14} /> Add Card
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map(card => {
          const isOpen = expandedId === card.id;
          const gradStyle = GRADIENTS.find(g => g.value === card.iconBg)?.style || 'linear-gradient(135deg,#6366f1,#4f46e5)';
          return (
            <div key={card.id} className={`a-accordion${isOpen ? ' open' : ''}`}>
              <button type="button" className="a-accordion-header" onClick={() => setExpandedId(isOpen ? null : card.id)}>
                <div className="a-accordion-avatar" style={{ background: gradStyle, border: 'none' }}>
                  {card.customIconUrl
                    ? <img src={card.customIconUrl} alt="" style={{ width: '65%', height: '65%', objectFit: 'contain' }} />
                    : <span style={{ fontSize: 18 }}>{ICON_OPTIONS.find(i => i.value === card.icon)?.label?.split(' ')[0] || '📌'}</span>
                  }
                </div>
                <div className="a-accordion-info">
                  <h4>{card.label}</h4>
                  <p>{card.position} &bull; {card.items?.length || 0} items</p>
                </div>
                <div className="a-accordion-actions">
                  <span
                    onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                    className="a-btn-icon danger"
                    style={{ width: 28, height: 28 }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <div className={`a-chevron${isOpen ? ' open' : ''}`}>
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="a-accordion-body">
                <div className="a-grid-2">
                  <div className="a-field">
                    <label className="a-label">Card Label</label>
                    <input type="text" value={card.label} onChange={e => handleChange(card.id,'label',e.target.value)} className="a-input" placeholder="Certificates" />
                  </div>
                  <div className="a-field">
                    <label className="a-label">Sublabel</label>
                    <input type="text" value={card.sublabel} onChange={e => handleChange(card.id,'sublabel',e.target.value)} className="a-input" placeholder="View my certifications" />
                  </div>
                  <div className="a-field">
                    <label className="a-label">Icon Type</label>
                    <select value={card.icon} onChange={e => handleChange(card.id,'icon',e.target.value)} className="a-select">
                      {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="a-field">
                    <label className="a-label">Icon Color (Gradient)</label>
                    <select value={card.iconBg || 'from-blue-500 to-indigo-600'} onChange={e => handleChange(card.id,'iconBg',e.target.value)} className="a-select">
                      {GRADIENTS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                  <div className="a-field" style={{ gridColumn: '1 / -1' }}>
                    <label className="a-label">Position</label>
                    <select value={card.position} onChange={e => handleChange(card.id,'position',e.target.value)} className="a-select">
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>



                <div className="a-field">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label className="a-label" style={{ marginBottom: 0 }}>List Items</label>
                    <button
                      type="button"
                      onClick={() => addItem(card.id)}
                      className="a-btn a-btn-xs a-btn-ghost-indigo"
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Plus size={12} /> Add Item
                    </button>
                  </div>
                  <p className="a-hint" style={{ marginBottom: 8 }}>Shown when the card is expanded</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {(card.items || []).length === 0 && (
                      <div style={{ fontSize: 12.5, color: '#94a3b8', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0', textAlign: 'center' }}>
                        No items yet — click «Add Item» to start
                      </div>
                    )}
                    {(card.items || []).map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, minWidth: 18, textAlign: 'right' }}>{idx + 1}.</span>
                        <input
                          type="text"
                          value={item}
                          onChange={e => updateItem(card.id, idx, e.target.value)}
                          className="a-input"
                          style={{ flex: 1, padding: '7px 10px', fontSize: 13 }}
                          placeholder={`Item ${idx + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(card.id, idx)}
                          className="a-btn-icon"
                          style={{ width: 28, height: 28, flexShrink: 0 }}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="a-grid-2">
                  <div className="a-field">
                    <label className="a-label">View All Label</label>
                    <input type="text" value={card.viewAllLabel} onChange={e => handleChange(card.id,'viewAllLabel',e.target.value)} className="a-input" placeholder="View all certificates" />
                  </div>
                  <div className="a-field">
                    <label className="a-label">View All URL</label>
                    <input type="text" value={card.viewAllUrl} onChange={e => handleChange(card.id,'viewAllUrl',e.target.value)} className="a-input" placeholder="/all-education" />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                  <ImageUpload
                    label="Custom Icon Image"
                    hint="Upload a custom image to override the default icon above"
                    value={card.customIconUrl || ''}
                    onChange={(v) => handleChange(card.id,'customIconUrl',v)}
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
      </div>

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-primary'}`} disabled={saving}>
          {saving ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Orbit Cards</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
        {saveError && <span style={{ color: '#ef4444', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{saveError}</span>}
      </div>
    </form>
  );
};

export default OrbitEdit;

