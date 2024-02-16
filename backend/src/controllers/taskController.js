import { Event } from "../models/eventModel.js";

export const createTaskInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.tasks.push(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTasksByAssigned = async (req, res) => {
  try {
    const events = await Event.find({ "tasks.assigned": req.params.assigned });
    const tasks = events.flatMap((event) =>
      event.tasks
        .filter((task) => task.assigned == req.params.assigned)
        .map((task) => ({ ...task._doc, event }))
    );
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const events = await Event.find({});
    const tasks = events.flatMap((event) =>
      event.tasks.map((task) => ({ ...task._doc, event }))
    );
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTask = async (req, res) => {
  try {
    const event = await Event.find({ "tasks._id": req.params.taskId });
    const task = event.tasks.id(req.params.taskId);
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTaskInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const task = event.tasks.id(req.params.taskId);
    task.set(req.body);
    await event.save();
    res.status(200).send({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTaskInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    const task = event.tasks.filter(
      (task) => task._id.toString() === req.params.taskId
    )[0];

    const taskIndex = event.tasks.indexOf(task);
    if (taskIndex > -1) {
      event.tasks.splice(taskIndex, 1);
    }

    await event.save();
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
