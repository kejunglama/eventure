import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const notificationSchema = new Schema(
  {
    title: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["event", "reminder", "alert", "task"],
      required: true,
    },
    users: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Notification = model("Notification", notificationSchema);
