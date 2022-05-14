import mongoose, { Schema, Document } from "mongoose";

export interface IPlaylistDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: String;
  songs: Array<mongoose.Schema.Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}

const playlistSchema: Schema<IPlaylistDocument> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "custom playlist",
    },
    songs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Song",
      required: true,
    },
  },
  { timestamps: true }
);

const Playlist = mongoose.model<IPlaylistDocument>("Playlist", playlistSchema);

export default Playlist;
