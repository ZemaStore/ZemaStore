import Joi from "joi";

const getUserSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getUsersSchema = Joi.object({
  limit: Joi.string(),
  skip: Joi.string(),
  sortBy: Joi.string(),
});

const udpateUserSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    email: Joi.string().email(),
    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
      )
    ),
    phone: Joi.string()
      .min(10)
      .pattern(/^[0-9]+$/),
    fullName: Joi.string().min(4),
  },
});

export {
    getUserSchema,
    getUsersSchema,
    udpateUserSchema
}
