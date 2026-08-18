import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  careerObjective: { type: String, default: '' },
  quote: { type: String, default: '' },
  techStack: { type: String, default: '' },
  descriptions: { type: [String], default: [] },
  stats: [{
    value: { type: String },
    label: { type: String },
    icon: { type: String },
    customIconUrl: { type: String, default: '' }
  }],
  coreValues: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    customIconUrl: { type: String, default: '' },
    color: { type: String, default: '' }
  }],
  whatIWorkOn: [{
    title: { type: String },
    icon: { type: String },
    customIconUrl: { type: String, default: '' },
    color: { type: String, default: '' }
  }]
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);

export default About;
