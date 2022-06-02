import mongoose, { Schema, Document } from "mongoose";

export interface IArtistProfileDocument extends Document {
  userId: String;
  firstName: String;
  lastName: String;
  photoUrl: String;
  followerNumber: Number;
  listenedHour: Number;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema: Schema<IArtistProfileDocument> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ArtistProfie = mongoose.model<IArtistProfileDocument>(
  "ArtistProfile",
  profileSchema
);

profileSchema.virtual("id").get(function (this: IArtistProfileDocument) {
  return this._id.toHexString();
});

profileSchema.virtual("fullName").get(function (this: IArtistProfileDocument) {
  return `${this.firstName} ${this.lastName}`;
});

export default ArtistProfie;
