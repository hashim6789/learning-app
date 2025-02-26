import Course from "./course.entity";
import { IUser } from "./iuser.entity";

// domain/entity/Learner.ts
export class Learner implements IUser {
  constructor(
    public id: string,
    public email: string,
    public password: string | null,
    public isBlocked: boolean,
    public isVerified: boolean,
    public refreshToken: string | null,
    public resetToken: string | null,
    public profilePicture: string | null,
    public firstName: string,
    public lastName: string | null,
    public googleId: string | null,
    public purchasedCourses: string[] | null
  ) {}

  removeSensitive() {
    this.password = null;
  }
}
