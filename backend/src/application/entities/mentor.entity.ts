import Course from "./course.entity";
import { IUser } from "./iuser.entity";

export class BankDetail {
  constructor(
    public accountNumber: string | null,
    public bankName: string | null,
    public ifscCode: string | null
  ) {}
}

export class Mentor implements IUser {
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
    public bankDetails: BankDetail[],
    public createdCourses: string[] | null
  ) {}

  removeSensitive() {
    this.password = null;
  }
}
