import { ResponseModel } from "../../../shared/types/ResponseModel";
import { Category } from "../../entities/Category";

export interface ICreateCategoryUseCase {
  execute(data: Category): Promise<ResponseModel>;
}
