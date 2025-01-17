import { ResponseModel } from "../../../shared/types/ResponseModel";

interface BlockData {
  change: boolean;
}

export interface IBlockUnblockLearnerUseCase {
  execute(learnerId: string, data: BlockData): Promise<ResponseModel>;
}
