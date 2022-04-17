import { Router } from "express";
import {
  addSong,
  deleteSong,
  getSong,
  getSongs,
  updateSong,
} from "../controllers/songs.controllers";
import { isAdmin } from "../middlewares/auth.middlewares";
import uploader from "../middlewares/multer.middlewares";

const router = Router();

router.route("/").get(getSongs).post(uploader.single("song"), addSong);

router
  .route("/:id")
  .get(getSong)
  .patch(uploader.single("song"), updateSong)
  .delete(deleteSong);

export default (() => Router().use("/songs", isAdmin, router))();
