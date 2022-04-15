import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerProfileDocument extends Document {
  firstName: String;
  lastName: String;
  subscriptionId: mongoose.Schema.Types.ObjectId;
}

const profileSchema: Schema<ICustomerProfileDocument> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
});

const CustomerProfile = mongoose.model<ICustomerProfileDocument>(
  "CustomerProfile",
  profileSchema
);

export default CustomerProfile;
