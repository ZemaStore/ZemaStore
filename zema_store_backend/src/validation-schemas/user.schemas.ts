import Joi from "joi";

const PASSWORD_MESSAGE =
  "The password needs to have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character";

const getUserSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getUsersSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
});

const updateUserSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    email: Joi.string().email(),
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
    phone: Joi.string()
      .min(10)
      .pattern(/^[0-9]+$/),
    firstName: Joi.string(),
    lastName: Joi.string(),
  },
});

const updateUserProfileSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    email: Joi.string().email(),
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
    old_password: Joi.string(),
  },
});

const changeUserStatusSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
  changeUserStatusSchema,
  updateUserProfileSchema
};
