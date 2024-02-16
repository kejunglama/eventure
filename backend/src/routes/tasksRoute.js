import express from "express";
import {
  getAllTasks,
  getTask,
  getTasksByAssigned,
} from "../controllers/taskController.js";

const router = express.Router();

// Create, Update, Delete Task in Event Route because it is a sub-route of Event Route
router.get("/", getAllTasks);
router.get("/:taskId", getTask);
router.get("/assigned/:assigned", getTasksByAssigned);

export default router;
