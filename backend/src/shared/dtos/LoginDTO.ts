import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "../types/User";

export class LoginDTO {
  @IsEmail({}, { message: "Email must be a valid email address." })
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  role: User;
}
