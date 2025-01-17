import { BlockData } from "../../../shared/types/BlockData";
import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IListUnListCategoryUseCase {
  execute(categoryId: string, data: BlockData): Promise<ResponseModel>;
}
