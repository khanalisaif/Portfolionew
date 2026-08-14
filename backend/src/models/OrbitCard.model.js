import mongoose from 'mongoose';

const orbitCardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  sublabel: { type: String, default: '' },
  iconBg: { type: String, default: 'from-blue-500 to-indigo-600' },
  icon: { type: String, default: 'star' },
  customIconUrl: { type: String, default: '' },
  position: { type: String, required: true },
  items: [{ type: String }],
  viewAllLabel: { type: String, default: '' },
  viewAllUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const OrbitCard = mongoose.model('OrbitCard', orbitCardSchema);

export default OrbitCard;
