import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  nameParts: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  titles: [{ type: String }],
  tagline: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  hireEmail: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    email: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
