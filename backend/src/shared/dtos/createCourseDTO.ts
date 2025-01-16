import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  IsIn,
} from "class-validator";

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty({ message: "The title field is required." })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "The mentorId field is required." })
  mentorId: string;

  @IsString()
  @IsNotEmpty({ message: "The category field is required." })
  category: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  description?: string;

  //   @IsArray()
  //   @IsString({ each: true, message: 'Each lesson must be a string.' })
  //   @IsOptional()
  //   lessons?: string[];

  //   @IsString()
  //   @IsOptional()
  //   duration?: string;

  //   @IsString()
  //   @IsIn(['draft', 'published', 'archived'], {
  //     message: 'Status must be either draft, published, or archived.',
  //   })
  //   @IsOptional()
  //   status?: string;

  //   @IsString()
  //   @IsOptional()
  //   rejectionReason?: string;

  //   @IsNumber()
  //   @IsOptional()
  //   purchaseCount?: number;
}
