import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  department: { type: String, default: 'Marketing' },
  status: { type: String, enum: ['planning', 'running', 'completed', 'cancelled'], default: 'planning' },
  budget: { type: Number },
  roi: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
