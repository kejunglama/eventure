import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  deadline: { type: Date, required: true },
  assigned: { type: Types.ObjectId, ref: "User", required: true },
});

export const Task = model("Task", taskSchema);
