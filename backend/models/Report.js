import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['market', 'competitor', 'trend', 'opportunity', 'swot', 'custom'], default: 'custom' },
  content: { type: mongoose.Schema.Types.Mixed },
  summary: { type: String },
  department: { type: String },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  tags: [String],
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
