import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: string;
  stage: string;
  attributed?: Types.ObjectId;
}
