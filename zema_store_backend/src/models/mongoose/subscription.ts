import mongoose, { Schema, Document } from "mongoose";

enum SubType {
  FREE = "free",
  PREMIUM = "premium",
}

export interface ISubscriptionDocument extends Document {
  title: string;
  amount: number;
  subscriptionType: SubType;
  priceId: string;
  interval: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema: Schema<ISubscriptionDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interval: {
      type: String,
      required: true,
      default: "monthly",
    },
    subscriptionType: {
      type: String,
      enum: SubType,
      required: true,
      default: SubType.FREE,
    },
    priceId: {
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
