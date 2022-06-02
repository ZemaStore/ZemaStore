import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerProfileDocument extends Document {
  userId: String;
  firstName: String;
  lastName: String;
  subscriptionId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema: Schema<ICustomerProfileDocument> = new Schema(
  {
    userId: {
      type: String,
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

profileSchema
  .virtual("fullName")
  .get(function (this: ICustomerProfileDocument) {
    return `${this.firstName} ${this.lastName}`;
  });

export default CustomerProfile;
