import { IAdmin } from "../../../infrastructures/database/models/AdminModel";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { ResponseModel } from "../../../shared/types/ResponseModel";

export interface IAdminLoginUseCase {
  execute(data: LoginDTO): Promise<ResponseModel>;
}
