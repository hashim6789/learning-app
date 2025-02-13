import { IsString, MinLength } from "class-validator";
import { UserType } from "../types";

export class ResetPasswordDTO {
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  role: UserType;
}
