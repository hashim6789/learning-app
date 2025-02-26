// usecases/ValidateAccessTokenUseCase.ts
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { verifyAccessToken } from "../../../shared/utils/jwt.util";

class ValidateAccessTokenUseCase {
  async execute(accessToken: string): Promise<ResponseModel> {
    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      return {
        statusCode: 403,
        success: false,
        message: "Invalid or expired access token",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Access token is valid",
      data: decoded,
    };
  }
}

export default ValidateAccessTokenUseCase;
