// interfaces/IMentor.ts
import { IUser } from "./IUser";
import { ObjectId } from "mongoose";

export interface IMentor extends IUser {
  bankDetails: {
    accountNumber: string | null;
    bankName: string | null;
    ifscCode: string | null;
  }[];
  createdCourses: ObjectId[] | null;
}
