import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthLoginCredentials {
  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters long." })
  @IsNotEmpty({ message: "Password cannot be empty." })
  password: string;
}
