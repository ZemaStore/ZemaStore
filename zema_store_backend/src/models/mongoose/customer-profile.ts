import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerProfileDocument extends Document {
  fullName: String;
  subscriptionId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema: Schema<ICustomerProfileDocument> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const CustomerProfile = mongoose.model<ICustomerProfileDocument>(
  "CustomerProfile",
  profileSchema
);

export default CustomerProfile;
