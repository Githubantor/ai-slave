import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'docx', 'csv', 'txt', 'url', 'note'], default: 'txt' },
  content: { type: String },
  fileUrl: { type: String },
  fileSize: { type: String },
  category: { type: String, default: 'General' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
