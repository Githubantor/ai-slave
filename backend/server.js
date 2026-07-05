import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB, { getConnectionStatus } from './config/db.js';
import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agents.js';
import goalRoutes from './routes/goals.js';
import taskRoutes from './routes/tasks.js';
import approvalRoutes from './routes/approvals.js';
import activityRoutes from './routes/activity.js';
import knowledgeRoutes from './routes/knowledge.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: getConnectionStatus() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/data', async (req, res) => {
  try {
    if (!getConnectionStatus()) return res.json({ message: 'MongoDB not connected', data: null });
    const collections = await mongoose.connection.db.listCollections().toArray();
    const result = {};
    for (const col of collections) {
      const docs = await mongoose.connection.db.collection(col.name).find().limit(3).toArray();
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      result[col.name] = { total: count, samples: docs };
    }
    res.json({ message: 'MongoDB Data', db: 'connected', collections: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const RETRY_INTERVAL = 10000;

const start = async () => {
  try {
    await connectDB();
    console.log('\n  MongoDB: Connected');
  } catch {
    console.log('  MongoDB: Disconnected (retrying every 10s)...');
    console.log('  The frontend will use mock data until MongoDB connects.\n');

    const retryLoop = async () => {
      try {
        await connectDB();
        console.log('\n  MongoDB: Reconnected successfully!\n');
      } catch {
        setTimeout(retryLoop, RETRY_INTERVAL);
      }
    };
    setTimeout(retryLoop, RETRY_INTERVAL);
  }
  if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
      console.log(`\n  Backend server: http://localhost:${PORT}`);
      console.log(`  Health check:  http://localhost:${PORT}/api/health`);
      console.log(`  Auth login:    POST http://localhost:${PORT}/api/auth/login`);
      console.log(`  Auth register: POST http://localhost:${PORT}/api/auth/register`);
      console.log(`  Frontend:      http://localhost:3000\n`);
    });
  }
};
start();

export default app;
