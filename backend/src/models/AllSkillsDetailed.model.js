import mongoose from 'mongoose';

const allSkillsDetailedSchema = new mongoose.Schema({
  skillId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  badge: { type: String, default: '' },
  description: { type: String, default: '' },
  meta: [{
    label: { type: String },
    value: { type: String },
    icon: { type: String },
    customIconUrl: { type: String, default: '' }
  }],
  breakdownCount: { type: Number, default: 0 },
  breakdownItems: [{
    id: { type: String },
    title: { type: String },
    level: { type: String },
    description: { type: String },
    points: [{ type: String }],
    experience: { type: String }
  }]
}, { timestamps: true });

const AllSkillsDetailed = mongoose.model('AllSkillsDetailed', allSkillsDetailedSchema);

export default AllSkillsDetailed;
