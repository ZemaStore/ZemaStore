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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Event = mongoose.model<IEventDocument>("Event", eventSchema);

eventSchema.virtual("id").get(function (this: IEventDocument) {
  return this._id.toHexString();
});

export default Event;
