import Joi from "joi";

const getUserSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getUsersSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
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

export { getUserSchema, getUsersSchema, udpateUserSchema };
