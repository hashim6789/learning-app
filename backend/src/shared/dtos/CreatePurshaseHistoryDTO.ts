import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class CreatePurchaseDTO {
  @IsString()
  @IsNotEmpty({ message: "The courseId field is required." })
  courseId: string;

  @IsString()
  @IsNotEmpty({ message: "The paymentIntentId field is required." })
  paymentIntentId: string;

  @IsNumber()
  @IsNotEmpty({ message: "The amount field is required." })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: "The status field is required." })
  status: string;
}
