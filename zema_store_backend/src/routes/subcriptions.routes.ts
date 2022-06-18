import { Router } from "express";
import {
  createCustomerAndSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controllers";

import { isAdmin } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(getSubscriptions).post(createSubscription);
router.route("/subscribe").post(createCustomerAndSubscription);
router
  .route("/:id")
  .get(getSubscription)
    .patch(updateSubscription)
  .delete(deleteSubscription);
export default (() => Router().use("/subscriptions", router))();
