import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const connectDB = async (retryCount = 0) => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    }).then((conn) => {
      console.log(`\n  MongoDB connected: ${conn.connection.host}`);
      return conn;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    if (retryCount < MAX_RETRIES) {
      console.log(`\n  MongoDB connection attempt ${retryCount + 1} failed, retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await sleep(RETRY_DELAY_MS);
      return connectDB(retryCount + 1);
    }
    console.error('\n============================================');
    console.error('  MongoDB connection failed after retries!');
    console.error(`  Error: ${error.message}`);
    console.error('  The server will continue, but DB routes');
    console.error('  will be unavailable until the connection');
    console.error('  is re-established.');
    console.error('============================================\n');
    throw error;
  }

  return cached.conn;
};

export const getConnectionStatus = () => {
  if (cached.conn) return true;
  if (mongoose.connection.readyState === 1) return true;
  return false;
};

export default connectDB;
