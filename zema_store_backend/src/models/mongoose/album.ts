import mongoose, { Schema, Document } from "mongoose";

export interface IAlbumDocument extends Document {
  artistId: mongoose.Schema.Types.ObjectId;
  title: String;
  imageUrl: String;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const albumSchema: Schema<IAlbumDocument> = new Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Album = mongoose.model<IAlbumDocument>("Album", albumSchema);

export default Album;
