import mongoose, { Schema, Document } from "mongoose";

export interface IArtistProfileDocument extends Document {
  fullName: String;
  photoUrl: String;
  followerNumber: Number;
  listenedHour: Number;
}

const profileSchema: Schema<IArtistProfileDocument> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  followerNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  listenedHour: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ArtistProfie = mongoose.model<IArtistProfileDocument>(
  "ArtistProfile",
  profileSchema
);

export default ArtistProfie;