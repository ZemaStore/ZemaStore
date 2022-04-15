import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcryptjs";

type otpType = {
  code: String;
  expiryDate: Date;
};

export interface IUserDocument extends Document {
  email: String;
  phone: String;
  password: String;
  roleId: mongoose.Schema.Types.ObjectId;
  otp: otpType;
  profileId: mongoose.Schema.Types.ObjectId;
  isActive: Boolean;
  onModel: String;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onMod",
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["CustomerProfile", "ArtistProfile"],
    },
    otp: {
      type: Object,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUserDocument>("save", async function (next: Function) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password.toString(), 8);
  }
});

userSchema.methods.toJSON = function () {};

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
