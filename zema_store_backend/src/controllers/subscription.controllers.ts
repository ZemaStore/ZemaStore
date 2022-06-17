import { Request, Response } from "express";
import Stripe from "stripe";

import Subscription from "../models/mongoose/subscription";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";
import configs from "../configs/app.configs";

import {
  createSubscriptionSchema,
  deleteSubscriptionSchema,
  getSubscriptionSchema,
} from "../validation-schemas/subscription.schemas";
import User from "../models/mongoose/user";

const stripe = new Stripe(configs.STRIPE_API_KEY, {
  apiVersion: "2020-08-27",
});
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

    const {
      title,
      amount,
      summary,
      interval = "month",
      subscriptionType,
    } = req.body;

    const price = await stripe.prices.create({
      unit_amount: Utils.instance.formatStripeAmount(amount),
      currency: "usd",
      recurring: { interval },
      product: configs.STRIPE_SUBSCRIPTION_PRODUCT_ID,
    });

    const subscription = await Subscription.create({
      title,
      amount,
      summary,
      subscriptionType,
      priceId: price.id,
      interval,
    });

    res
      .status(200)
      .send(new OkResponse(subscription, "Subscription successfully created!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updateSubscription = async (req: Request, res: Response, next) => {
  const { interval, amount } = req.body;

  const existedSubscription = await Subscription.findById(req.params.id);

  if (!existedSubscription) {
    return res
      .status(500)
      .json({ message: "Subscription does n't exist", success: false });
  }
  try {
    const previous_price = await stripe.prices.update(
      existedSubscription.priceId,
      {
        active: false,
      }
    );
    if (!previous_price) {
      return res
        .status(500)
        .json({ message: "price is not able to be deleted", success: false });
    }

    const price = await stripe.prices.create({
      unit_amount: amount
        ? Utils.instance.formatStripeAmount(amount)
        : previous_price.unit_amount,
      currency: "usd",
      recurring: {
        interval: interval ? interval : previous_price.recurring,
      },
      product: configs.STRIPE_SUBSCRIPTION_PRODUCT_ID,
    });

    const newObject = {
      ...existedSubscription,
      ...req.body,
      price_id: price.id,
    };
    try {
      const params = req.params;
      const body = req.body;

      const subscription = await Subscription.findOneAndUpdate(
        { _id: req.params.id },
        newObject,
        { new: true }
      );
      res
        .status(200)
        .send(
          new OkResponse(subscription, "Subscriptions successfully updated!")
        );
    } catch (e) {
      Utils.instance.handleResponseException(res, e);
    }
  } catch (error) {
    console.log("error is ", error);
  }
};

const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const existedSubscription = await Subscription.findById(req.params.id);

    const validate = deleteSubscriptionSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const previous_price = await stripe.prices.update(
      existedSubscription.priceId,
      {
        active: false,
      }
    );
    if (!previous_price) {
      return res
        .status(500)
        .json({ message: "price is not able to be deleted", success: false });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .send(new OkResponse(null, "Subscription successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const createCustomerAndSubscription = async (req: Request, res: Response) => {
  const { stripeToken, customerEmail, subscriptionId } = req.body;

  try {
    const subscription = await Subscription.findById(subscriptionId).exec();
    if (!subscription) {
      return res.status(500).json({
        message: "there is no subscription with the given id",
        success: false,
      });
    }

    await stripe.customers
      .create({
        source: stripeToken,
        email: customerEmail,
      })
      .then(async (customer) => {
        await stripe.subscriptions.create({
          customer: customer.id,
          items: [
            {
              plan: subscription.priceId,
            },
          ],
        });

        await User.findOneAndUpdate(
          { email: customerEmail },
          {
            subscriptionId,
          }
        );
      });
    return res
      .status(200)
      .json({ message: "user successfully subscribed", success: false });
  } catch (error) {
    console.log(error, " stripe error");
  }
};

const updateCustomerAndSubscription = async(req: Request, res: Response) => {
  const { stripeToken, customerEmail, subscriptionId } = req.body;

  try {
    const subscription = await Subscription.findById(subscriptionId).exec();
    if (!subscription) {
      return res.status(500).json({
        message: "there is no subscription with the given id",
        success: false,
      });
    }

    // stripe.customers
    //   .retrieve({})
      
    //   .then(async (customer) => {
    //     const res = await stripe.subscriptions.update(customer.id, {
    //       cancel_at_period_end: false,
    //       proration_behavior: "create_prorations",
    //       items: [
    //         {
    //           plan: subscription.priceId,
    //         },
    //       ],
    //     });


        // return stripe.subscriptions.create({
        //   customer: customer.id,
        //   items: [
        //     {
        //       plan: planId,
        //     },
        //   ],
        // });
      // })
      // .catch();
  } catch (error) {
    console.log(error, " stripe error");
  }
};

export {
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  createCustomerAndSubscription,
  updateCustomerAndSubscription,
};
