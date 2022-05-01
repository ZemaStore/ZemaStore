import { Router } from "express";
import {
  addSong,
  deleteSong,
  getSong,
  getSongs,
  updateSong,
} from "../controllers/song.controllers";
import { isAdmin } from "../middlewares/auth.middlewares";
import { audioUploader } from "../middlewares/multer.middlewares";

const router = Router();

router.route("/").get(getSongs).post(audioUploader.single("song"), addSong);

router
  .route("/:id")
  .get(getSong)
  .patch(audioUploader.single("song"), updateSong)
  .delete(deleteSong);

export default (() => Router().use("/songs", isAdmin, router))();
