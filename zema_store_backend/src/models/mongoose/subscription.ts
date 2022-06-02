import mongoose, { Schema, Document } from "mongoose";

enum SubType {
  FREE = "free",
  PREMIUM = "premium",
}

export interface ISubscriptionDocument extends Document {
  subscriptionType: SubType;
  subscriptionId: String;
  summary: String;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema(
  {
    subscriptionType: {
      type: String,
      enum: SubType,
      required: true,
      default: SubType.FREE,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
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
