import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IGetLearnersUseCase {
  execute(): Promise<ResponseModel>;
}
