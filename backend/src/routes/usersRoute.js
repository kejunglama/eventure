import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  getUserNotifications,
  updateNotificationStatus,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// User Notifications
router.get("/:id/notifications", getUserNotifications);
router.put("/:id/notifications/:id", updateNotificationStatus);

export default router;
