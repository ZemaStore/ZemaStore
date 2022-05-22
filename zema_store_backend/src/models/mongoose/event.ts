import mongoose, { Schema, Document } from "mongoose";

export interface IEventDocument extends Document {
  title: String;
  summary: String;
  imageUrl: String;
  venue: Object;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema<IEventDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    venue: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEventDocument>("Event", eventSchema);

export default Event;
