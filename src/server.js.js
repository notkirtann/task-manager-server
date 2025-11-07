import express from "express";
import "./db/mongoose.js";
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

const PORT = 8000;
const app = express();

app.use(express.json());

app.use('/users', userRoutes)  
app.use('/tasks', taskRoutes)  

app.listen(PORT, () => {
  console.log(`${PORT}: This PORT has started listening`);
});