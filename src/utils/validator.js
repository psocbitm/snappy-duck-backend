import Joi from "joi";

// Supported programming languages
const SUPPORTED_LANGUAGES = ["cpp", "java", "javascript", "python"];

// Maximum code length (100KB)
const MAX_CODE_LENGTH = 100 * 1024;

// Maximum input length (10KB)
const MAX_INPUT_LENGTH = 10 * 1024;

export const codeSchema = Joi.object({
  // Language validation
  language: Joi.string()
    .required()
    .valid(...SUPPORTED_LANGUAGES)
    .messages({
      "any.required": "Programming language is required",
      "any.only": `Language must be one of: ${SUPPORTED_LANGUAGES.join(", ")}`,
    }),

  // Code validation
  code: Joi.string()
    .required()
    .min(1)
    .max(MAX_CODE_LENGTH)
    .trim()
    .messages({
      "any.required": "Code is required",
      "string.empty": "Code cannot be empty",
      "string.max": `Code length cannot exceed ${MAX_CODE_LENGTH} characters`,
      "string.min": "Code must contain at least 1 character",
    }),

  // Input validation (optional)
  input: Joi.string()
    .optional()
    .allow("")
    .max(MAX_INPUT_LENGTH)
    .trim()
    .messages({
      "string.max": `Input length cannot exceed ${MAX_INPUT_LENGTH} characters`,
    }),
});

/**
 * Validates the code submission request
 * @param {Object} data - The request data to validate
 * @returns {Object} - Validation result {error, value}
 */
export const validateCodeSubmission = (data) => {
  const result = codeSchema.validate(data);
  return result;
};
