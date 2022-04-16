import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerProfileDocument extends Document {
  fullName: String;
  subscriptionId: mongoose.Schema.Types.ObjectId;
}

const profileSchema: Schema<ICustomerProfileDocument> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
});

const CustomerProfile = mongoose.model<ICustomerProfileDocument>(
  "CustomerProfile",
  profileSchema
);

export default CustomerProfile;
