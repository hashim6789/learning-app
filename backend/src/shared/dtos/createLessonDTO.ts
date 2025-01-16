import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty({ message: "The title field is required." })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "The courseId field is required." })
  courseId: string;

  @IsString()
  @IsOptional()
  description?: string;
}
