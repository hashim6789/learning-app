import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class CreateSlotDTO {
  @IsString()
  @IsNotEmpty({ message: "The mentorId field is required." })
  mentorId: string;

  @IsDate()
  @IsNotEmpty({ message: "The date field is required." })
  date: Date;

  @IsString()
  @IsNotEmpty({ message: "The time field is required." })
  time: string;

  @IsNumber()
  @IsNotEmpty({ message: "The duration field is required." })
  duration: number;
}
