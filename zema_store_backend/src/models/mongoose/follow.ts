import mongoose, { Schema, Document } from "mongoose";

export interface IFollowerDocument extends Document {
  artistId: mongoose.Schema.Types.ObjectId;
  customerId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const followerSchema: Schema<IFollowerDocument> = new Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ArtistProfile",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CustomerProfile",
    },
  },
  { timestamps: true }
);

const Follow = mongoose.model<IFollowerDocument>("Follow", followerSchema);

export default Follow;
