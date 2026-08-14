import mongoose from 'mongoose';

const projectDetailsSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  category: { type: String, default: '' },
  date: { type: String, default: '' },
  role: { type: String, default: '' },
  about: { type: String, default: '' },
  technologies: [{
    name: { type: String },
    icon: { type: String }
  }],
  features: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String }
  }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  appStoreUrl: { type: String, default: '' },
  playStoreUrl: { type: String, default: '' }
}, { timestamps: true });

const ProjectDetails = mongoose.model('ProjectDetails', projectDetailsSchema);

export default ProjectDetails;
