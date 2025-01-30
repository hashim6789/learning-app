import { IsString, IsNotEmpty, IsOptional } from "class-validator";

interface Material {
  id: string;
  title: string;
}

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty({ message: "The title field is required." })
  title: string;

  // @IsString()
  // @IsNotEmpty({ message: "The courseId field is required." })
  // courseId: string;

  materials: string[];

  duration: number;

  @IsString()
  @IsOptional()
  description: string;
}
