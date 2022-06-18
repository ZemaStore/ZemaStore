import { Router } from "express";

import {
  addUserPreference,
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  getPlaylists,
  getPopularPlaylist,
  getRecommendedPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/add-user-preference").post(addUserPreference);

router.route("/get-popular").get(getPopularPlaylist);

router.route("/get-recommended").get(getRecommendedPlaylist);

router
  .route("/:id")
  .get(getPlaylist)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/").get(getPlaylists).post(createPlaylist);

export default (() => Router().use("/playlists", isAuthorized, router))();
