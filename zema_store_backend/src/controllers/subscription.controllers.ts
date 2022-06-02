import { Request, Response } from "express";

import Subscription from "../models/mongoose/subscription";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  createSubscriptionSchema,
  deleteSubscriptionSchema,
  getSubscriptionSchema,
} from "../validation-schemas/subscription.schemas";

const getSubscription = async (req: Request, res: Response) => {
  try {
    const validate = getSubscriptionSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const subscription = await Subscription.findById(req.params.id);

    res
      .status(200)
      .send(new OkResponse(subscription, "Subscription successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const createSubscription = async (req: Request, res: Response) => {
  try {
    const validate = createSubscriptionSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { subscriptionType, subscriptionId } = req.body;

    const subscription = await Subscription.create({
      subscriptionType,
      subscriptionId,
    });

    res
      .status(200)
      .send(new OkResponse(subscription, "Subscription successfully created!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const validate = deleteSubscriptionSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .send(new OkResponse(null, "Subscription successfully deleted!"));
  } catch (e) {}
};
