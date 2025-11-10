import express from 'express'
import auth from '../middleware/auth.js';
import { createTask, getAllTasks, updateTaskById, deleteTask, getTaskById } from '../controllers/task.controller.js'

const router = express.Router()

router.post("/",auth,createTask);

router.get("/",auth, getAllTasks);

router.get("/:id",auth,getTaskById)

router.patch("/:id",auth ,updateTaskById);

router.delete("/:id",auth ,deleteTask);

export default router;