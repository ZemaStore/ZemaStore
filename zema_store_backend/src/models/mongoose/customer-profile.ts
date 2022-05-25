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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const CustomerProfile = mongoose.model<ICustomerProfileDocument>(
  "CustomerProfile",
  profileSchema
);

profileSchema.virtual("id").get(function (this: ICustomerProfileDocument) {
  return this._id.toHexString();
});

export default CustomerProfile;
