import { Router } from "express";
import { getActiveUsers, totalReport } from "../controllers/report.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(totalReport);
router.route("/active-users").get(getActiveUsers);

export default (() => Router().use("/playlists", router))();
