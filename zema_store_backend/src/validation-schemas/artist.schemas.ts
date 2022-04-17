import Joi from "joi";

const getArtistSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getArtistsSchema = Joi.object({
  limit: Joi.string(),
  skip: Joi.string(),
  sortBy: Joi.string(),
});

const addArtistSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
      )
    )
    .required(),
  fullName: Joi.string().min(4),
});

const updateArtistSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    email: Joi.string().email(),
    phone: Joi.string()
      .min(10)
      .pattern(/^[0-9]+$/),
    password: Joi.string().min(8),
    fullName: Joi.string().min(4),
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
