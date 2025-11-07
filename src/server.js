import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  processEnv: process.env,
});

console.log("------------->Loaded MONGODB_URL:", process.env.MONGODB_URL,"<----------------");

import express from "express";
import "./db/mongoose.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`---------------Server running on port ${PORT}----------------------`);
});