import dotenv from 'dotenv'
dotenv.config()
console.log("<-------------------------------------------------->Loaded MONGODB_URL:", process.env.MONGODB_URL);
import express from "express";
import "./config/mongoose.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
//swagger
import { swaggerUi, swaggerDocument } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task Manager API Documentation",
  customfavIcon: "/favicon.ico"
}));
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Task Manager API',
    documentation: '/api-docs'
  });
});

app.listen(PORT, () => {
  console.log(`<-------------------------------------------------->Server running on port ${PORT}`);
});
