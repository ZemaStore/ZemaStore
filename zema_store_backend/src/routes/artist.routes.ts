import { Router } from "express";

import {
  addArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artist.controllers";

import { isAdmin } from "../middlewares/auth.middlewares";
import { imageUploader } from "../middlewares/multer.middlewares";

const router = Router();

router
  .route("/")
  .get(getArtists)
  .post(imageUploader.single("photo"), addArtist);

router
  .route("/:id")
  .get(getArtist)
  .patch(imageUploader.single("photo"), updateArtist)
  .delete(deleteArtist);

export default (() => Router().use("/artists", router))();
