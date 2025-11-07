import mongoose from "mongoose";
const url = 'mongodb://localhost:27017/task-manager-app';
await mongoose.connect(url)