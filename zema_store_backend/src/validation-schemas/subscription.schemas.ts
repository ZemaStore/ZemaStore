import Joi from "joi";

const getSubscriptionSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const createSubscriptionSchema = Joi.object({
  subscriptionType: Joi.string().required(),
  title: Joi.string().required(),
  amount: Joi.number().required(),
  interval: Joi.string().required(),
  summary: Joi.string().optional(),
});

const deleteSubscriptionSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getSubscriptionSchema,
  createSubscriptionSchema,
  deleteSubscriptionSchema,
};
