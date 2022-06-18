import { Router } from "express";
import {
  notifyAll,
  notifyFollowers,
  notifyOne,
} from "../controllers/notifications.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/notify-one").post(notifyOne);
router.route("/notify-all").post(notifyAll);
router.route("/notify-followers").post(notifyFollowers);

export default (() => Router().use("/notifications", router))();
