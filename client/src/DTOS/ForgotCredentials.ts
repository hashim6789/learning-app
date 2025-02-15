import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "../shared/types/User";

export class ForgotCredentials {
  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email cannot be empty." })
  email: string;

  role: User;
}
