import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  agent: { type: String },
  agentRef: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  action: { type: String, required: true },
  detail: { type: String },
  icon: { type: String, default: 'file-text' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
