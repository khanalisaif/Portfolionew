import React, { useState, useEffect } from 'react';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import ImageUpload from '../../components/ImageUpload';
import { Database, Save, Plus, Trash2, CheckCircle, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import '../../admin.css';

const AllSkillsEdit = () => {
  const { data, updateData } = useAdmin();
  
  // States
  const [categories, setCategories] = useState([]);
  const [detailed, setDetailed] = useState({});
  const [activeTab, setActiveTab] = useState('categories');
  const [expandedCatId, setExpandedCatId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data.allSkillsCategories) setCategories(data.allSkillsCategories);
    if (data.allSkillsDetailed) setDetailed(data.allSkillsDetailed);
  }, [data]);

  // Categories
  const addCategory = () => {
    const id = `cat-${Date.now()}`;
    setCategories([{ id, name: 'New Category', icon: '', count: 0 }, ...categories]);
    setDetailed({ ...detailed, [id]: { title: 'New Category', badge: '', description: '', meta: [], breakdownCount: 0, breakdownItems: [] } });
    setExpandedCatId(id);
  };
  const updateCat = (id, f, v) => setCategories(categories.map(c => c.id === id ? { ...c, [f]: v } : c));
  const removeCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    const newDetailed = { ...detailed };
    delete newDetailed[id];
    setDetailed(newDetailed);
  };

  // Detailed
  const updateDetailed = (catId, f, v) => setDetailed({ ...detailed, [catId]: { ...detailed[catId], [f]: v } });
  
  // Meta
  const addMeta = (catId) => updateDetailed(catId, 'meta', [...(detailed[catId]?.meta || []), { label: '', value: '', icon: '' }]);
  const updateMeta = (catId, i, f, v) => {
    const nm = [...(detailed[catId]?.meta || [])];
    nm[i] = { ...nm[i], [f]: v };
    updateDetailed(catId, 'meta', nm);
  };
  const removeMeta = (catId, i) => updateDetailed(catId, 'meta', (detailed[catId]?.meta || []).filter((_, idx) => idx !== i));

  // Breakdown
  const addBreakdown = (catId) => updateDetailed(catId, 'breakdownItems', [
    { id: `bd-${Date.now()}`, title: '', level: '', description: '', experience: '', points: [] },
    ...(detailed[catId]?.breakdownItems || [])
  ]);
  const updateBreakdown = (catId, i, f, v) => {
    const nb = [...(detailed[catId]?.breakdownItems || [])];
    nb[i] = { ...nb[i], [f]: v };
    updateDetailed(catId, 'breakdownItems', nb);
  };
  const removeBreakdown = (catId, i) => updateDetailed(catId, 'breakdownItems', (detailed[catId]?.breakdownItems || []).filter((_, idx) => idx !== i));
  const updatePoints = (catId, i, text) => updateBreakdown(catId, i, 'points', text.split('\n').map(p => p.trim()).filter(Boolean));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('allSkillsCategories', categories);
    updateData('allSkillsDetailed', detailed);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="a-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
      {/* Header */}
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 100%)' }}>
          <div className="a-icon-badge indigo"><Database size={19} /></div>
          <div>
            <h2 className="a-card-title">All Skills Data (Detailed Page)</h2>
            <p className="a-card-subtitle">Manage the comprehensive skills list and breakdown shown on /all-skills</p>
          </div>
        </div>
      </div>

      <div className="a-tabs">
        <button type="button" className={`a-tab slate ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          <Layers size={16} /> Skill Categories ({categories.length})
        </button>
      </div>

      {activeTab === 'categories' && (
        <div className="a-fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button type="button" onClick={addCategory} className="a-btn a-btn-sm a-btn-ghost-slate">
              <Plus size={13} /> Add Category
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {categories.map(cat => {
              const isOpen = expandedCatId === cat.id;
              const det = detailed[cat.id] || {};
              return (
                <div key={cat.id} className={`a-accordion slate${isOpen ? ' open' : ''}`}>
                  <button type="button" className="a-accordion-header" onClick={() => setExpandedCatId(isOpen ? null : cat.id)}>
                    <div className="a-accordion-avatar" style={{ borderRadius: 8, background: '#f8fafc', padding: 4 }}>
                      {cat.icon ? <img src={cat.icon} alt="" style={{ objectFit: 'contain' }} /> : <Database size={18} color="#94a3b8" />}
                    </div>
                    <div className="a-accordion-info">
                      <h4>{cat.name || 'Untitled Category'}</h4>
                      <p>{cat.count || 0} skills &bull; ID: {cat.id}</p>
                    </div>
                    <div className="a-accordion-actions">
                      <span onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }} className="a-btn-icon danger" style={{ width: 28, height: 28 }}><Trash2 size={14} /></span>
                      <div className={`a-chevron slate${isOpen ? ' open' : ''}`} style={{ width: 28, height: 28 }}>{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="a-accordion-body">
                      {/* Sidebar Category Info */}
                      <div className="a-section-divider"><h3 style={{ fontSize: 13, fontWeight: 700 }}>Category Info (Sidebar)</h3></div>
                      <div className="a-grid-2" style={{ marginBottom: 16 }}>
                        <div className="a-field">
                          <label className="a-label">Category ID (Unique)</label>
                          <input type="text" value={cat.id} onChange={e => {}} className="a-input slate" disabled title="ID cannot be changed after creation" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Display Name</label>
                          <input type="text" value={cat.name} onChange={e => updateCat(cat.id, 'name', e.target.value)} className="a-input slate" placeholder="Kotlin" />
                        </div>
                        <ImageUpload label="Category Icon" value={cat.icon} onChange={v => updateCat(cat.id, 'icon', v)} size="sm" />
                        <div className="a-field">
                          <label className="a-label">Total Count (Sidebar badge)</label>
                          <input type="number" value={cat.count} onChange={e => updateCat(cat.id, 'count', parseInt(e.target.value) || 0)} className="a-input slate" />
                        </div>
                      </div>

                      {/* Detailed Data Info */}
                      <div className="a-section-divider"><h3 style={{ fontSize: 13, fontWeight: 700 }}>Detailed Page Content</h3></div>
                      <div className="a-grid-2">
                        <div className="a-field">
                          <label className="a-label">Page Title</label>
                          <input type="text" value={det.title || ''} onChange={e => updateDetailed(cat.id, 'title', e.target.value)} className="a-input slate" placeholder="Kotlin" />
                        </div>
                        <div className="a-field">
                          <label className="a-label">Badge</label>
                          <input type="text" value={det.badge || ''} onChange={e => updateDetailed(cat.id, 'badge', e.target.value)} className="a-input slate" placeholder="Primary Skill" />
                        </div>
                      </div>
                      <div className="a-field" style={{ marginTop: 12 }}>
                        <label className="a-label">Description</label>
                        <textarea value={det.description || ''} onChange={e => updateDetailed(cat.id, 'description', e.target.value)} className="a-textarea slate" rows="2" />
                      </div>

                      {/* Meta Tags */}
                      <div style={{ marginTop: 16 }}>
                        <div className="a-section-divider">
                          <h3 style={{ fontSize: 13, fontWeight: 700 }}>Meta Tags</h3>
                          <button type="button" onClick={() => addMeta(cat.id)} className="a-btn a-btn-xs a-btn-ghost-slate"><Plus size={11} /> Add Meta</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {(det.meta || []).map((m, i) => (
                            <div key={i} className="a-row" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, width: '100%' }}>
                                <input type="text" value={m.label} onChange={e => updateMeta(cat.id, i, 'label', e.target.value)} className="a-input slate" placeholder="Label (e.g. Platform)" />
                                <input type="text" value={m.value} onChange={e => updateMeta(cat.id, i, 'value', e.target.value)} className="a-input slate" placeholder="Value (e.g. Android)" />
                                <button type="button" onClick={() => removeMeta(cat.id, i)} className="a-btn-icon danger"><Trash2 size={13} /></button>
                              </div>
                              <ImageUpload label="Custom Icon (Override)" value={m.customIconUrl} onChange={v => updateMeta(cat.id, i, 'customIconUrl', v)} size="sm" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Breakdown Items */}
                      <div style={{ marginTop: 16 }}>
                        <div className="a-section-divider">
                          <h3 style={{ fontSize: 13, fontWeight: 700 }}>Breakdown Items</h3>
                          <button type="button" onClick={() => addBreakdown(cat.id)} className="a-btn a-btn-xs a-btn-ghost-slate"><Plus size={11} /> Add Item</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {(det.breakdownItems || []).map((b, i) => (
                            <div key={i} style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Item {i + 1}</span>
                                <button type="button" onClick={() => removeBreakdown(cat.id, i)} className="a-btn-icon danger" style={{ width: 24, height: 24 }}><Trash2 size={13} /></button>
                              </div>
                              <div className="a-grid-2">
                                <div className="a-field">
                                  <label className="a-label">Title</label>
                                  <input type="text" value={b.title} onChange={e => updateBreakdown(cat.id, i, 'title', e.target.value)} className="a-input slate a-input-sm" />
                                </div>
                                <div className="a-field">
                                  <label className="a-label">Level</label>
                                  <input type="text" value={b.level} onChange={e => updateBreakdown(cat.id, i, 'level', e.target.value)} className="a-input slate a-input-sm" />
                                </div>
                                <div className="a-field">
                                  <label className="a-label">Experience</label>
                                  <input type="text" value={b.experience} onChange={e => updateBreakdown(cat.id, i, 'experience', e.target.value)} className="a-input slate a-input-sm" />
                                </div>
                                <div className="a-field">
                                  <label className="a-label">Description</label>
                                  <input type="text" value={b.description} onChange={e => updateBreakdown(cat.id, i, 'description', e.target.value)} className="a-input slate a-input-sm" />
                                </div>
                              </div>
                              <div className="a-field">
                                <label className="a-label">Points (one per line)</label>
                                <textarea value={(b.points || []).join('\n')} onChange={e => updatePoints(cat.id, i, e.target.value)} className="a-textarea slate" rows="3" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {categories.length === 0 && (
              <div className="a-empty">
                <div className="a-empty-icon-wrap"><Database size={24} color="#94a3b8" /></div>
                <h4>No categories</h4>
                <p>Add a skill category</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="a-save-bar">
        <button type="submit" className={`a-btn ${saved ? 'a-btn-success' : 'a-btn-slate'}`}>
          {saved ? <><CheckCircle size={17} /> Saved!</> : <><Save size={17} /> Save Detailed Skills</>}
        </button>
        {saved && <span className="a-save-success-msg"><CheckCircle size={14} /> Changes applied.</span>}
      </div>
    </form>
  );
};

export default AllSkillsEdit;
