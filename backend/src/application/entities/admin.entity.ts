// application/entities/Admin.ts
import { IUser } from "./iuser.entity";

export class Admin implements IUser {
  id: string;
  email: string;
  password: string | null;
  isBlocked: boolean;
  isVerified: boolean;
  refreshToken: string | null;
  resetToken: string | null;
  profilePicture: string | null;

  constructor(
    id: string,
    email: string,
    password: string | null,
    isBlocked = false,
    isVerified = true,
    refreshToken = null,
    resetToken = null,
    googleId = null,
    profilePicture = null
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isBlocked = isBlocked;
    this.isVerified = isVerified;
    this.refreshToken = refreshToken;
    this.resetToken = resetToken;
    this.profilePicture = profilePicture;
  }

  removeSensitive() {
    this.password = null;
  }
}
