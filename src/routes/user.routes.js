import express from 'express'
import { loginUser, createUser, deleteUser, getAllUser, getUserById, updateUserById } from '../controllers/user.controller.js';

const router = express.Router()

router.post("/login",loginUser)
router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
router.delete("/id",deleteUser);

export default router;