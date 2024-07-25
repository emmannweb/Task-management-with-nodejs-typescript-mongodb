import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/ITask";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },

    stage: {
      type: String,
      default: "created",
      enum: ["created", "inProgress", "completed"],
    },

    attributed: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model<ITask>("Task", taskSchema);
