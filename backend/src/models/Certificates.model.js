import mongoose from 'mongoose';

const certificatesSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Certifications' },
  sectionSubtitle: { type: String, default: 'Professional certifications and licenses' },
  stats: [{
    label: { type: String },
    value: { type: String }
  }],
  entries: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    issuer: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  }]
}, { timestamps: true });

const Certificates = mongoose.model('Certificates', certificatesSchema);

export default Certificates;
