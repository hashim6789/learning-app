// interfaces/IUser.ts
import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  googleId: string | null;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string | null;
  profilePicture: string | null;
  isBlocked: boolean;
  isVerified: boolean;
  refreshToken: string | null;
  resetToken: string | null;
}
