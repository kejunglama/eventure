import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const event = await newEvent.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEventsByResponsible = async (req, res) => {
  try {
    const events = await Event.find({ responsible: req.params.responsible });
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
