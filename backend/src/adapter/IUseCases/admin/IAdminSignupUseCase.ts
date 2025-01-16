import { IAdmin } from "../../../infrastructures/database/models/AdminModel";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";

export interface IAdminSignupUseCase {
  execute(data: SignupDTO): Promise<IAdmin>;
}
