import 'dotenv/config';
import connectDB from './config/db.js';
import User from './models/User.js';
import Organization from './models/Organization.js';
import AIEmployee from './models/AIEmployee.js';
import Settings from './models/Settings.js';
import Task from './models/Task.js';
import Goal from './models/Goal.js';
import Approval from './models/Approval.js';

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB, seeding database...');
  } catch (err) {
    console.error('\nFailed to connect to MongoDB.');
    console.error('To fix this:');
    console.error('  1. Go to https://cloud.mongodb.com');
    console.error('  2. Click "Network Access" under Security');
    console.error('  3. Click "Add IP Address"');
    console.error('  4. Enter 0.0.0.0/0 and click Confirm');
    console.error('  5. Wait 1-2 minutes, then retry\n');
    process.exit(1);
  }

  const existing = await User.findOne({ email: 'admin@aicompany.com' });
  if (existing) {
    console.log('✓ Database already seeded.');
    console.log('  Login: admin@aicompany.com');
    console.log('  Password: password123');
    process.exit(0);
  }

  const user = await User.create({
    name: 'Alex Founder',
    email: 'admin@aicompany.com',
    password: 'password123',
    avatar: 'AF',
  });
  console.log('  Created user:', user.email);

  const org = await Organization.create({
    name: 'AI Innovations Inc',
    owner: user._id,
    members: [user._id],
  });

  user.organization = org._id;
  await user.save();

  await Settings.create({ organization: org._id });

  const agents = await AIEmployee.insertMany([
    { name: 'CEO AI', role: 'Chief Executive Officer', avatar: 'CE', color: 'from-purple-500 to-pink-500', status: 'online', currentTask: 'Analyzing growth strategy', completedTasks: 142, performanceScore: 96, organization: org._id, recentActivity: [{ action: 'Delegated tasks to departments', time: '2 min ago' }, { action: 'Reviewed Marketing report', time: '15 min ago' }] },
    { name: 'Marketing AI', role: 'Chief Marketing Officer', avatar: 'MA', color: 'from-rose-500 to-orange-500', status: 'online', currentTask: 'Generating content calendar', completedTasks: 89, performanceScore: 92, organization: org._id, recentActivity: [{ action: 'Generated blog post draft', time: '5 min ago' }, { action: 'Completed competitor analysis', time: '20 min ago' }] },
    { name: 'Sales AI', role: 'Chief Revenue Officer', avatar: 'SA', color: 'from-emerald-500 to-teal-500', status: 'online', currentTask: 'Scoring leads from Q2 pipeline', completedTasks: 67, performanceScore: 88, organization: org._id, recentActivity: [{ action: 'Prepared outreach draft', time: '3 min ago' }, { action: 'Updated lead scores', time: '12 min ago' }] },
    { name: 'Research AI', role: 'Head of Research', avatar: 'RE', color: 'from-blue-500 to-cyan-500', status: 'online', currentTask: 'Analyzing AI market trends', completedTasks: 103, performanceScore: 94, organization: org._id, recentActivity: [{ action: 'Completed market report', time: '8 min ago' }, { action: 'Updated competitor database', time: '25 min ago' }] },
    { name: 'Developer AI', role: 'Chief Technology Officer', avatar: 'DE', color: 'from-sky-500 to-indigo-500', status: 'busy', currentTask: 'Building API endpoints for CRM', completedTasks: 156, performanceScore: 97, organization: org._id, recentActivity: [{ action: 'Deployed microservice update', time: '10 min ago' }, { action: 'Generated API documentation', time: '30 min ago' }] },
    { name: 'Operations AI', role: 'Chief Operations Officer', avatar: 'OP', color: 'from-amber-500 to-yellow-500', status: 'online', currentTask: 'Optimizing project workflows', completedTasks: 78, performanceScore: 90, organization: org._id, recentActivity: [{ action: 'Completed workflow automation', time: '6 min ago' }, { action: 'Updated project timelines', time: '18 min ago' }] },
    { name: 'Finance AI', role: 'Chief Financial Officer', avatar: 'FI', color: 'from-green-500 to-emerald-500', status: 'online', currentTask: 'Calculating Q2 ROI metrics', completedTasks: 54, performanceScore: 91, organization: org._id, recentActivity: [{ action: 'Updated revenue forecast', time: '4 min ago' }, { action: 'Generated expense report', time: '22 min ago' }] },
    { name: 'HR AI', role: 'Head of People', avatar: 'HR', color: 'from-violet-500 to-purple-500', status: 'online', currentTask: 'Updating knowledge base', completedTasks: 45, performanceScore: 87, organization: org._id, recentActivity: [{ action: 'Created new SOP document', time: '7 min ago' }, { action: 'Updated team structure', time: '35 min ago' }] },
  ]);
  console.log(`  Created ${agents.length} AI employees`);

  const goal = await Goal.create({
    title: 'Grow AI business revenue by 50%',
    status: 'running',
    progress: 65,
    departments: ['Marketing', 'Sales', 'Research'],
    organization: org._id,
    deadline: new Date('2024-09-30'),
  });

  const taskList = [
    { title: 'Research AI market trends', department: 'Research', priority: 'high', status: 'completed', progress: 100 },
    { title: 'Generate Q3 marketing plan', department: 'Marketing', priority: 'high', status: 'running', progress: 60 },
    { title: 'Build lead scoring model', department: 'Sales', priority: 'medium', status: 'running', progress: 35 },
    { title: 'Design API architecture', department: 'Developer', priority: 'high', status: 'planning', progress: 10 },
    { title: 'Create project timeline', department: 'Operations', priority: 'medium', status: 'completed', progress: 100 },
    { title: 'Calculate Q2 financial metrics', department: 'Finance', priority: 'high', status: 'running', progress: 75 },
    { title: 'Update employee SOPs', department: 'HR', priority: 'low', status: 'pending', progress: 0 },
    { title: 'Competitor analysis report', department: 'Research', priority: 'medium', status: 'running', progress: 45 },
  ];
  const taskDocs = taskList.map((t, i) => ({
    ...t,
    assignee: agents[i % agents.length]._id,
    assigneeName: agents[i % agents.length].name,
    goal: goal._id,
    organization: org._id,
  }));
  await Task.insertMany(taskDocs);
  console.log(`  Created ${taskDocs.length} tasks`);

  await Approval.insertMany([
    { title: 'Send outreach email to Acme Corp', agent: 'Sales AI', department: 'Sales', priority: 'high', description: 'Draft personalized outreach email to Acme Corp CEO regarding AI consulting services.', organization: org._id, agentRef: agents[2]._id },
    { title: 'Publish blog post: AI Trends 2024', agent: 'Marketing AI', department: 'Marketing', priority: 'medium', description: 'Blog post about emerging AI trends including LLMs and autonomous agents.', organization: org._id, agentRef: agents[1]._id },
    { title: 'Deploy CRM integration update', agent: 'Developer AI', department: 'Developer', priority: 'high', description: 'Deploy new CRM API integration with HubSpot and Salesforce connectors.', organization: org._id, agentRef: agents[4]._id },
    { title: 'Delete test user data from database', agent: 'Operations AI', department: 'Operations', priority: 'medium', description: 'Clean up test user accounts and associated data from staging environment.', organization: org._id, agentRef: agents[5]._id },
  ]);
  console.log('  Created approval requests');

  console.log('\n✓ Database seeded successfully!');
  console.log('  Login:    admin@aicompany.com');
  console.log('  Password: password123');
  console.log('  Start:    cd backend && npm run dev\n');
  process.exit(0);
};

seed();
