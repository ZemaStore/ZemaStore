import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcryptjs";

type otpType = {
  code: String;
  expiresAt: Date;
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
  aes_key: String;
  aes_iv: String;
  createdAt: Date;
  updatedAt: Date;
  tokens: Array<string>;
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
    aes_key: {
      type: String,
      required: false,
    },
    aes_iv: {
      type: String,
      required: false,
    },
    tokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre<IUserDocument>("save", async function (next: Function) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password.toString(), 8);
  }
});

userSchema.virtual("id").get(function (this: IUserDocument) {
  return this._id.toHexString();
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
