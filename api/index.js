import 'dotenv/config';
import connectDB from '../backend/config/db.js';
import app from '../backend/server.js';

await connectDB().catch(() => {});

export default app;
