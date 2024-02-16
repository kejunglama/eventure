import express from "express";
import { createNotification } from "../controllers/notificationController.js";

const router = express.Router();

// Getter is in the user controller because it is user specific
router.post("/", createNotification);

export default router;
