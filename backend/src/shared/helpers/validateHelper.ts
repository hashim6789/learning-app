import { validate } from "class-validator";

/**
 * Validates the provided data against the DTO using class-validator.
 * Throws an error if validation fails.
 * @param data - The data to validate
 */
export async function validateData<T extends object>(
  data: Partial<T>,
  dtoClass: new () => T
): Promise<void> {
  // Create an instance of the provided DTO class and populate it with the data
  const dtoInstance = Object.assign(new dtoClass(), data);

  // Validate the DTO
  const errors = await validate(dtoInstance);

  // If there are validation errors, throw an aggregated error message
  if (errors.length > 0) {
    throw new Error(
      errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join("; ")
    );
  }
}
