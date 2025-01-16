export interface ResponseModel {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
}
