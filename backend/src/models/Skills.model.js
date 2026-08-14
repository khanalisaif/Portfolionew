import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Skills & Expertise' },
  sectionSubtitle: { type: String, default: 'Technologies and tools I work with' },
  viewAllUrl: { type: String, default: '/all-skills' },
  technicalSkills: [{
    id: { type: String },
    name: { type: String },
    iconUrl: { type: String },
    description: { type: String },
    level: { type: String },
    levelColor: { type: String },
    platform: { type: String },
    usedFor: { type: String },
    projects: { type: String }
  }],
  skillsOverview: {
    total: { type: String },
    label: { type: String },
    levels: [{
      name: { type: String },
      count: { type: Number },
      color: { type: String }
    }]
  },
  popularTools: [{
    name: { type: String },
    iconUrl: { type: String }
  }],
  learningNow: [{
    name: { type: String },
    iconUrl: { type: String }
  }],
  stats: [{
    value: { type: String },
    label: { type: String }
  }]
}, { timestamps: true });

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;
