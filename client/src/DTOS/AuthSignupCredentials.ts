import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Match } from "../shared/mathchDecorator"; // Create a custom Match decorator

export class AuthSignupCredentials {
  @IsNotEmpty({ message: "Name is required." })
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  email: string;

  @IsNotEmpty({ message: "Password cannot be empty." })
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  password: string;

  @IsNotEmpty({ message: "Confirm password cannot be empty." })
  @MinLength(6, {
    message: "Confirm password must be at least 6 characters long.",
  })
  @Match("password", {
    message: "Confirm password must match the password.",
  }) // Custom decorator for matching fields
  confirmPassword: string;
}
