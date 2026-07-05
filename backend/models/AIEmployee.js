import mongoose from 'mongoose';

const aiEmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, default: '' },
  color: { type: String, default: 'from-purple-500 to-pink-500' },
  status: { type: String, enum: ['online', 'busy', 'offline'], default: 'online' },
  currentTask: { type: String, default: 'Idle' },
  completedTasks: { type: Number, default: 0 },
  performanceScore: { type: Number, default: 90 },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true },
  recentActivity: [{
    action: String,
    time: String,
  }],
}, { timestamps: true });

export default mongoose.model('AIEmployee', aiEmployeeSchema);
