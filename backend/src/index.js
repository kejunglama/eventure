import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import usersRoute from "./routes/usersRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import notificationRoute from "./routes/notificationsRoute.js";
import tasksRoute from "./routes/tasksRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Welcome To Eventure Backend!"));

app.use("/users", usersRoute);
app.use("/notifications", notificationRoute);
app.use("/events", eventsRoute);
app.use("/events/:eventId/tasks", tasksRoute);
app.use("/tasks", tasksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => console.log(`App is listening to port: ${PORT}`));
  })
  .catch(console.error);
