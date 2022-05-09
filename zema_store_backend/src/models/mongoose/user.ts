import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcryptjs";

type otpType = {
  code: String;
  createdAt: Date;
};

export interface IUserDocument extends Document {
  email: String;
  phone: String;
  password: String;
  photoUrl: String;
  roleId: mongoose.Schema.Types.ObjectId;
  otp: otpType;
  profileId: mongoose.Schema.Types.ObjectId;
  isActive: Boolean;
  subscriptionId: mongoose.Schema.Types.ObjectId;
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
    photoUrl: {
      type: String,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel",
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
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
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

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.roleId;
  delete userObject.otp;
  delete userObject.onModel;

  return userObject;
};

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
