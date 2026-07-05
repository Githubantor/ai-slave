import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  company: { type: String, required: true },
  contactName: { type: String },
  email: { type: String },
  phone: { type: String },
  score: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['cold', 'warm', 'hot', 'qualified', 'lost'], default: 'cold' },
  industry: { type: String },
  source: { type: String },
  notes: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  outreachDrafts: [{ subject: String, body: String, status: { type: String, enum: ['draft', 'pending_approval', 'approved', 'sent', 'rejected'], default: 'draft' } }],
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
