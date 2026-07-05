import Goal from '../models/Goal.js';
import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ organization: req.user.organization }).sort('-createdAt');
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, organization: req.user.organization });
    await ActivityLog.create({
      agent: 'CEO AI', action: 'created goal', detail: goal.title,
      organization: req.user.organization, icon: 'target',
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { $set: req.body },
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, organization: req.user.organization });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    await Task.deleteMany({ goal: goal._id });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const analyzeGoal = async (req, res) => {
  try {
    const { objective } = req.body;
    if (!objective) return res.status(400).json({ message: 'Objective required' });

    const departments = [];
    const obj = objective.toLowerCase();
    if (obj.includes('market') || obj.includes('research')) departments.push('Research');
    if (obj.includes('grow') || obj.includes('revenue') || obj.includes('client') || obj.includes('lead')) departments.push('Sales', 'Marketing');
    if (obj.includes('product') || obj.includes('build') || obj.includes('saas') || obj.includes('app')) departments.push('Developer');
    if (obj.includes('efficien') || obj.includes('operation')) departments.push('Operations');
    if (obj.includes('financ') || obj.includes('budget') || obj.includes('cost') || obj.includes('revenue')) departments.push('Finance');
    if (departments.length === 0) departments.push('Marketing', 'Sales', 'Research', 'Developer', 'Operations');

    const goal = await Goal.create({
      title: objective,
      status: 'planning',
      progress: 10,
      departments,
      organization: req.user.organization,
    });

    const taskTemplates = {
      Marketing: [
        'Create marketing strategy', 'Generate content calendar', 'Analyze competitors', 'Develop campaign concepts',
      ],
      Sales: ['Research target prospects', 'Build lead scoring', 'Prepare outreach sequences', 'Create sales collateral'],
      Research: ['Conduct market analysis', 'Research industry trends', 'Identify opportunities', 'Prepare reports'],
      Developer: ['Design system architecture', 'Build integrations', 'Create documentation', 'Set up deployment'],
      Operations: ['Create project timeline', 'Set up workflow automation', 'Define dependencies'],
      Finance: ['Calculate budget', 'Project revenue impact', 'Set up expense tracking'],
      HR: ['Define team structure', 'Create role documentation'],
    };

    const deptTasks = [];
    for (const dept of departments) {
      const templates = taskTemplates[dept] || ['Research and report'];
      for (const title of templates) {
        deptTasks.push({
          title: `${title} for: ${objective}`,
          department: dept,
          priority: 'high',
          status: 'pending',
          goal: goal._id,
          organization: req.user.organization,
        });
      }
    }
    await Task.insertMany(deptTasks);

    await ActivityLog.create({
      agent: 'CEO AI', action: 'analyzed objective', detail: `Strategic analysis: ${objective}`,
      organization: req.user.organization, icon: 'target',
    });

    const tasks = await Task.find({ goal: goal._id });
    res.status(200).json({
      goal,
      departments: departments.map(d => ({
        name: d,
        tasks: tasks.filter(t => t.department === d),
      })),
      summary: `CEO AI analyzed your objective. Coordination across ${departments.length} departments with ${deptTasks.length} tasks.`,
      timeline: '2-4 weeks for initial results',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
