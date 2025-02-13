import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";

const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

export default AdminModel;
