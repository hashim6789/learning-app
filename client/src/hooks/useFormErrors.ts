import { useState } from "react";
import { validate, ValidationError } from "class-validator";

interface ValidationErrors {
  [key: string]: string[];
}

// Custom hook for managing form errors
const useFormErrors = <T>() => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateCredentials = async (values: T): Promise<boolean> => {
    const validationErrors: ValidationError[] = await validate(
      values as object
    );
    console.log(errors);

    if (validationErrors.length > 0) {
      const formattedErrors: ValidationErrors = {};

      validationErrors.forEach((error) => {
        if (error.constraints) {
          formattedErrors[error.property] = Object.values(error.constraints);
        }
      });

      setErrors(formattedErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return { errors, validateCredentials, setErrors };
};

export default useFormErrors;
