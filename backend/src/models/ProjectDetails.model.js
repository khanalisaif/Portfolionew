import mongoose from 'mongoose';

const projectDetailsSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },

  // Basic info (synced from projects list)
  name:        { type: String, default: '' },
  badge:       { type: String, default: '' },
  description: { type: String, default: '' },
  mainImage:   { type: String, default: '' },
  verified:    { type: Boolean, default: false },
  liveBadge:   { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  storeUrl:    { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  category:    { type: String, default: '' },

  // Tags & tech stack
  tags: [{ type: String }],
  techStack: [{
    name: { type: String },
    icon: { type: String }
  }],

  // Stats shown on the details hero
  stats: [{
    icon:         { type: String, default: 'star' },
    label:        { type: String, default: '' },
    value:        { type: String, default: '' },
    isStar:       { type: Boolean, default: false },
    customIconUrl:{ type: String, default: '' }
  }],

  // Overview section
  overviewText:   { type: String, default: '' },
  overviewPoints: [{ type: String }],

  // Meta table (right side of overview)
  metaTable: [{
    label: { type: String },
    value: { type: String },
    icon:  { type: String, default: 'code' }
  }],

  // Key highlights cards
  highlights: [{
    title: { type: String },
    desc:  { type: String },
    icon:  { type: String, default: 'zap' }
  }],

  // Screenshots gallery
  screenshots: [{ type: String }],

}, { timestamps: true });

const ProjectDetails = mongoose.model('ProjectDetails', projectDetailsSchema);

export default ProjectDetails;
