import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventsByResponsible,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import {
  createTaskInEvent,
  updateTaskInEvent,
  deleteTaskInEvent,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/responsible/:responsible", getEventsByResponsible);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// Event Tasks
router.post("/:id/tasks", createTaskInEvent);
router.put("/:id/tasks/:taskId", updateTaskInEvent);
router.delete("/:id/tasks/:taskId", deleteTaskInEvent);

export default router;
