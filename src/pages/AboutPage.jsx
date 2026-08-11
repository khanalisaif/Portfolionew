import { useState, useEffect } from 'react';
import { profileData, orbitCards, aboutPageData } from '../data';
import {
  Download, Send, ChevronRight, ArrowRight,
  FileText, Users, Code2, Trophy, Briefcase, Dumbbell,
  Layers, Building, Smartphone, Lightbulb, Zap, BookOpen,
  User, Cloud, MapPin, Shield, CreditCard, Bell, QrCode,
  Flame, UploadCloud, TrendingUp, Feather, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AndroidIcon = ({ size = 20, style }) => (
  <svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414ZM17.9155 8.79092C15.8286 7.64019 13.4357 7 11.9961 7C10.5566 7 8.16377 7.64019 6.0769 8.79092L4.62933 6.27092C4.42974 5.92215 3.9857 5.79562 3.63937 5.99264C3.29305 6.18967 3.17066 6.63474 3.37025 6.98351L4.84651 9.55397C2.10271 11.2335 0.222718 14.1504 0 17.518H23.9923C23.7696 14.1504 21.8896 11.2335 19.1458 9.55397L20.622 6.98351C20.8216 6.63474 20.6993 6.18967 20.3529 5.99264C20.0066 5.79562 19.5626 5.92215 19.363 6.27092L17.9155 8.79092ZM6.44299 15.3414C5.69805 15.3414 5.09337 14.7367 5.09337 13.9918C5.09337 13.2468 5.69805 12.6421 6.44299 12.6421C7.18793 12.6421 7.79261 13.2468 7.79261 13.9918C7.79261 14.7367 7.18793 15.3414 6.44299 15.3414ZM17.5492 15.3414C16.8043 15.3414 16.1996 14.7367 16.1996 13.9918C16.1996 13.2468 16.8043 12.6421 17.5492 12.6421C18.2942 12.6421 18.8989 13.2468 18.8989 13.9918C18.8989 14.7367 18.2942 15.3414 17.5492 15.3414Z"/>
  </svg>
);

const AppleIcon = ({ size = 20, style }) => (
  <svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/>
  </svg>
);

/* ── icon registry ─────────────────────────────────── */
const ALL_ICONS = {
  code: Code2, trophy: Trophy, certificate: FileText,
  network: Users, dumbbell: Dumbbell, briefcase: Briefcase,
  layers: Layers, building: Building, android: AndroidIcon,
  apple: AppleIcon, lightbulb: Lightbulb, zap: Zap,
  book: BookOpen, users: Users, user: User, cloud: Cloud,
  'map-pin': MapPin, shield: Shield, 'credit-card': CreditCard,
  bell: Bell, 'qr-code': QrCode, flame: Flame,
  'cloud-upload': UploadCloud, 'trending-up': TrendingUp,
  'pen-tool': Feather, target: Target
};

function Ico({ name, size = 20, style }) {
  const C = ALL_ICONS[name] || Code2;
  return <C size={size} style={style} />;
}

/* ── colour palettes for orbit cards ─────────────────── */
const GRADIENTS = {
  certificates: { c1: '#60a5fa', c2: '#1d4ed8' },
  networks: { c1: '#22d3ee', c2: '#0284c7' },
  skills: { c1: '#6366f1', c2: '#7c3aed' },
  achievements: { c1: '#a855f7', c2: '#db2777' },
  projects: { c1: '#8b5cf6', c2: '#6d28d9' },
  strength: { c1: '#3b82f6', c2: '#4338ca' },
};

/* ── SVG canvas constants (match hero) ───────────────── */
const SW = 620, SH = 540;
const CX = SW / 2, CY = 265, OR = 200, PR = 104;

const LAYOUT = [
  { id: 'certificates', angle: 330, side: 'left' },
  { id: 'networks', angle: 30, side: 'right' },
  { id: 'skills', angle: 270, side: 'left' },
  { id: 'achievements', angle: 90, side: 'right' },
  { id: 'projects', angle: 210, side: 'left' },
  { id: 'strength', angle: 150, side: 'right' },
];

function xyOf(deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [CX + OR * Math.cos(rad), CY + OR * Math.sin(rad)];
}

const ORBIT_PATH = `M ${CX} ${CY - OR} A ${OR} ${OR} 0 0 1 ${CX} ${CY + OR} A ${OR} ${OR} 0 0 1 ${CX} ${CY - OR}`;
const CARD_W = 196;
const EXP_W = 210;
const EXP_H = 140;

/* ── Desktop orbit card (exact copy of HeroSection style) ── */
function OrbitCard({ card, idx }) {
  const [open, setOpen] = useState(false);
  const layout = LAYOUT.find(l => l.id === card.id);
  if (!layout) return null;

  const Icon = ALL_ICONS[card.icon] || FileText;
  const g = GRADIENTS[card.id] || GRADIENTS.skills;
  const [ox, oy] = xyOf(layout.angle);

  return (
    <div style={{ position: 'absolute', zIndex: open ? 30 : 20 }}>
      {open ? (
        <>
          {/* Icon bubble at orbit position */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', left: ox - 26, top: oy - 26,
              width: 52, height: 52, borderRadius: '50%',
              background: `linear-gradient(135deg,${g.c1},${g.c2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', border: '4px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)', cursor: 'pointer', zIndex: 31,
            }}
          >
            {card.customIconUrl
              ? <img src={card.customIconUrl} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
              : <Icon size={20} />}
          </div>

          {/* Speech bubble card */}
          <div style={{
            position: 'absolute',
            left: layout.side === 'left' ? ox - EXP_W - 40 : ox + 40,
            top: oy - EXP_H / 2,
            width: EXP_W,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(24px)',
            borderRadius: 16,
            border: '1.5px solid rgba(255,255,255,0.95)',
            padding: '16px 18px',
            boxShadow: '0 16px 48px rgba(99,102,241,0.18), 0 4px 16px rgba(0,0,0,0.07)',
            animation: 'expandCard 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            {/* Tail */}
            <div style={{
              position: 'absolute', top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              width: 14, height: 14,
              background: 'rgba(255,255,255,0.97)',
              border: '1.5px solid rgba(255,255,255,0.95)',
              [layout.side === 'left' ? 'right' : 'left']: -8,
              borderLeftColor: layout.side === 'right' ? 'transparent' : undefined,
              borderBottomColor: layout.side === 'right' ? 'transparent' : undefined,
              borderRightColor: layout.side === 'left' ? 'transparent' : undefined,
              borderTopColor: layout.side === 'left' ? 'transparent' : undefined,
              zIndex: -1,
            }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>{card.label}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px' }}>
              {card.items?.map((item, i) => (
                <li key={i} style={{ fontSize: 12, color: '#475569', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#6366f1', fontSize: 16, lineHeight: 1 }}>•</span>{item}
                </li>
              ))}
            </ul>
            <Link
              to={card.viewAllUrl}
              onClick={e => e.stopPropagation()}
              style={{ fontSize: 12, fontWeight: 600, color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {card.viewAllLabel}&nbsp;<ArrowRight size={11} />
            </Link>
          </div>
        </>
      ) : (
        /* Pill card */
        <div
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            left: layout.side === 'left' ? ox - CARD_W - 20 : ox + 20,
            top: oy - 30,
            width: CARD_W,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            borderRadius: 30,
            border: '1.5px solid rgba(255,255,255,0.95)',
            padding: '8px 14px 8px 8px',
            boxShadow: '0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            animation: `cardFloat 3.5s ease-in-out infinite`,
            animationDelay: `${idx * 0.45}s`,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg,${g.c1},${g.c2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', flexShrink: 0,
          }}>
            {card.customIconUrl
              ? <img src={card.customIconUrl} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
              : <Icon size={20} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>{card.label}</div>
            <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.35, marginTop: 2 }}>{card.sublabel}</div>
          </div>
          <ChevronRight size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
        </div>
      )}
    </div>
  );
}

/* ── Mobile accordion orbit card ───────────────────────── */
function MobOrbitCard({ card }) {
  const [open, setOpen] = useState(false);
  const Icon = ALL_ICONS[card.icon] || FileText;
  const g = GRADIENTS[card.id] || GRADIENTS.skills;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 16,
      border: `1.5px solid ${open ? g.c1 + '55' : 'rgba(240,242,255,1)'}`,
      overflow: 'hidden',
      boxShadow: open
        ? `0 8px 32px ${g.c1}22, 0 2px 8px rgba(0,0,0,0.06)`
        : '0 4px 20px rgba(99,102,241,0.07)',
      transition: 'border-color 0.25s, box-shadow 0.25s',
    }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg,${g.c1},${g.c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
          <Icon size={20} />
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b' }}>{card.label}</div>
          <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>{card.sublabel}</div>
        </div>
        <ChevronRight size={16} style={{ color: open ? g.c1 : '#cbd5e1', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.25s, color 0.25s', flexShrink: 0 }} />
      </div>
      {open && (
        <div style={{ padding: '0 16px 16px', animation: 'expandCard 0.25s ease' }}>
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 12 }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {card.items?.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#334155', fontWeight: 500 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: `linear-gradient(135deg,${g.c1},${g.c2})`, flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link to={card.viewAllUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg,${g.c1},${g.c2})`, color: '#fff', borderRadius: 10, padding: '9px 16px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
            {card.viewAllLabel} <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ── color maps ─────────────────────────────────────── */
const CV_COLORS = {
  'text-purple-600': { text: '#9333ea', bg: '#faf5ff' },
  'text-green-600': { text: '#16a34a', bg: '#f0fdf4' },
  'text-blue-600': { text: '#2563eb', bg: '#eff6ff' },
  'text-indigo-600': { text: '#4f46e5', bg: '#eef2ff' },
  'text-pink-600': { text: '#db2777', bg: '#fdf2f8' },
  'text-orange-600': { text: '#ea580c', bg: '#fff7ed' },
};

const WIWO_COLORS = {
  'text-green-500': { text: '#22c55e', bg: '#f0fdf4' },
  'text-gray-800': { text: '#1f2937', bg: '#f9fafb' },
  'text-blue-500': { text: '#3b82f6', bg: '#eff6ff' },
  'text-red-500': { text: '#ef4444', bg: '#fef2f2' },
  'text-emerald-500': { text: '#10b981', bg: '#ecfdf5' },
  'text-purple-500': { text: '#a855f7', bg: '#faf5ff' },
  'text-orange-500': { text: '#f97316', bg: '#fff7ed' },
  'text-indigo-500': { text: '#6366f1', bg: '#eef2ff' },
  'text-amber-500': { text: '#f59e0b', bg: '#fffbeb' },
  'text-cyan-500': { text: '#06b6d4', bg: '#ecfeff' },
  'text-blue-600': { text: '#2563eb', bg: '#eff6ff' },
  'text-pink-500': { text: '#ec4899', bg: '#fdf2f8' },
};

const STAT_ICONS = {
  briefcase: { icon: 'briefcase', bg: '#eef2ff', color: '#4f46e5' },
  code: { icon: 'code', bg: '#ecfdf5', color: '#059669' },
  layers: { icon: 'layers', bg: '#eff6ff', color: '#2563eb' },
  building: { icon: 'building', bg: '#faf5ff', color: '#7c3aed' },
  android: { icon: 'android', bg: '#f0fdf4', color: '#16a34a' },
  apple: { icon: 'apple', bg: '#f9fafb', color: '#1f2937' },
};

const ringDots = [
  { angle: 0, color: '#3b82f6', r: 5.5 },
  { angle: 90, color: '#06b6d4', r: 5.5 },
  { angle: 180, color: '#3b82f6', r: 5 },
  { angle: 270, color: '#06b6d4', r: 5 },
];

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 960);
      if (w >= 960) {
        // Increase base multiplier to give it more room, and allow scaling up to 1.15
        const avail = Math.min(1200, w) * 0.52;
        setScale(Math.min(1.15, avail / SW));
      } else {
        setScale(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nameParts, titles, tagline, resumeUrl, hireEmail, avatarUrl } = profileData;

  return (
    <div className="ap-page">
      <div className="ap-inner">

        {/* ── HERO ───────────────────────────────────────── */}
        <div className="ap-hero">

          {/* LEFT */}
          <div className="ap-left">
            <div className="ap-badge">👋 Hello, I'm</div>

            <h1 className="ap-name">
              {nameParts.first}{nameParts.last}
            </h1>

            <div className="ap-titles">
              {titles.map((t, i) => <span key={i} className="ap-title-line">{t}</span>)}
            </div>

            <p className="ap-tech">Java • Kotlin • Swift • UIKit • MVVM • REST APIs</p>

            <div className="ap-desc">
              <p>I am a Mobile Application Developer with over 3 years of experience building high-performance Android applications and expanding into native iOS development.</p>
            </div>
            <div className="ap-desc">
              <p>I have contributed to <a href="#">40+ production applications</a> across multiple domains including transportation, e-commerce, fintech, and service-based platforms.</p>
            </div>
            <div className="ap-desc">
              <p>I love solving real-world problems through clean architecture, modern technologies, and exceptional user experiences.</p>
            </div>

            <div className="ap-divider" />

            <div className="ap-btns">
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="ap-btn-primary">
                <Download size={16} /> Download Resume
              </a>
              <a href={`mailto:${hireEmail}`} className="ap-btn-secondary">
                <Send size={16} /> Let's Connect
              </a>
            </div>

            <div className="ap-social-label">Follow me on</div>
            <div className="ap-social-row">
              <a href={profileData.socialLinks?.linkedin || "#"} className="ap-social-btn li">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href={profileData.socialLinks?.github || "#"} className="ap-social-btn gh">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href={profileData.socialLinks?.email || "#"} className="ap-social-btn gm">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>
              </a>
              <a href={profileData.socialLinks?.whatsapp || "#"} className="ap-social-btn wa">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>

          </div>

          {/* RIGHT — orbit */}
          <div className="ap-orbit-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: SW, height: SH,
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}>
              <svg
                viewBox={`0 0 ${SW} ${SH}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                overflow="visible"
              >
                <defs>
                  <radialGradient id="ap-ring-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e0e7ff" />
                  <stop offset="55%" stopColor="#ddd6fe" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </radialGradient>
                <filter id="ap-ring-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <clipPath id="ap-photo-clip"><circle cx={CX} cy={CY} r={PR} /></clipPath>
                <path id="ap-op" d={ORBIT_PATH} fill="none" />
              </defs>

              {/* orbit ring */}
              <circle cx={CX} cy={CY} r={OR} fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth={1} />

              {/* static dots */}
              {ringDots.map(({ angle, color, r }) => {
                const [dx, dy] = xyOf(angle);
                return <circle key={angle} cx={dx} cy={dy} r={r} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />;
              })}

              {/* animated dots */}
              <circle r={6.5} fill="#6366f1" opacity={0.80} style={{ filter: 'drop-shadow(0 0 5px #6366f1)' }}>
                <animateMotion dur="9s" repeatCount="indefinite"><mpath href="#ap-op" /></animateMotion>
              </circle>
              <circle r={5} fill="#06b6d4" opacity={0.70} style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }}>
                <animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite"><mpath href="#ap-op" /></animateMotion>
              </circle>

              {/* profile rings */}
              <circle cx={CX} cy={CY} r={PR + 24} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={12} filter="url(#ap-ring-glow)" />
              <circle cx={CX} cy={CY} r={PR + 16} fill="url(#ap-ring-grad)" />
              <circle cx={CX} cy={CY} r={PR + 4} fill="white" />

              {/* photo */}
              <image
                href={avatarUrl}
                x={CX - PR} y={CY - PR} width={PR * 2} height={PR * 2}
                clipPath="url(#ap-photo-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>

            {/* orbit pill cards */}
            {orbitCards.map((card, idx) => (
              <OrbitCard key={card.id} card={card} idx={idx} />
            ))}
            </div>
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────── */}
        <div className="ap-stats">
          {aboutPageData.stats.map((stat, i) => {
            const cfg = STAT_ICONS[stat.icon] || { bg: '#eef2ff', color: '#4f46e5' };
            return (
              <div key={i} className="ap-stat">
                <div className="ap-stat-icon" style={{ background: cfg.bg, color: cfg.color }}>
                  <Ico name={stat.icon} size={22} />
                </div>
                <div className="ap-stat-val">{stat.value}</div>
                <div className="ap-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* ── CORE VALUES ────────────────────────────────── */}
        <h2 className="ap-section-title">Core Values</h2>
        <div className="ap-cv-grid">
          {aboutPageData.coreValues.map((cv, i) => {
            const textKey = cv.color.split(' ').find(c => c.startsWith('text-')) || 'text-blue-600';
            const pal = CV_COLORS[textKey] || { text: '#4f46e5', bg: '#eef2ff' };
            return (
              <div key={i} className="ap-cv-card">
                <div className="ap-cv-icon" style={{ background: pal.bg, color: pal.text }}>
                  <Ico name={cv.icon} size={22} />
                </div>
                <div className="ap-cv-name">{cv.title}</div>
                <div className="ap-cv-desc">{cv.description}</div>
              </div>
            );
          })}
        </div>

        {/* ── WHAT I WORK ON ─────────────────────────────── */}
        <h2 className="ap-section-title">What I Work On</h2>
        <div className="ap-wiwo-grid">
          {aboutPageData.whatIWorkOn.map((item, i) => {
            const textKey = item.color.split(' ').find(c => c.startsWith('text-')) || 'text-blue-500';
            const pal = WIWO_COLORS[textKey] || { text: '#3b82f6', bg: '#eff6ff' };
            return (
              <div key={i} className="ap-wiwo-card">
                <div className="ap-wiwo-icon" style={{ background: pal.bg, color: pal.text }}>
                  <Ico name={item.icon} size={18} />
                </div>
                <span className="ap-wiwo-name">{item.title}</span>
              </div>
            );
          })}
        </div>

        {/* ── CAREER OBJECTIVE ───────────────────────────── */}
        <div className="ap-career">
          <div className="ap-career-icon-wrap">
            <Target size={36} />
          </div>
          <div className="ap-career-left">
            <h3>Career Objective</h3>
            <p>{aboutPageData.careerObjective}</p>
          </div>
          <div className="ap-career-divider" />
          <div className="ap-career-quote">
            <div className="ap-quote-mark">"</div>
            <p>{aboutPageData.quote}</p>
            <div className="ap-quote-close">"</div>
          </div>
        </div>

      </div>
    </div>
  );
}
