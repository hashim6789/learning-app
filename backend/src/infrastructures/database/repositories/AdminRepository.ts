import { emitWarning } from "process";
import { Admin } from "../../../application/entities/Admin";
import { IAdminRepository } from "../../../application/IRepositories/IAdminRepository";
import AdminModel from "../models/AdminModel";
import { IAdmin } from "../models/AdminModel";

const ADMIN = {
  _id: "1234567890",
  email: "admin@gmail.com",
  password: "111111",
};

class AdminRepository implements IAdminRepository {
  constructor() {}

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ email });
    // const admin = email === ADMIN.email ? ADMIN : null;
    if (!admin) return null;

    return mappedAdmin(admin);
  }
  async findByToken(token: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ refreshToken: token });
    // const admin = email === ADMIN.email ? ADMIN : null;
    if (!admin) return null;

    return mappedAdmin(admin);
  }

  async setRefreshTokenToDB(
    token: string,
    adminId: string
  ): Promise<Admin | null> {
    const admin = await AdminModel.findByIdAndUpdate(
      adminId,
      { refreshToken: token },
      { new: true }
    );
    if (!admin) return null;
    return mappedAdmin(admin);
  }
}

function mappedAdmin(data: IAdmin) {
  const id = data._id.toString();
  return new Admin(data.email, data.password, id);
}

export default AdminRepository;
