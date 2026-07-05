import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  trigger: { type: String },
  triggerType: { type: String, enum: ['event', 'schedule', 'webhook'], default: 'event' },
  steps: [{ action: String, agent: String, order: Number }],
  status: { type: String, enum: ['active', 'paused', 'draft'], default: 'draft' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  lastRun: { type: Date },
}, { timestamps: true });

export default mongoose.model('Workflow', workflowSchema);
