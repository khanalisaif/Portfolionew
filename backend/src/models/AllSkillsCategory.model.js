import mongoose from 'mongoose';

const allSkillsCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  count: { type: Number, default: 0 }
}, { timestamps: true });

const AllSkillsCategory = mongoose.model('AllSkillsCategory', allSkillsCategorySchema);

export default AllSkillsCategory;
