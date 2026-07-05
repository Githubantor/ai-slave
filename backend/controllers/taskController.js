import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';
import { sendEmail } from '../utils/email.js';

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
    if (task.clientEmail) {
      sendEmail({
        to: task.clientEmail,
        subject: `New task: ${task.title}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h2 style="color:#6366f1">New Task Assigned</h2>
          <p>Hello <strong>${task.clientName || task.clientEmail}</strong>,</p>
          <p>A new task has been created for you:</p>
          <div style="background:#f4f4f8;padding:16px;border-radius:8px;margin:16px 0">
            <h3 style="margin:0 0 8px;color:#1a1a2e">${task.title}</h3>
            ${task.description ? `<p style="margin:0;color:#666">${task.description}</p>` : ''}
            <p style="margin:8px 0 0;font-size:12px;color:#999">Priority: ${task.priority} | Status: ${task.status}</p>
          </div>
          <p style="color:#666;font-size:14px">Our AI team is working on this. We'll keep you updated on progress.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
          <p style="color:#999;font-size:12px">AI Company OS — Automating your success</p>
        </div>`,
      });
    }
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
    if (req.body.status === 'completed' && task.clientEmail) {
      sendEmail({
        to: task.clientEmail,
        subject: `Task completed: ${task.title}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h2 style="color:#22c55e">Task Completed</h2>
          <p>Hello <strong>${task.clientName || task.clientEmail}</strong>,</p>
          <p>Great news! A task has been completed:</p>
          <div style="background:#f0fdf4;padding:16px;border-radius:8px;margin:16px 0">
            <h3 style="margin:0 0 8px;color:#166534">${task.title}</h3>
            <p style="margin:0;color:#666">Priority: ${task.priority} | Progress: ${task.progress}%</p>
          </div>
          <p style="color:#666;font-size:14px">We're making great progress on your project. Feel free to reply if you have any questions.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
          <p style="color:#999;font-size:12px">AI Company OS — Automating your success</p>
        </div>`,
      });
    }
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
