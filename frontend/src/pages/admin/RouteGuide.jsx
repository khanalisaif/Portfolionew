import React, { useState } from 'react';
import { Link2, Copy, Check, Info } from 'lucide-react';
import '../../admin.css';

const routes = [
  { path: '/', label: 'About/Main Page (Orbit Interface)' },
  { path: '/home', label: 'Home Page (All Sections)' },
  { path: '/all-education', label: 'All Education Page' },
  { path: '/all-skills', label: 'All Skills Page' },
  { path: '/all-projects', label: 'All Projects Page' },
  { path: '/project/:id', label: 'Project Details (Replace :id with a real project ID)' },
  { path: '/certificates', label: 'All Certificates Page' },
  { path: '/achievements', label: 'Achievements (Points to Certificates)' },
  { path: '/experience', label: 'All Experience Page' },
  { path: '/home#skills', label: 'Scroll to Skills Section (Home)' },
  { path: '/home#projects', label: 'Scroll to Projects Section (Home)' },
  { path: '/home#network', label: 'Scroll to Network Section (Home)' },
  { path: '/home#education', label: 'Scroll to Education Section (Home)' },
];

export default function RouteGuide() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="a-fade-up" style={{ maxWidth: 880, margin: '0 auto' }}>
      <div className="a-card">
        <div className="a-card-header" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fff 100%)' }}>
          <div className="a-icon-badge green"><Link2 size={19} /></div>
          <div>
            <h2 className="a-card-title">Route Links Guide</h2>
            <p className="a-card-subtitle">Copy these URLs to use in Orbit Cards, Network Links, or anywhere else.</p>
          </div>
        </div>
        
        <div style={{ padding: 24 }}>
          <div style={{ padding: '12px 16px', background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 24 }}>
            <Info size={16} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 13, color: '#1e3a8a', lineHeight: 1.5 }}>
              <strong>Tip:</strong> If you want an Orbit Card to open a page, copy the exact path from below (like <code>/all-education</code>) and paste it into the <strong>View Details URL</strong> field of that card.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {routes.map((route, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', transition: 'all 0.2s ease' }} className="hover:border-green-300">
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{route.label}</h4>
                  <code style={{ fontSize: 14, color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: 6, marginTop: 8, display: 'inline-block', border: '1px solid #a7f3d0' }}>
                    {route.path}
                  </code>
                </div>
                <button 
                  onClick={() => copyToClipboard(route.path)}
                  className="a-btn a-btn-sm a-btn-ghost-green" 
                  style={{ width: 85, justifyContent: 'center' }}
                >
                  {copied === route.path ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
