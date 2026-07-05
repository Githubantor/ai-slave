import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  department: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: {
    type: String,
    enum: ['pending', 'planning', 'running', 'waiting_approval', 'completed', 'cancelled'],
    default: 'pending',
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'AIEmployee' },
  assigneeName: { type: String },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  deadline: { type: Date },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  completedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
