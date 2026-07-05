import AIEmployee from '../models/AIEmployee.js';
import ActivityLog from '../models/ActivityLog.js';

export const getAgents = async (req, res) => {
  try {
    const agents = await AIEmployee.find({ organization: req.user.organization, active: true });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAgent = async (req, res) => {
  try {
    const agent = await AIEmployee.findOne({ _id: req.params.id, organization: req.user.organization });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const agent = await AIEmployee.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { $set: req.body },
      { new: true }
    );
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAgentActivity = async (req, res) => {
  try {
    const { action, detail, icon } = req.body;
    const entry = await ActivityLog.create({
      agent: req.body.agentName || 'AI Agent',
      agentRef: req.params.id,
      action,
      detail,
      icon: icon || 'file-text',
      organization: req.user.organization,
    });
    if (req.params.id !== 'system') {
      await AIEmployee.findByIdAndUpdate(req.params.id, {
        $push: { recentActivity: { action, time: 'just now' }, $slice: -10 },
      });
    }
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
