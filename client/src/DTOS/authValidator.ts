import { validate, ValidationError } from "class-validator";

export const validateCredentials = async <T>(
  credentials: T
): Promise<string[]> => {
  const validationErrors: ValidationError[] = await validate(
    credentials as object
  );

  if (validationErrors.length > 0) {
    // Map through validation errors and return error messages
    return validationErrors.flatMap((error) =>
      error.constraints ? Object.values(error.constraints) : []
    );
  }
  return [];
};
