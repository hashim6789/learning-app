import { validate, ValidationError } from "class-validator";

interface ValidationErrors {
  [key: string]: string[];
}

const mapValidationErrors = (
  validationErrors: ValidationError[]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  validationErrors.forEach((error) => {
    if (error.constraints) {
      errors[error.property] = Object.values(error.constraints);
    }
  });

  return errors;
};

export const validateCredentials = async <T>(
  credentials: T
): Promise<ValidationErrors> => {
  const validationErrors: ValidationError[] = await validate(
    credentials as object
  );

  console.log("errors =", validationErrors);

  if (validationErrors.length > 0) {
    return mapValidationErrors(validationErrors);
  }

  return {};
};
