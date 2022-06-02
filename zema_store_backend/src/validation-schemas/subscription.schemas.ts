import Joi from "joi";

const getSubscriptionSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const createSubscriptionSchema = Joi.object({
  subscriptionType: Joi.string().required(),
  subscriptionId: Joi.string().required(),
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
