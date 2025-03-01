import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { HttpStatus } from "../../shared/constants/response-status.contant";
import { HttpResponse } from "../../shared/constants/response-message.constant";
import formatZodErrors from "../../shared/utils/format-zod-error.util";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        res.status(HttpStatus.BAD_REQUEST).json({
          error: HttpResponse.INVALID_CREDENTIALS,
          details: formatZodErrors(error),
        });
      }
    }
  };
