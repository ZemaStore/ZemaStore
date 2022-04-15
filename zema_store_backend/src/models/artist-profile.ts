import mongoose, { Schema, Document } from "mongoose";

export interface IArtistProfileDocument extends Document {
  firstName: String;
  lastName: String;
  photoUrl: String;
  followerNumber: Number;
  listenedHour: Number;
}

const profileSchema: Schema<IArtistProfileDocument> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photoUrl: {
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
  },
});

const ArtistProfie = mongoose.model<IArtistProfileDocument>(
  "ArtistProfile",
  profileSchema
);

export default ArtistProfie;
