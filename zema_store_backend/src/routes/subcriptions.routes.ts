import { Router } from "express";
import {
  createCustomerAndSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
} from "../controllers/subscription.controllers";

import { isAdmin } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(getSubscriptions).post(createSubscription);
router.route("/subscribe").post(createCustomerAndSubscription);
router
  .route("/:id")
  .get(getSubscription)
  //   .patch(subscription)
  .delete(deleteSubscription);
export default (() => Router().use("/subscriptions", router))();