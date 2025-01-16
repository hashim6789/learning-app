import { IsString, IsEmail, IsOptional, MinLength } from "class-validator";

export class SignupDTO {
  @IsString()
  @MinLength(2, { message: "First name must be at least 2 characters long." })
  firstName: string;

  @IsOptional()
  @IsString()
  // @MinLength(2, { message: "Last name must be at least 2 characters long." })
  lastName?: string;

  @IsEmail({}, { message: "Email must be a valid email address." })
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  password: string;
}
