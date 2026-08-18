import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const TAILWIND_COLORS = [
  { name: 'Slate', classes: 'text-slate-600 bg-slate-50', hex: '#475569', bgHex: '#f8fafc' },
  { name: 'Red', classes: 'text-red-600 bg-red-50', hex: '#dc2626', bgHex: '#fef2f2' },
  { name: 'Orange', classes: 'text-orange-600 bg-orange-50', hex: '#ea580c', bgHex: '#fff7ed' },
  { name: 'Amber', classes: 'text-amber-600 bg-amber-50', hex: '#d97706', bgHex: '#fffbeb' },
  { name: 'Yellow', classes: 'text-yellow-600 bg-yellow-50', hex: '#ca8a04', bgHex: '#fefce8' },
  { name: 'Green', classes: 'text-green-600 bg-green-50', hex: '#16a34a', bgHex: '#f0fdf4' },
  { name: 'Emerald', classes: 'text-emerald-600 bg-emerald-50', hex: '#059669', bgHex: '#ecfdf5' },
  { name: 'Teal', classes: 'text-teal-600 bg-teal-50', hex: '#0d9488', bgHex: '#f0fdfa' },
  { name: 'Cyan', classes: 'text-cyan-600 bg-cyan-50', hex: '#0891b2', bgHex: '#ecfeff' },
  { name: 'Sky', classes: 'text-sky-600 bg-sky-50', hex: '#0284c7', bgHex: '#f0f9ff' },
  { name: 'Blue', classes: 'text-blue-600 bg-blue-50', hex: '#2563eb', bgHex: '#eff6ff' },
  { name: 'Indigo', classes: 'text-indigo-600 bg-indigo-50', hex: '#4f46e5', bgHex: '#eef2ff' },
  { name: 'Violet', classes: 'text-violet-600 bg-violet-50', hex: '#7c3aed', bgHex: '#f5f3ff' },
  { name: 'Purple', classes: 'text-purple-600 bg-purple-50', hex: '#9333ea', bgHex: '#faf5ff' },
  { name: 'Fuchsia', classes: 'text-fuchsia-600 bg-fuchsia-50', hex: '#c026d3', bgHex: '#fdf4ff' },
  { name: 'Pink', classes: 'text-pink-600 bg-pink-50', hex: '#db2777', bgHex: '#fdf2f8' },
  { name: 'Rose', classes: 'text-rose-600 bg-rose-50', hex: '#e11d48', bgHex: '#fff1f2' },
];

const ColorPicker = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = TAILWIND_COLORS.find(c => c.classes === value || value?.includes(c.name.toLowerCase())) || TAILWIND_COLORS[10];

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {label && <label className="a-label">{label}</label>}
      <div 
        onClick={() => setOpen(!open)}
        className="a-input" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          cursor: 'pointer',
          padding: '8px 12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: selected.hex, border: `2px solid ${selected.bgHex}` }}></div>
          <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{selected.name}</span>
        </div>
        <ChevronDown size={14} color="#64748b" />
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 4,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          zIndex: 50,
          maxHeight: 220,
          overflowY: 'auto',
          padding: 8,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4
        }}>
          {TAILWIND_COLORS.map(c => (
            <div 
              key={c.name}
              onClick={() => { onChange(c.classes); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                borderRadius: 8,
                cursor: 'pointer',
                background: value === c.classes ? '#f1f5f9' : 'transparent',
                transition: 'background 0.1s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = value === c.classes ? '#f1f5f9' : 'transparent'}
            >
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex }}></div>
              <span style={{ fontSize: 12, color: '#475569', flex: 1, fontWeight: value === c.classes ? 600 : 400 }}>{c.name}</span>
              {value === c.classes && <Check size={12} color="#0f172a" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
