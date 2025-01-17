import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IGetCategoriesUseCase {
  execute(): Promise<ResponseModel>;
}
