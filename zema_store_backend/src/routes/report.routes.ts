import { Router } from "express";
import { getActiveUsers, getTotalUsers, getUsersByMedium, totalReport } from "../controllers/report.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(totalReport);
router.route("/active-users").get(getActiveUsers);
router.route("/total-users").get(getTotalUsers);
router.route("/users-by-medium").get(getUsersByMedium);

export default (() => Router().use("/reports", router))();
