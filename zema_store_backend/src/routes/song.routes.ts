import { Router } from "express";

import {
  addSong,
  deleteSong,
  getSong,
  getSongs,
  getSongsByAlbum,
  getSongsByArtist,
  updateSong,
} from "../controllers/song.controllers";

import { isAdmin, isAuthorized } from "../middlewares/auth.middlewares";
import { audioUploader } from "../middlewares/multer.middlewares";

const router = Router();

router
  .route("/")
  .get(getSongs)
  .post(audioUploader.single("song"), isAdmin, addSong);

router
  .route("/:id")
  .get(getSong)
  .patch(audioUploader.single("song"), isAdmin, updateSong)
  .delete(isAdmin, deleteSong);

router.route("/album/:albumId").get(getSongsByAlbum);

router.route("/artist/:artistId").get(getSongsByArtist);

export default (() => Router().use("/songs", isAuthorized, router))();
