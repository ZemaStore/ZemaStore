import Joi from "joi";

const PASSWORD_MESSAGE =
  "The password needs to have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character";

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
      )
    )
    .messages({
      "string.min": PASSWORD_MESSAGE,
      "string.pattern.base": PASSWORD_MESSAGE,
    }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.any().required(),
});

const resendOtpCodeSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  code: Joi.string().length(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
      )
    )
    .messages({
      "string.min": PASSWORD_MESSAGE,
      "string.pattern.base": PASSWORD_MESSAGE,
    }),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export {
  signInSchema,
  signUpSchema,
  resendOtpCodeSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
};
