import { IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

export class AuthLoginCredentials {
  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters long." })
  @IsNotEmpty({ message: "Password cannot be empty." })
  @Matches(/^\S*$/, { message: "Password cannot contain spaces." })
  password: string;
}
