import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthLoginCredentials {
  @IsEmail({}, { message: "Please provide a valid email address." }) // Corrected usage
  email: string;

  @IsNotEmpty({ message: "Password cannot be empty." }) // Valid usage
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  password: string;
}
