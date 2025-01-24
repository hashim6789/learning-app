import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  IsIn,
} from "class-validator";

export class UpdateCourseDTO {
  @IsString()
  @IsNotEmpty({ message: "The title field is required." })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "The mentorId field is required." })
  mentorId: string;

  @IsString()
  @IsNotEmpty({ message: "The category field is required." })
  category: string;

  //   @IsString()
  //   @IsOptional()
  //   thumbnail: string;

  @IsString()
  @IsOptional()
  description?: string;
}
