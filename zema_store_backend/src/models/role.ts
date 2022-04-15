import mongoose, { Schema, Document } from "mongoose";

export interface IRoleDocument extends Document {
  name: String;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema: Schema<IRoleDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<IRoleDocument>("Role", roleSchema);

export default Role;
