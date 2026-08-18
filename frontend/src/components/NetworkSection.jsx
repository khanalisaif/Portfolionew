import { useState, useEffect } from 'react';
import { Users, Globe, Server, Search, Cloud, Smartphone } from 'lucide-react';
import { useFadeUp } from '../hooks/useFadeUp';
import { useBackend } from '../hooks/useBackend';
// Map icon names to Lucide components
const skillIconMap = {
  android: Smartphone,
  apple: Smartphone,
  server: Server,
  search: Search,
  cloud: Cloud,
  globe: Globe,
};

// Convert polar angle to x,y on a circle
// angle 0 = top, clockwise
function polarToXY(angleDeg, radius, cx, cy) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export default function NetworkSection() {
  const { data, loading: contextLoading } = useBackend();
  const networkData = data?.networkData;
  const profileData = data?.profileData;
  const loading = contextLoading || !networkData || !profileData;
  const ref = useFadeUp();

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      // 1000 is the design width for the network section.
      setScale(w < 1000 ? Math.max(0.3, (w - 40) / 1000) : 1);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return null;

  const { sectionTitle, sectionSubtitle, centerLabel, centerSubLabel, centerAvatar, connections } = networkData;

  // SVG canvas dimensions (make it large enough to fit everything)
  const W = 1000;
  const H = 700;
  const cx = W / 2;
  const cy = H / 2;
  const orbitInnerR = 150; // Inner dashed orbit
  const orbitOuterR = 270; // Distance of the nodes

  // Position each connection node
  const nodes = connections.map((c, index) => {
    const angle = connections.length > 0 ? (360 / connections.length) * index : 0;
    return {
      ...c,
      angle,
      ...polarToXY(angle, orbitOuterR, cx, cy),
    };
  });

  return (
    <section id="network" className="section-container" style={{ paddingTop: 0 }}>
      <div ref={ref} className="fade-up">

        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-icon">
              <Users size={22} />
            </div>
            <div>
              <div className="section-title">{sectionTitle}</div>
              <div className="section-subtitle">{sectionSubtitle}</div>
            </div>
          </div>
        </div>

        {/* Network Graph Container (Card Style) */}
        <div className="network-card network-desktop-view" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: H,
          position: 'relative',
        }}>
          <div style={{ position: 'relative', zIndex: 1, width: W, maxWidth: '100%', height: H }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              overflow="visible"
            >
              {/* Inner Orbit circle (dashed) */}
              <circle
                cx={cx} cy={cy} r={orbitInnerR}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={1}
                strokeDasharray="4 6"
              />

              {/* Lines from center to each node */}
              {nodes.map(node => {
                const nodeColor = node.ringColor || node.skillColor || '#6366f1';
                return (
                  <line
                    key={`line-${node.id}`}
                    x1={cx} y1={cy}
                    x2={node.x} y2={node.y}
                    stroke={nodeColor}
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                );
              })}

              {/* Colored dot on inner orbit intersection */}
              {nodes.map(node => {
                const nodeColor = node.ringColor || node.skillColor || '#6366f1';
                const dot = polarToXY(node.angle, orbitInnerR, cx, cy);
                return (
                  <circle
                    key={`dot-${node.id}`}
                    cx={dot.x} cy={dot.y} r={4.5}
                    fill={nodeColor}
                  />
                );
              })}

              {/* Center: Me */}
              <foreignObject x={cx - 150} y={cy - 150} width={300} height={300} style={{ overflow: 'visible' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Huge soft glow behind */}
                  <div style={{
                    position: 'absolute',
                    width: 250, height: 250,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0) 70%)',
                    zIndex: 0
                  }} />
                  {/* Profile image with white border */}
                  <img src={profileData.avatarUrl || centerAvatar} alt="Me" style={{
                    width: 170, height: 170,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    zIndex: 1,
                    border: '4px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }} />
                  {/* "Me" pill card overlapping the bottom of the image */}
                  <div style={{
                    position: 'absolute',
                    bottom: 30,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    padding: '8px 24px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    zIndex: 2,
                    textAlign: 'center',
                    border: '1px solid #f8fafc'
                  }}>
                    <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: 16 }}>{centerLabel}</div>
                    <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, marginTop: 1 }}>{centerSubLabel}</div>
                  </div>
                </div>
              </foreignObject>

              {/* Connection nodes (White cards) */}
              {nodes.map(node => {
                const SkillIcon = skillIconMap[node.skillIcon] || Globe;
                // Determine layout side based on angle. Left: >180 and <360. Right: 0-180.
                const isLeft = node.angle > 180 && node.angle < 360;
                
                const boxW = 280;
                const boxH = 74;
                const avatarR = 37;
                const avatarX = node.x;
                const avatarY = node.y;

                const fX = isLeft ? avatarX - boxW + avatarR : avatarX - avatarR;
                const fY = avatarY - boxH / 2;
                
                const nodeColor = node.ringColor || node.skillColor || '#6366f1';

                return (
                  <g key={node.id} id={`network-node-${node.id}`}>
                    <foreignObject x={fX} y={fY} width={boxW} height={boxH} style={{ overflow: 'visible' }}>
                      <div style={{
                        width: boxW, height: boxH,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: isLeft ? 'row-reverse' : 'row',
                        backgroundColor: 'white',
                        borderRadius: boxH / 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                      }}>
                        {/* Avatar */}
                        <div style={{
                          width: boxH, height: boxH,
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          border: `3px solid ${nodeColor}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          zIndex: 10, flexShrink: 0,
                          boxSizing: 'border-box'
                        }}>
                          {node.avatar ? (
                            <img src={node.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                          ) : (
                            <span style={{ color: nodeColor, fontWeight: 800, fontSize: 24 }}>{node.name?.[0] || '?'}</span>
                          )}
                        </div>

                        {/* Card Body */}
                        <div style={{
                          flex: 1,
                          padding: isLeft ? '0 16px 0 24px' : '0 24px 0 16px',
                          display: 'flex', flexDirection: 'column', justifyContent: 'center',
                          alignItems: isLeft ? 'flex-end' : 'flex-start',
                        }}>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 15 }}>{node.name}</div>
                          <div style={{ color: '#64748b', fontSize: 12.5, marginTop: 1 }}>{node.role}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: nodeColor, fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                            <SkillIcon size={13} strokeWidth={2.5} /> {node.skill}
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="network-mobile-view">

          {/* ── Center "Me" with orbit ring — matching hero mobile style ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative', width: 180, height: 180 }}>
              <svg viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <radialGradient id="net-mob-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ede9fe" />
                    <stop offset="55%" stopColor="#ddd6fe" />
                    <stop offset="100%" stopColor="#c4b5fd" />
                  </radialGradient>
                  <filter id="net-mob-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <clipPath id="net-mob-clip">
                    <circle cx="90" cy="90" r="68" />
                  </clipPath>
                </defs>
                <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="8" filter="url(#net-mob-glow)" />
                <circle cx="90" cy="90" r="78" fill="url(#net-mob-grad)" className="profile-ring-anim" />
                <circle cx="90" cy="90" r="71" fill="white" />
                <image href={profileData.avatarUrl || centerAvatar || undefined} x="22" y="22" width="136" height="136" clipPath="url(#net-mob-clip)" preserveAspectRatio="xMidYMid slice" />
                {/* Accent dots */}
                <g style={{ transformOrigin: '90px 90px', animation: 'mobileOrbitSpin 10s linear infinite' }}>
                  <circle cx="90" cy="6" r="4" fill="#a855f7" style={{ filter: 'drop-shadow(0 0 4px #a855f7)' }} />
                  <circle cx="174" cy="90" r="4" fill="#6366f1" style={{ filter: 'drop-shadow(0 0 4px #6366f1)' }} />
                  <circle cx="90" cy="174" r="3.5" fill="#a855f7" style={{ filter: 'drop-shadow(0 0 3px #a855f7)' }} />
                  <circle cx="6" cy="90" r="3.5" fill="#6366f1" style={{ filter: 'drop-shadow(0 0 3px #6366f1)' }} />
                </g>
              </svg>
            </div>
            {/* "Me" label card */}
            <div style={{ background: 'white', borderRadius: 14, padding: '10px 28px', boxShadow: '0 4px 16px rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.12)', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#7c3aed' }}>{centerLabel}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{centerSubLabel}</div>
            </div>
          </div>

          {/* Divider label */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', margin: '4px 0' }}>
            My Network
          </div>

          {/* Connections — styled like hero orbit cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {connections.map(node => {
              const nodeColor = node.ringColor || node.skillColor || '#6366f1';
              const SkillIcon = skillIconMap[node.skillIcon] || Globe;
              return (
                <div
                  key={node.id}
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 40,
                    padding: '8px 16px 8px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    boxShadow: '0 4px 20px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.95)'
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 58, height: 58, borderRadius: '50%',
                      border: `3px solid ${nodeColor}`,
                      background: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, fontWeight: 800, color: nodeColor,
                      boxSizing: 'border-box'
                    }}>
                      {node.avatar ? <img src={node.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="" /> : node.name?.[0] || '?'}
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{node.name}</div>
                    <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 2, lineHeight: 1.3 }}>{node.role}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, fontSize: 12, fontWeight: 700, color: nodeColor }}>
                      <SkillIcon size={13} strokeWidth={2.5} />
                      {node.skill}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
