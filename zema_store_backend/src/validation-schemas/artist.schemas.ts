import Joi from "joi";

const PASSWORD_MESSAGE =
  "The password needs to have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character";

const getArtistSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getArtistsSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
});

const addArtistSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
      )
    )
    .messages({
      "string.min": PASSWORD_MESSAGE,
      "string.pattern.base": PASSWORD_MESSAGE,
    }),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  photo: Joi.optional(),
});

const updateArtistSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    email: Joi.string().email().optional(),
    phone: Joi.string()
      .min(10)
      .pattern(/^[0-9]+$/)
      .optional(),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
        )
      )
      .messages({
        "string.min": PASSWORD_MESSAGE,
        "string.pattern.base": PASSWORD_MESSAGE,
      })
      .optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  },
});

const deleteArtistSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getArtistSchema,
  getArtistsSchema,
  addArtistSchema,
  updateArtistSchema,
  deleteArtistSchema,
};
