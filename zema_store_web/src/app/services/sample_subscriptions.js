const configs = require("../configs/configs");
const subscriptionDb = require("../db/subscriptions");
const { formatStripeAmount } = require("../utils/stripe-util");
const stripe = require("stripe")(configs.STRIPE_API_KEY);

const addSubscription = async (req, res, next) => {
  const {
    name,
    amount,
    subType,
    fromDate,
    toDate,
    description,
    included,
    promoCredit,
    interval = "month",
  } = req.body;
  console.log(
    name,
    amount,
    subType,
    fromDate,
    toDate,
    description,
    included,
    promoCredit
  );

  const price = await stripe.prices.create({
    unit_amount: formatStripeAmount(amount),
    currency: "usd",
    recurring: { interval },
    product: configs.StripeSubscriptionProductId,
  });

  subscriptionDb
    .addSubscription({
      name,
      amount,
      subType,
      fromDate,
      toDate,
      description,
      included,
      promoCredit,
      price_id: price.id,
      interval,
    })
    .then(async (response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("error is ", err);
      res.status(500).json({ success: false });
    });
};

const getAllSubscriptions = async (req, res, next) => {
  subscriptionDb
    .getAllSubscriptions()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};

const getSubscription = async (req, res, next) => {
  subscriptionDb
    .getSubscription(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const updateSubscription = async (req, res, next) => {
  const { interval, amount } = req.body;
  const { data: existedSubscription } = await subscriptionDb.getSubscription(
    req.params.id
  );
  if (!existedSubscription) {
    return res
      .status(500)
      .json({ message: "Subscription does n't exist", success: false });
  }
  try {
    const previous_price = await stripe.prices.update(
      existedSubscription.price_id,
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
        ? formatStripeAmount(amount)
        : previous_price.unit_amount,
      currency: "usd",
      recurring: {
        interval: interval ? interval : previous_price.interval,
      },
      product: configs.StripeSubscriptionProductId,
    });

    const newObject = {
      ...existedSubscription,
      ...req.body,
      price_id: price.id,
    };
    subscriptionDb
      .updateSubscriptions(req.params.id, newObject)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ success: false });
      });
  } catch (error) {
    console.log("error is ", error);
  }
};

const deleteSubscription = async (req, res, next) => {
  const { data: existedSubscription } = await subscriptionDb.getSubscription(
    req.params.id
  );
  if (!existedSubscription) {
    return res
      .status(500)
      .json({ message: "Subscription does n't exist", sucess: false });
  }

  try {
    const previous_price = await stripe.prices.update(
      existedSubscription.price_id,
      {
        active: false,
      }
    );
    if (!previous_price) {
      return res
        .status(500)
        .json({ message: "price is not able to be deleted", success: false });
    }

    subscriptionDb
      .deleteSubscription(req.params.id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ sucess: false });
      });
  } catch (error) {}
};

const createCustomerAndSubscription = (req, res) => {
  const { stripeToken, customerEmail, planId } = req.body;

  try {
    return stripe.customers
      .create({
        source: stripeToken,
        email: customerEmail,
      })
      .then((customer) => {
        stripe.subscriptions.create({
          customer: customer.id,
          items: [
            {
              plan: planId,
            },
          ],
        });
      });
  } catch (error) {
    console.log(error, " stripe error");
  }
};

const updateCustomerAndSubscription = (req, res) => {
  const { stripeToken, customerEmail, planId } = req.body;

  try {
    return;
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: planId,
        },
      ],
    });
  } catch (error) {
    console.log(error, " stripe error");
  }
};

module.exports = {
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscription,
};
