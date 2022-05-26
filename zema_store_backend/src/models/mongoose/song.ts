import mongoose, { Schema, Document } from "mongoose";

enum MusicGenre {
  REGGAE = "reggae",
  POP = "pop",
  ROCK = "rock",
}

export interface ISongDocument extends Document {
  albumId: mongoose.Schema.Types.ObjectId;
  artistId: mongoose.Schema.Types.ObjectId;
  title: String;
  song: String;
  genre: MusicGenre;
  listenersCount: Number;
  length: String;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const songSchema: Schema<ISongDocument> = new Schema(
  {
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Album",
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ArtistProfile",
    },
    title: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: MusicGenre,
    },
    listenersCount: {
      type: Number,
      required: true,
      default: 0,
    },
    length: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Song = mongoose.model<ISongDocument>("Song", songSchema);

songSchema.virtual("id").get(function (this: ISongDocument) {
  return this._id.toHexString();
});

export default Song;
