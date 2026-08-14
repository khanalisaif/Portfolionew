import mongoose from 'mongoose';

const allEducationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  universityName: { type: String, required: true },
  location: { type: String, default: '' },
  universityImage: { type: String, default: '' },
  universityLogo: { type: String, default: '' },
  degree: { type: String, default: '' },
  type: { type: String, default: '' },
  period: { type: String, default: '' },
  description: { type: String, default: '' },
  stats: [{
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    sub: { type: String, default: '' }
  }],
  keyAchievements: [{ type: String }],
  certificates: [{
    title: { type: String, default: '' },
    year: { type: String, default: '' },
    image: { type: String, default: '' }
  }],
  isPinned: { type: Boolean, default: false }
}, { timestamps: true });

const AllEducation = mongoose.model('AllEducation', allEducationSchema);

export default AllEducation;
