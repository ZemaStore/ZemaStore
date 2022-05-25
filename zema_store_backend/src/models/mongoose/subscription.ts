import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriptionDocument extends Document {
  subscriptionType: String;
  subscriptionId: String;
  summary: String;
  price: Number;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema(
  {
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
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Subscription = mongoose.model<ISubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);

subscriptionSchema.virtual("id").get(function (this: ISubscriptionDocument) {
  return this._id.toHexString();
});

export default Subscription;
