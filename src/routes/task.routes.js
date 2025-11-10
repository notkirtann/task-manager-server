import express from 'express'
import { createTask, getAllTasks, updateTaskById, deleteTask } from '../controllers/task.controller.js'

const router = express.Router()

router.post("/", createTask);

router.get("/", getAllTasks);

router.patch("/:id", updateTaskById);

router.delete("/:id", deleteTask);

export default router;