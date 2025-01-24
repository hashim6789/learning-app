import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotCredentials {
  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  email: string;
}
