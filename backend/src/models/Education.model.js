import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Education' },
  sectionSubtitle: { type: String, default: 'My academic background and achievements' },
  viewAllUrl: { type: String, default: '/all-education' },
  entries: [{
    id: { type: String, required: true },
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
    }]
  }]
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

export default Education;
