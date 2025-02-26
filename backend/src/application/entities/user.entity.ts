// application/entities/User.ts
import { IUser } from "./iuser.entity";

export class User implements IUser {
  id: string;
  email: string;
  password: string | null;
  isBlocked: boolean;
  isVerified: boolean;
  refreshToken: string | null;
  resetToken: string | null;
  profilePicture: string | null;
  googleId: string | null;
  firstName: string;
  lastName: string | null;

  constructor(
    id: string,
    email: string,
    password: string | null,
    isBlocked = false,
    isVerified = true,
    refreshToken: string | null,
    resetToken = null,
    profilePicture = null,
    firstName: string,
    lastName: string | null,
    googleId = null
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isBlocked = isBlocked;
    this.isVerified = isVerified;
    this.refreshToken = refreshToken;
    this.resetToken = resetToken;
    this.googleId = googleId;
    this.profilePicture = profilePicture;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  removeSensitive() {
    this.password = null;
  }
}
