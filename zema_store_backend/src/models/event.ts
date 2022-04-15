import mongoose, { Schema, Document } from "mongoose";

export interface IEventDocument extends Document {
  title: String;
  venue: Object;
  date: Date;
}

const eventSchema: Schema<IEventDocument> = new Schema({
  title: {
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
});

const Event = mongoose.model<IEventDocument>("Event", eventSchema);

export default Event;
