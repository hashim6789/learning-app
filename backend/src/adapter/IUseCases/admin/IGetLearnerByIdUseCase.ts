import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IGetLearnerByIdUseCase {
  execute(learnerId: string): Promise<ResponseModel>;
}
