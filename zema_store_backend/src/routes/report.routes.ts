import { Router } from "express";
import {
  getActiveEvents,
  getActiveUsers,
  getTotalAlbums,
  getTotalArtists,
  getTotalCustomers,
  getTotalRevenue,
  getTotalSongs,
  getTotalUsers,
  getUsersByMedium,
  totalReport,
} from "../controllers/report.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(totalReport);
router.route("/active-users").get(getActiveUsers);
router.route("/active-events").get(getActiveEvents);
router.route("/total-users").get(getTotalUsers);
router.route("/users-by-medium").get(getUsersByMedium);
router.route("/total-artists").get(getTotalArtists);
router.route("/total-customers").get(getTotalCustomers);
router.route("/total-albums").get(getTotalAlbums);
router.route("/total-songs").get(getTotalSongs);
router.route("/total-revenue").get(getTotalRevenue);

export default (() => Router().use("/reports", router))();
