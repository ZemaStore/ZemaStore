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
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Follower = mongoose.model<IFollowerDocument>("Follower", followerSchema);

export default Follower;
