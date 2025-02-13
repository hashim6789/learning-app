import { emitWarning } from "process";
import { Admin } from "../../../application/entities/Admin";
import { IAdminRepository } from "../../../application/IRepositories/IAdminRepository";
import AdminModel from "../models/AdminModel";
import { IAdmin } from "../interfaces/IAdmin";
import { mapToAdmin, mapToUser } from "../mappers/userMapper";

const ADMIN = {
  _id: "1234567890",
  email: "admin@gmail.com",
  password: "111111",
};

class AdminRepository implements IAdminRepository {
  constructor() {}

  async fetchById(adminId: string): Promise<Admin | null> {
    const admin = await AdminModel.findById(adminId);
    // const admin = email === ADMIN.email ? ADMIN : null;
    if (!admin) return null;

    return mapToAdmin(admin);
  }
  async updateById(
    adminId: string,
    data: Partial<Admin>
  ): Promise<Admin | null> {
    const admin = await AdminModel.findByIdAndUpdate(adminId, data, {
      new: true,
    });
    if (!admin) return null;
    return mapToAdmin(admin);
  }

  async fetchAll(): Promise<Admin[] | null> {
    const admin = await AdminModel.find();
    // const admin = email === ADMIN.email ? ADMIN : null;
    if (!admin) return null;
    return admin.map(mapToAdmin);
  }

  async deleteById(adminId: string): Promise<Admin | null> {
    return await AdminModel.findByIdAndDelete(adminId);
  }

  async fetchByField(field: { [key: string]: any }): Promise<Admin | null> {
    const admin = await AdminModel.findOne(field);
    if (!admin) return null;
    return mapToAdmin(admin);
  }

  // //to create a new admin
  async create(data: Admin): Promise<Admin> {
    const newLearner = new AdminModel(data);
    await newLearner.save();
    return mapToAdmin(newLearner);
  }

  // async fetchByField(field: { [key: string]: any }) {
  //   return await AdminModel.findOne(field);
  // }
  // async fetchByEmail(email: string): Promise<Admin | null> {
  //   const admin = await AdminModel.findOne({ email });
  //   // const admin = email === ADMIN.email ? ADMIN : null;
  //   if (!admin) return null;

  //   return mappedAdmin(admin);
  // }

  // async fetchByToken(token: string): Promise<Admin | null> {
  //   const admin = await AdminModel.findOne({ refreshToken: token });
  //   // const admin = email === ADMIN.email ? ADMIN : null;
  //   if (!admin) return null;

  //   return mappedAdmin(admin);
  // }

  // async fetchByRefreshToken(token: string): Promise<Admin | null> {
  //   const admin = await AdminModel.findOne({ refreshToken: token });
  //   if (!admin) return null;
  //   return mappedAdmin(admin);
  // }

  // async deleteRefreshToken(adminId: string): Promise<Admin | null> {
  //   const admin = await AdminModel.findByIdAndUpdate(
  //     adminId,
  //     {
  //       refreshToken: null,
  //     },
  //     { new: true }
  //   );
  //   if (!admin) return null;
  //   return mappedAdmin(admin);
  // }
}

// function mappedAdmin(data: IAdmin) {
//   const id = data._id.toString();
//   return new Admin(data.email, data.password, id);
// }

export default AdminRepository;
