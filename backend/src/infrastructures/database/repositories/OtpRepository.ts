import { emitWarning } from "process";
import { Admin } from "../../../application/entities/Admin";
import { IAdminRepository } from "../../../application/IRepositories/IAdminRepository";
import AdminModel from "../models/AdminModel";
import { IOtpRepository } from "../../../application/IRepositories/IOtpRepository";
import { Otp } from "../../../application/entities/Otp";
import OtpModel, { IOtp } from "../models/OtpModel";

const ADMIN = {
  _id: "1234567890",
  email: "admin@gmail.com",
  password: "111111",
};

class OtpRepository implements IOtpRepository {
  constructor() {}

  async createOtp(data: Otp): Promise<Otp | null> {
    try {
      const otp = new OtpModel(data);
      const createdOtp = await otp.save();
      if (!createdOtp) null;
      return mappedOtp(createdOtp);
    } catch (error) {
      throw new Error("An error when creating the otp");
    }
  }

  async findOtpByUserId(userId: string): Promise<Otp | null> {
    try {
      const otp = await OtpModel.findOne({ userId });
      if (!otp) return null;
      return mappedOtp(otp);
    } catch (error) {
      throw new Error("An error when the otp is fetching!");
    }
  }

  async deleteOtpByUserId(userId: string): Promise<number> {
    try {
      const otp = await OtpModel.deleteOne({ userId });
      return otp.deletedCount;
    } catch (error) {
      throw new Error("An error when the otp is deleted!");
    }
  }
}

function mappedOtp(data: IOtp): Otp {
  const id = data._id.toString();
  const userId = data.userId.toString();
  return new Otp(id, userId, data.otp, data.expiresIn);
}

export default OtpRepository;
