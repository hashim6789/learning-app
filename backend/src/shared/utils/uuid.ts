import { v4 as uuidv4, validate as uuidValidate } from "uuid";

/**
 * Generates a new UUID to be used as a refresh token
 * @returns {string} A new UUID v4
 */
function generateRefreshToken(): string {
  return uuidv4();
}

/**
 * Validates if a given string is a valid UUID
 * @param {string} uuid - The UUID to validate
 * @returns {boolean} True if the UUID is valid, false otherwise
 */
function isValid(uuid: string): boolean {
  return uuidValidate(uuid);
}

export { generateRefreshToken };
