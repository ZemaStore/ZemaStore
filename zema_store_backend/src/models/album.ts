import mongoose, { Schema, Document } from "mongoose";

export interface IAlbumDocument extends Document {
  artistId: mongoose.Schema.Types.ObjectId;
  title: String;
  imageURL: String;
  releaseDate: Date;
}

const albumSchema: Schema<IAlbumDocument> = new Schema({
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Album = mongoose.model<IAlbumDocument>("Album", albumSchema);

export default Album;
