import Joi from "joi";

const getSubscriptionSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getSubscriptionsSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
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
  getSubscriptionsSchema,
  getSubscriptionSchema,
  createSubscriptionSchema,
  deleteSubscriptionSchema,
};
