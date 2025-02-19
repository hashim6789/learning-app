// import {
//   IsEmail,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Matches,
//   MinLength,
// } from "class-validator";
// import { Match } from "../shared/mathchDecorator"; // Create a custom Match decorator

// export class AuthSignupCredentials {
//   @IsNotEmpty({ message: "Name is required." })
//   firstName: string;

//   @IsOptional()
//   @IsString()
//   lastName: string;

//   @IsEmail({}, { message: "Please provide a valid email address." })
//   @IsNotEmpty({ message: "Email cannot be empty." })
//   email: string;

//   @IsNotEmpty({ message: "Password cannot be empty." })
//   @MinLength(6, { message: "Password must be at least 6 characters long." })
//   @Matches(/^\S*$/, { message: "Password cannot contain spaces." })
//   password: string;

//   @IsNotEmpty({ message: "Confirm password cannot be empty." })
//   @MinLength(6, {
//     message: "Confirm password must be at least 6 characters long.",
//   })
//   @Match("password", {
//     message: "Confirm password must match the password.",
//   }) // Custom decorator for matching fields
//   confirmPassword: string;
// }

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";
import { Match } from "../shared/mathchDecorator";
import { User } from "../shared/types/User";
// import { Match } from "../shared/matchDecorator"; // Ensure this decorator is implemented correctly

export class AuthSignupCredentials {
  @IsNotEmpty({ message: "First name is required." })
  @IsString({ message: "First name must be a valid string." })
  @Matches(/^[A-Za-z\s'-]+$/, {
    message:
      "First name can only contain letters, spaces, hyphens, and apostrophes.",
  })
  @MaxLength(20, { message: "First name cannot exceed 50 characters." })
  firstName: string;

  @IsOptional()
  @IsString({ message: "Last name must be a valid string." })
  // @Matches(/^[A-Za-z\s'-]+$/, {
  //   message:
  //     "Last name can only contain letters, spaces, hyphens, and apostrophes.",
  // })
  @MaxLength(15, { message: "Last name cannot exceed 50 characters." })
  lastName?: string;

  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  // @MaxLength(20, { message: "Email cannot exceed 20 characters." })
  email: string;

  @IsNotEmpty({ message: "Password cannot be empty." })
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  @MaxLength(20, { message: "Password cannot exceed 20 characters." })
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   {
  //     message:
  //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  //   }
  // )
  @Matches(/^\S*$/, { message: "Password cannot contain spaces." })
  password: string;

  @IsNotEmpty({ message: "Confirm password cannot be empty." })
  @MinLength(6, {
    message: "Confirm password must be at least 8 characters long.",
  })
  @Match("password", {
    message: "Confirm password must match the password.",
  })
  confirmPassword: string;

  role: User;
}
