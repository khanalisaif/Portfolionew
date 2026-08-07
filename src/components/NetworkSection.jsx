import { Users, Globe, Server, Search, Cloud, Smartphone } from 'lucide-react';
import { networkData, profileData } from '../data';
import { useFadeUp } from '../hooks/useFadeUp';

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
  const ref = useFadeUp();
  const { sectionTitle, sectionSubtitle, centerLabel, centerSubLabel, centerAvatar, connections } = networkData;

  // SVG canvas dimensions (make it large enough to fit everything)
  const W = 1000;
  const H = 700;
  const cx = W / 2;
  const cy = H / 2;
  const orbitInnerR = 150; // Inner dashed orbit
  const orbitOuterR = 270; // Distance of the nodes

  // Position each connection node
  const nodes = connections.map(c => ({
    ...c,
    ...polarToXY(c.angle, orbitOuterR, cx, cy),
  }));

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
        <div className="network-card" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 650,
          position: 'relative',
        }}>
          <div style={{ position: 'relative', zIndex: 1, width: W, maxWidth: '100%' }}>
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
              {nodes.map(node => (
                <line
                  key={`line-${node.id}`}
                  x1={cx} y1={cy}
                  x2={node.x} y2={node.y}
                  stroke={node.ringColor}
                  strokeWidth={1}
                  opacity={0.5}
                />
              ))}

              {/* Colored dot on inner orbit intersection */}
              {nodes.map(node => {
                const dot = polarToXY(node.angle, orbitInnerR, cx, cy);
                return (
                  <circle
                    key={`dot-${node.id}`}
                    cx={dot.x} cy={dot.y} r={4.5}
                    fill={node.ringColor}
                  />
                );
              })}

              {/* Center: Me */}
              <defs>
                <clipPath id="clip-center">
                  <circle cx={cx} cy={cy} r={85} />
                </clipPath>
              </defs>
              {/* Center huge soft glow */}
              <circle cx={cx} cy={cy} r={105}
                fill="none"
                stroke="rgba(168,85,247,0.3)"
                strokeWidth={20}
                style={{ filter: 'blur(16px)' }}
              />
              <circle cx={cx} cy={cy} r={87} fill="white" />
              <image
                href={centerAvatar}
                x={cx - 85} y={cy - 85}
                width={170} height={170}
                clipPath="url(#clip-center)"
                preserveAspectRatio="xMidYMid slice"
              />
              {/* "Me" card overlapping bottom */}
              <rect
                x={cx - 55} y={cy + 70}
                width={110} height={46}
                rx={12} ry={12}
                fill="white"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.06))' }}
              />
              <text x={cx} y={cy + 90} textAnchor="middle" fontSize="15" fontWeight="800" fill="#7c3aed" fontFamily="Inter, sans-serif">
                {centerLabel}
              </text>
              <text x={cx} y={cy + 104} textAnchor="middle" fontSize="10.5" fill="#94a3b8" fontFamily="Inter, sans-serif">
                {centerSubLabel}
              </text>

              {/* Connection nodes (White cards) */}
              {nodes.map(node => {
                const SkillIcon = skillIconMap[node.skillIcon] || Globe;
                // Determine layout side based on angle. Left: >180 and <360. Right: 0-180.
                const isLeft = node.angle > 180 && node.angle < 360;
                const clipId = `clip-${node.id}`;
                
                const cardW = 220;
                const cardH = 74;
                const avatarR = 27;
                const avatarX = node.x;
                const avatarY = node.y;

                // Position card so the avatar overlaps its edge slightly (avatar sits on the inner edge of the card)
                // If it's a left node, the avatar is on the right side of the card.
                // If it's a right node (or top/bottom right), the avatar is on the left side of the card.
                const cardX = isLeft ? avatarX - cardW + avatarR : avatarX - avatarR;
                const cardY = avatarY - cardH / 2;

                return (
                  <g key={node.id} id={`network-node-${node.id}`}>
                    {/* Card background */}
                    <rect
                      x={cardX} y={cardY}
                      width={cardW} height={cardH}
                      rx={20} ry={20}
                      fill="white"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.06))' }}
                    />

                    {/* Name */}
                    <text
                      x={isLeft ? cardX + cardW - avatarR * 2 - 16 : cardX + avatarR * 2 + 16}
                      y={cardY + 26}
                      textAnchor={isLeft ? 'end' : 'start'}
                      fontSize="13" fontWeight="800" fill="#0f172a"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.name}
                    </text>

                    {/* Role */}
                    <text
                      x={isLeft ? cardX + cardW - avatarR * 2 - 16 : cardX + avatarR * 2 + 16}
                      y={cardY + 42}
                      textAnchor={isLeft ? 'end' : 'start'}
                      fontSize="10" fill="#64748b"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.role}
                    </text>

                    {/* Skill chip text & icon */}
                    <g transform={`translate(${isLeft ? cardX + cardW - avatarR * 2 - 16 - (node.skill.length * 6 + 18) : cardX + avatarR * 2 + 16}, ${cardY + 48})`}>
                      <svg width="14" height="14" fill="none" stroke={node.skillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
                        <SkillIcon size={12} />
                      </svg>
                      <text
                        x="18"
                        y="10"
                        textAnchor="start"
                        fontSize="10" fontWeight="700"
                        fill={node.skillColor}
                        fontFamily="Inter, sans-serif"
                      >
                        {node.skill}
                      </text>
                    </g>

                    {/* Avatar circle with colored stroke */}
                    <defs>
                      <clipPath id={clipId}>
                        <circle cx={avatarX} cy={avatarY} r={avatarR} />
                      </clipPath>
                    </defs>
                    <circle cx={avatarX} cy={avatarY} r={avatarR + 2}
                      fill="white"
                    />
                    <circle cx={avatarX} cy={avatarY} r={avatarR + 1}
                      fill="none"
                      stroke={node.ringColor}
                      strokeWidth={2.5}
                    />
                    <image
                      href={node.avatar}
                      x={avatarX - avatarR} y={avatarY - avatarR}
                      width={avatarR * 2} height={avatarR * 2}
                      clipPath={`url(#${clipId})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
