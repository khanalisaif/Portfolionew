import { useState } from 'react';
import {
  FileText, Users, Code2, Trophy, Briefcase, Dumbbell,
  ChevronRight, ArrowRight, Check, Network
} from 'lucide-react';

const iconMap = {
  certificate: FileText,
  network: Network,
  code: Code2,
  trophy: Trophy,
  briefcase: Briefcase,
  dumbbell: Dumbbell,
};

const positionClass = {
  'top-left':  'pos-top-left',
  'top-right': 'pos-top-right',
  'mid-left':  'pos-mid-left',
  'mid-right': 'pos-mid-right',
  'bot-left':  'pos-bot-left',
  'bot-right': 'pos-bot-right',
};

function OrbitCardCollapsed({ card, onClick }) {
  const Icon = iconMap[card.icon] || FileText;
  return (
    <div className="orbit-card-collapsed" onClick={onClick} id={`card-collapsed-${card.id}`}>
      <div className={`orbit-card-icon bg-gradient-to-br ${card.iconBg}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="orbit-card-label">{card.label}</div>
        <div className="orbit-card-sublabel">{card.sublabel}</div>
      </div>
      <ChevronRight size={14} className="orbit-card-chevron" />
    </div>
  );
}

function OrbitCardExpanded({ card, onClick }) {
  const Icon = iconMap[card.icon] || FileText;
  return (
    <div className="orbit-card-expanded" onClick={onClick} id={`card-expanded-${card.id}`}>
      <div className="orbit-card-expanded-header">
        <div className={`orbit-card-icon bg-gradient-to-br ${card.iconBg}`}>
          <Icon size={18} />
        </div>
        <div className="orbit-card-expanded-title">{card.label}</div>
      </div>
      <ul className="orbit-card-items">
        {card.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <a href={card.viewAllUrl} className="orbit-card-view-all" onClick={e => e.stopPropagation()}>
        {card.viewAllLabel} <ArrowRight size={12} />
      </a>
    </div>
  );
}

export default function OrbitCard({ card }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`orbit-card-wrapper ${positionClass[card.position]}`}>
      {expanded
        ? <OrbitCardExpanded card={card} onClick={() => setExpanded(false)} />
        : <OrbitCardCollapsed card={card} onClick={() => setExpanded(true)} />
      }
    </div>
  );
}
