import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriptionDocument extends Document {
  subscriptionType: String;
  subscriptionId: String;
  summary: String;
  price: Number;
}

const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema({
  subscriptionType: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  }
});

const Subscription = mongoose.model<ISubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
