import mongoose from 'mongoose';

const networkSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'My Network' },
  sectionSubtitle: { type: String, default: 'Connections and collaborations in the industry' },
  centerLabel: { type: String, default: 'Me' },
  centerSubLabel: { type: String, default: 'Developer' },
  centerAvatar: { type: String, default: '' },
  connections: [{
    id: { type: String },
    name: { type: String },
    role: { type: String },
    avatar: { type: String },
    skill: { type: String },
    skillIcon: { type: String },
    customSkillIconUrl: { type: String, default: '' },
    angle: { type: Number, default: 0 }
  }]
}, { timestamps: true });

const Network = mongoose.model('Network', networkSchema);

export default Network;
