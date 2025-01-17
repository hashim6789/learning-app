import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IGetMentorByIdUseCase {
  execute(mentorId: string): Promise<ResponseModel>;
}
