import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  department: { type: String },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'review', 'completed', 'cancelled'],
    default: 'planning',
  },
  progress: { type: Number, default: 0 },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  deadline: { type: Date },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
