import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Send, ChevronDown, ChevronRight, ArrowRight,
  FileText, Users, Code2, Trophy, Briefcase, Dumbbell
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// ── Icon mapping ──────────────────────────────────
const ICONS = {
  certificate: FileText,
  network: Users,
  code: Code2,
  trophy: Trophy,
  briefcase: Briefcase,
  dumbbell: Dumbbell,
};

// ── Icon gradient colors (matching reference image) ──
const GRADIENTS = {
  certificates: { c1: '#60a5fa', c2: '#1d4ed8' },   // blue
  networks: { c1: '#22d3ee', c2: '#0284c7' },   // cyan
  skills: { c1: '#6366f1', c2: '#7c3aed' },   // indigo-purple (</>)
  experience: { c1: '#a855f7', c2: '#db2777' },   // purple-pink (trophy)
  projects: { c1: '#8b5cf6', c2: '#6d28d9' },   // violet (briefcase)
  achievements: { c1: '#3b82f6', c2: '#4338ca' },   // blue-indigo (dumbbell)
};

// ── SVG canvas dimensions ─────────────────────────
const SW = 900, SH = 540;
const CX = SW / 2;   // 450
const CY = 265;
const OR = 210;      // orbit radius
const PR = 108;      // profile photo radius

// ── Card layout: angle from top (0°), clockwise ──
const LAYOUT = [
  { id: 'certificates', angle: 330, side: 'left' },
  { id: 'networks', angle: 30, side: 'right' },
  { id: 'skills', angle: 270, side: 'left' },
  { id: 'experience', angle: 90, side: 'right' },
  { id: 'projects', angle: 210, side: 'left' },
  { id: 'achievements', angle: 150, side: 'right' },
];

// ── Helpers ───────────────────────────────────────
function xy(deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [CX + OR * Math.cos(rad), CY + OR * Math.sin(rad)];
}

// Orbit path for animateMotion (full clockwise circle)

const ORBIT_PATH = `M ${CX} ${CY - OR} A ${OR} ${OR} 0 0 1 ${CX} ${CY + OR} A ${OR} ${OR} 0 0 1 ${CX} ${CY - OR}`;

const CARD_W = 200;

// ── Mobile orbit card (inline accordion expand) ───────────────
function MobileOrbitCard({ card }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[card.icon] || FileText;
  const g = GRADIENTS[card.id] || GRADIENTS.skills;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: 16,
      border: `1.5px solid ${open ? g.c1 + '55' : 'rgba(255,255,255,0.95)'}`,
      overflow: 'hidden',
      boxShadow: open
        ? `0 8px 32px ${g.c1}22, 0 2px 8px rgba(0,0,0,0.06)`
        : '0 4px 20px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.04)',
      transition: 'border-color 0.25s, box-shadow 0.25s',
    }}>
      {/* Header row — always visible */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: `linear-gradient(135deg, ${g.c1}, ${g.c2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', flexShrink: 0,
        }}>
          {card.customIconUrl ? (
            <img src={card.customIconUrl} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
          ) : (
            <Icon size={22} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>{card.label}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, lineHeight: 1.3 }}>{card.sublabel}</div>
        </div>
        <ChevronRight
          size={16}
          style={{
            color: open ? g.c1 : '#94a3b8',
            flexShrink: 0,
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s, color 0.25s',
          }}
        />
      </div>

      {/* Expanded content — slides down */}
      {open && (
        <div style={{
          padding: '0 16px 16px',
          animation: 'expandCard 0.25s ease',
        }}>
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 12 }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {card.items?.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#334155', fontWeight: 500, textAlign: 'left' }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${g.c1}, ${g.c2})`,
                  flexShrink: 0,
                }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to={card.viewAllUrl}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: `linear-gradient(135deg, ${g.c1}, ${g.c2})`,
              color: 'white', borderRadius: 10,
              padding: '9px 14px',
              fontSize: 12, fontWeight: 700,
              textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            {card.viewAllLabel} <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Single orbit card component ───────────────────
function OrbitCard({ card, idx }) {
  const [open, setOpen] = useState(false);
  const layout = LAYOUT.find(l => l.id === card.id);
  if (!layout) return null;
  const Icon = ICONS[card.icon] || FileText;
  const g = GRADIENTS[card.id] || GRADIENTS.skills;
  const [ox, oy] = xy(layout.angle);

  // Expanded card dimensions
  const EXP_W = 210;
  const EXP_H = 135;

  return (
    <div
      id={`orbit-card-${card.id}`}
      style={{
        position: 'absolute',
        zIndex: open ? 30 : 20,
        // The container itself doesn't need to be placed, we place absolute children
      }}
    >
      {open ? (
        /* ── Expanded State ── */
        <>
          {/* 1. The Icon exactly on the orbit */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              left: ox - 26,
              top: oy - 26,
              width: 52, height: 52,
              borderRadius: '50%',
              background: `linear-gradient(135deg,${g.c1},${g.c2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              border: '4px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              zIndex: 31,
              animation: 'expandIcon 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {card.customIconUrl ? (
              <img src={card.customIconUrl} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            ) : (
              <Icon size={20} />
            )}
          </div>

          {/* 2. The Speech Bubble Card */}
          <div
            style={{
              position: 'absolute',
              left: layout.side === 'left' ? ox - EXP_W - 40 : ox + 40,
              top: oy - EXP_H / 2,
              width: EXP_W,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: 16,
              border: '1.5px solid rgba(255,255,255,0.95)',
              padding: '16px 18px',
              boxShadow: '0 16px 48px rgba(99,102,241,0.18), 0 4px 16px rgba(0,0,0,0.07)',
              animation: 'expandCard 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* The tail/pointer */}
            <div style={{
              position: 'absolute',
              top: '50%',
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

            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>
              {card.label}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
              {card.items?.map((item, i) => (
                <li key={i} style={{ fontSize: 12, color: '#475569', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#6366f1', fontSize: 16, lineHeight: 1 }}>•</span>{item}
                </li>
              ))}
            </ul>
            <Link
              to={card.viewAllUrl}
              onClick={e => { e.stopPropagation(); setOpen(false); }}
              style={{ fontSize: 12, fontWeight: 600, color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {card.viewAllLabel}&nbsp;<ArrowRight size={11} />
            </Link>
          </div>
        </>
      ) : (
        /* ── Collapsed State (Pill) ── */
        <div
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            left: layout.side === 'left' ? ox - CARD_W - 24 : ox + 24,
            top: oy - 32,
            width: CARD_W,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.86)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 30, // more rounded like pill in Image 1
            border: '1.5px solid rgba(255,255,255,0.95)',
            padding: '8px 14px 8px 8px',
            boxShadow: '0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            animation: `cardFloat 3.5s ease-in-out infinite`,
            animationDelay: `${idx * 0.45}s`,
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `linear-gradient(135deg,${g.c1},${g.c2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', flexShrink: 0,
          }}>
            {card.customIconUrl ? (
              <img src={card.customIconUrl} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
            ) : (
              <Icon size={22} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>{card.label}</div>
            <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.35, marginTop: 2 }}>{card.sublabel}</div>
          </div>
          <ChevronRight size={14} style={{ color: '#94a3b8', flexShrink: 0, marginLeft: 'auto' }} />
        </div>
      )}
    </div>
  );
}

// ── Main Hero Section ─────────────────────────────
export default function HeroSection() {
  const { data: { profileData, orbitCards } } = useAdmin();
  const { nameParts, titles, tagline, resumeUrl, hireEmail, avatarUrl } = profileData;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // 900 is the design width. We leave some padding (approx 40px).
      const w = window.innerWidth;
      setScale(w < 900 ? Math.max(0.4, (w - 40) / 900) : 1);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Profile avatar from data.jsx

  // 4 static ring dots at cardinal directions
  const ringDots = [
    { angle: 0, color: '#3b82f6', r: 5.5 },
    { angle: 90, color: '#06b6d4', r: 5.5 },
    { angle: 180, color: '#3b82f6', r: 5 },
    { angle: 270, color: '#06b6d4', r: 5 },
  ];

  return (
    <section className="hero-section" id="hero">
      {/* Animated background restricted to Hero */}
      <div className="portfolio-bg" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── Background decorative SVG (crosses, triangles, diamonds) ── */}
      <svg
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}
      >
        {/* plus/cross signs */}
        {[[110, 80], [1380, 110], [1460, 420], [140, 510], [780, 60], [880, 540]].map(([px, py], i) => (
          <g key={i} transform={`translate(${px},${py})`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" />
          </g>
        ))}
        {/* triangles */}
        {[[90, 400], [1440, 300], [1220, 500]].map(([px, py], i) => (
          <polygon key={i} points={`${px},${py - 13} ${px - 11},${py + 8} ${px + 11},${py + 8}`}
            fill="none" stroke="rgba(148,163,184,0.32)" strokeWidth="1.4" />
        ))}
        {/* diamonds */}
        {[[1400, 140], [165, 560]].map(([px, py], i) => (
          <polygon key={i} points={`${px},${py - 11} ${px + 9},${py} ${px},${py + 11} ${px - 9},${py}`}
            fill="none" stroke="rgba(148,163,184,0.32)" strokeWidth="1.4" />
        ))}
        {/* small dots */}
        {[[60, 200], [1490, 220], [1470, 490], [80, 570], [1300, 60]].map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r={3} fill="rgba(148,163,184,0.28)" />
        ))}
      </svg>

      {/* --- DESKTOP VIEW --- */}
      <div className="hero-desktop-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* ── Orbit wrapper ── */}
        <div style={{ position: 'relative', width: SW, maxWidth: '100%', height: SH, flexShrink: 0, zIndex: 1 }}>

          {/* SVG: orbit ring + animated dots + profile photo */}
          <svg
            viewBox={`0 0 ${SW} ${SH}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            overflow="visible"
          >
            <defs>
              {/* Profile ring gradient */}
              <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="55%" stopColor="#ddd6fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </radialGradient>
              {/* Glow filter for profile ring */}
              <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Photo clip */}
              <clipPath id="photo-clip">
                <circle cx={CX} cy={CY} r={PR} />
              </clipPath>
              {/* Orbit path for animateMotion */}
              <path id="op" d={ORBIT_PATH} fill="none" />
            </defs>

            {/* ── Orbit ring (thin solid) ── */}
            <circle
              cx={CX} cy={CY} r={OR}
              fill="none"
              stroke="rgba(148,163,184,0.25)"
              strokeWidth={1}
            />

            {/* ── Static ring dots ── */}
            {ringDots.map(({ angle, color, r }) => {
              const [dx, dy] = xy(angle);
              return (
                <circle key={angle} cx={dx} cy={dy} r={r}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                />
              );
            })}

            {/* ── Animated dot 1 (indigo, clockwise) ── */}
            <circle r={6.5} fill="#6366f1" opacity={0.80} style={{ filter: 'drop-shadow(0 0 5px #6366f1)' }}>
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#op" />
              </animateMotion>
            </circle>

            {/* ── Animated dot 2 (cyan, offset half period) ── */}
            <circle r={5} fill="#06b6d4" opacity={0.70} style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }}>
              <animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite">
                <mpath href="#op" />
              </animateMotion>
            </circle>

            {/* ── Profile photo outer white ring (glow) ── */}
            <circle cx={CX} cy={CY} r={PR + 24}
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={12}
              filter="url(#ring-glow)"
            />

            {/* ── Profile photo gradient ring ── */}
            <circle cx={CX} cy={CY} r={PR + 16}
              fill="url(#ring-grad)"
              className="profile-ring-anim"
            />

            {/* ── Inner white circle ── */}
            <circle cx={CX} cy={CY} r={PR + 4} fill="white" />

            {/* ── Profile photo ── */}
            <image
              href={avatarUrl}
              x={CX - PR} y={CY - PR}
              width={PR * 2} height={PR * 2}
              clipPath="url(#photo-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>

          {/* ── HTML Cards (overlaid) ── */}
          {orbitCards.map((card, idx) => (
            <OrbitCard key={card.id} card={card} idx={idx} />
          ))}
        </div>

        {/* ── Hero Text ── */}
        <div className="hero-text" style={{ zIndex: 5 }}>
          <h1 className="hero-name">
            <span className="hero-name-first">{nameParts.first}</span>
            <span className="hero-name-last">{nameParts.last}</span>
          </h1>

          <div className="hero-titles">
            {titles.map((title, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {i > 0 && <span className="hero-titles-sep">•</span>}
                {title}
              </span>
            ))}
          </div>

          <p className="hero-tagline">{tagline}</p>

          <div className="hero-buttons">
            <a href={resumeUrl} className="btn-outline" id="download-resume-btn">
              <Download size={16} /> Download Resume
            </a>
            <a href={`mailto:${hireEmail}`} className="btn-primary" id="hire-me-btn">
              <Send size={16} /> Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="hero-mobile-view">

        {/* ── Profile Photo with orbit ring (matching desktop style) ── */}
        <div style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
          <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <radialGradient id="mob-ring-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="55%" stopColor="#ddd6fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </radialGradient>
              <filter id="mob-ring-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="mob-photo-clip">
                <circle cx="100" cy="100" r="78" />
              </clipPath>
            </defs>
            <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="8" filter="url(#mob-ring-glow)" />
            <circle cx="100" cy="100" r="89" fill="url(#mob-ring-grad)" className="profile-ring-anim" />
            <circle cx="100" cy="100" r="81" fill="white" />
            <image href={avatarUrl} x="22" y="22" width="156" height="156" clipPath="url(#mob-photo-clip)" preserveAspectRatio="xMidYMid slice" />
            <g style={{ transformOrigin: '100px 100px', animation: 'mobileOrbitSpin 10s linear infinite' }}>
              <circle cx="100" cy="5" r="4.5" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }} />
              <circle cx="195" cy="100" r="4.5" fill="#06b6d4" style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }} />
              <circle cx="100" cy="195" r="4" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 3px #3b82f6)' }} />
              <circle cx="5" cy="100" r="4" fill="#06b6d4" style={{ filter: 'drop-shadow(0 0 3px #06b6d4)' }} />
            </g>
          </svg>
        </div>

        {/* Hero Text Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', zIndex: 10 }}>
          {/* Name */}
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, textAlign: 'center' }}>
            <span style={{ color: '#6366f1' }}>{nameParts.first}</span>
            <span style={{ color: '#1e293b' }}> {nameParts.last}</span>
          </h1>

          {/* Titles */}
          <div style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {titles.map((title, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ color: '#cbd5e1' }}>•</span>}
                {title}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.65, padding: '0 16px', margin: 0, textAlign: 'center' }}>{tagline}</p>
        </div>

        {/* Orbit Cards — inline accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px', width: '100%', marginTop: 8 }}>
          {orbitCards.map((card, idx) => (
            <MobileOrbitCard key={card.id} card={card} />
          ))}
        </div>

        {/* Buttons (inlined to guarantee visibility) */}
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 14, padding: '0 16px', marginTop: 24, justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          <a href={resumeUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 14px', borderRadius: 50, border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', background: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>
            <Download size={16} /> Download Resume
          </a>
          <a href={`mailto:${hireEmail}`} style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 14px', borderRadius: 50, border: 'none', fontSize: '0.85rem', fontWeight: 600, color: 'white', background: 'linear-gradient(135deg, #6366f1, #4338ca)', textDecoration: 'none', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}>
            <Send size={16} /> Hire Me
          </a>
        </div>
      </div>

      {/* ── Scroll Down ── */}
      <a href="#education" className="scroll-down" id="scroll-down-btn">
        <span>SCROLL DOWN</span>
        <div className="scroll-down-circle">
          <ChevronDown size={16} />
        </div>
      </a>
    </section>
  );
}
