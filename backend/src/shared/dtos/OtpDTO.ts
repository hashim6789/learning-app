import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class OtpDTO {
  @MinLength(6, { message: "otp must be at least 6 digits long" })
  otp: string;
}
