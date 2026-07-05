import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'planning', 'running', 'completed', 'cancelled'],
    default: 'pending',
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  departments: [String],
  assignedBy: { type: String, default: 'Owner' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  deadline: { type: Date },
  completedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);
