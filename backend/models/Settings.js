import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, unique: true },
  theme: { type: String, enum: ['dark', 'light', 'system'], default: 'dark' },
  notifications: {
    email: { type: Boolean, default: false },
    taskReminders: { type: Boolean, default: true },
    approvalRequests: { type: Boolean, default: true },
    dailySummaries: { type: Boolean, default: true },
    systemAlerts: { type: Boolean, default: true },
  },
  featureFlags: {
    aiContentGeneration: { type: Boolean, default: true },
    automatedResearch: { type: Boolean, default: true },
    emailOutreach: { type: Boolean, default: false },
    socialMediaPosting: { type: Boolean, default: false },
    externalApiIntegration: { type: Boolean, default: true },
  },
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
