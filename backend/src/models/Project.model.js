import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  badge: { type: String, default: '' },
  name: { type: String, required: true },
  verified: { type: Boolean, default: false },
  liveBadge: { type: String, default: '' },
  category: { type: String, default: 'other' },
  description: { type: String, default: '' },
  tags: [{ type: String }],
  stats: [{
    label: { type: String },
    value: { type: String },
    isStar: { type: Boolean, default: false },
    icon: { type: String }
  }],
  liveUrl: { type: String, default: '' },
  storeUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  featuredType: { type: String, default: 'none' }, // 'current', 'top', 'none'
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
