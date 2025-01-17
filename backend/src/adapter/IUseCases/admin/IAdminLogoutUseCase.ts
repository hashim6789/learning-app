import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IAdminLogoutUseCase {
  execute(token: string): Promise<ResponseModel>;
}
