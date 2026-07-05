import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';

export const getTasks = async (req, res) => {
  try {
    const filter = { organization: req.user.organization };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.department) filter.department = req.query.department;
    const tasks = await Task.find(filter).sort('-createdAt');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, organization: req.user.organization });
    await ActivityLog.create({
      agent: req.body.assigneeName || 'System', action: 'created task', detail: task.title,
      organization: req.user.organization, icon: 'check-circle',
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { $set: req.body },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, organization: req.user.organization });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const org = req.user.organization;
    const [total, completed, running, pending] = await Promise.all([
      Task.countDocuments({ organization: org }),
      Task.countDocuments({ organization: org, status: 'completed' }),
      Task.countDocuments({ organization: org, status: 'running' }),
      Task.countDocuments({ organization: org, status: { $in: ['pending', 'planning'] } }),
    ]);
    res.json({ total, completed, running, pending });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
