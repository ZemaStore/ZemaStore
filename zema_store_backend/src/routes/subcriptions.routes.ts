import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
} from "../controllers/subscription.controllers";

import { isAdmin } from "../middlewares/auth.middlewares";

const router = Router();

router
  .route("/:id")
  .get(getSubscription)
  //   .patch(subscription)
  .delete(deleteSubscription);

router.route("/").get(getSubscription).post(createSubscription);

export default (() => Router().use("/subscriptions", router))();
