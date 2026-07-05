import mongoose from 'mongoose';

const approvalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  agent: { type: String },
  agentRef: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  department: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.model('Approval', approvalSchema);
