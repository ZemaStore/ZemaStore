import { Router } from "express";

import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlist.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router
  .route("/:id")
  .get(getPlaylist)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/").get(getPlaylists).post(createPlaylist);

export default (() => Router().use("/playlists", router))();
