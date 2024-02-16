import mongoose from "mongoose";
import { Task } from "./taskModel.js";

const { Schema, model, Types } = mongoose;

const eventSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  responsible: { type: Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Types.ObjectId, ref: "User" }],
  tasks: [Task.schema],
});

export const Event = model("Event", eventSchema);
