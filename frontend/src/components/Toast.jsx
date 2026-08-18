import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/* ─────────────────────────────────────────────
   Global Toast / Popup system
   Usage:
     import { showToast } from '../components/Toast';
     showToast('message', 'error');   // 'success' | 'error' | 'warning' | 'info'
   ───────────────────────────────────────────── */

let _addToast = null;

export function showToast(message, type = 'info') {
  if (_addToast) _addToast({ message, type, id: Date.now() });
}

const ICONS = {
  success: CheckCircle2,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
};

const STYLES = {
  success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', text: '#15803d' },
  error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', text: '#b91c1c' },
  warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', text: '#b45309' },
  info:    { bg: '#eef2ff', border: '#c7d2fe', icon: '#4f46e5', text: '#4338ca' },
};

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const s = STYLES[toast.type] || STYLES.info;
  const Icon = ICONS[toast.type] || Info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 350);
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 14,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        minWidth: 280,
        maxWidth: 380,
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Icon size={18} style={{ color: s.icon, flexShrink: 0, marginTop: 1 }} />
      <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: s.text, lineHeight: 1.45 }}>
        {toast.message}
      </span>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 350); }}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: s.text, opacity: 0.6, padding: 2, flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    _addToast = (t) => setToasts(prev => [...prev, t]);
    return () => { _addToast = null; };
  }, []);

  const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      {toasts.map(toast => (
        <div key={toast.id} style={{ pointerEvents: 'all' }}>
          <ToastItem toast={toast} onRemove={remove} />
        </div>
      ))}
    </div>
  );
}
