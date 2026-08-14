import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Experience' },
  sectionSubtitle: { type: String, default: 'My professional journey' },
  entries: [{
    id: { type: String },
    role: { type: String },
    company: { type: String },
    location: { type: String },
    period: { type: String },
    description: { type: String }
  }]
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
