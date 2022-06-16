import { Router } from "express";
import { sendOverallNotifications } from "../controllers/notifications.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/events/").post(sendOverallNotifications);

export default (() => Router().use("/playlists", router))();
