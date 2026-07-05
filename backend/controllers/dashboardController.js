import AIEmployee from '../models/AIEmployee.js';
import Task from '../models/Task.js';
import Goal from '../models/Goal.js';
import Report from '../models/Report.js';
import Lead from '../models/Lead.js';
import Document from '../models/Document.js';
import Project from '../models/Project.js';
import ActivityLog from '../models/ActivityLog.js';

export const getDashboardStats = async (req, res) => {
  try {
    const org = req.user.organization;
    const [totalEmployees, activeTasks, completedTasks, goalsRunning, reports, leads, documents, projectsRunning, activities, recentLeads] = await Promise.all([
      AIEmployee.countDocuments({ organization: org, active: true }),
      Task.countDocuments({ organization: org, status: { $in: ['running', 'planning'] } }),
      Task.countDocuments({ organization: org, status: 'completed' }),
      Goal.countDocuments({ organization: org, status: { $in: ['running', 'planning'] } }),
      Report.countDocuments({ organization: org }),
      Lead.countDocuments({ organization: org }),
      Document.countDocuments({ organization: org }),
      Project.countDocuments({ organization: org, status: { $in: ['planning', 'in_progress', 'review'] } }),
      ActivityLog.find({ organization: org }).sort('-createdAt').limit(20),
      Lead.find({ organization: org }).sort('-createdAt').limit(10),
    ]);

    res.json({
      totalEmployees,
      activeTasks,
      completedTasks,
      goalsRunning,
      reportsGenerated: reports,
      leadsResearched: leads,
      contentCreated: documents,
      projectsRunning,
      systemStatus: 'Optimal',
      recentActivity: activities,
      recentLeads,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
