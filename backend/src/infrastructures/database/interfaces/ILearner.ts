// interfaces/ILearner.ts
import { IUser } from "./IUser";
import { ObjectId } from "mongoose";

export interface ILearner extends IUser {
  purchasedCourses: ObjectId[] | null;
}
