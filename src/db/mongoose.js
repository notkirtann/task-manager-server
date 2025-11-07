import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from "mongoose";

// Load .env before anything else
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/task-manager-app';

console.log("🔌 Connecting to MongoDB:", url);

mongoose.connect(url)
  .then(() => console.log("--------------MongoDB connected successfully---------------"))
  .catch((e) => {
    console.error("MongoDB connection failed:----------------->X X X X X X", e);
    process.exit(1);
  });