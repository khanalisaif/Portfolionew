import mongoose from 'mongoose';

const projectsPageSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'All Projects' },
  sectionSubtitle: { type: String, default: 'A comprehensive list of my work' },
  tabs: [{
    id: { type: String },
    label: { type: String }
  }],
  githubUrl: { type: String, default: '' },
  githubLabel: { type: String, default: 'View my GitHub Profile' }
}, { timestamps: true });

const ProjectsPage = mongoose.model('ProjectsPage', projectsPageSchema);

export default ProjectsPage;
