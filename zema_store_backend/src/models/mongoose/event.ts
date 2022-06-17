import mongoose, { Schema, Document } from "mongoose";

export interface IEventDocument extends Document {
  title: String;
  summary: String;
  imageUrl: String;
  venue: Object;
  date: Date;
  artistId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema<IEventDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ArtistProfile",
    },
    summary: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
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
