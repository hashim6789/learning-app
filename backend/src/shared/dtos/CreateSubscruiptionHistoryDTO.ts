import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class CreateSubscriptionHistoryDTO {
  @IsString()
  @IsNotEmpty({ message: "The planId field is required." })
  planId: string;

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
