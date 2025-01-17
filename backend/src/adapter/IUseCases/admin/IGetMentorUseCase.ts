import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IGetMentorsUseCase {
  execute(): Promise<ResponseModel>;
}
