import mongoose, { Schema, Document } from "mongoose";

enum MusicGenre {
  REGGAE = "reggae",
  POP = "pop",
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
}

const songSchema: Schema<ISongDocument> = new Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
});

const Song = mongoose.model<ISongDocument>("Song", songSchema);

export default Song;
