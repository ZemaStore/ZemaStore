import { Router } from "express";

import {
  addAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  getAlbumsByArtist,
  updateAlbum,
} from "../controllers/album.controllers";

import { isAdmin, isAuthorized } from "../middlewares/auth.middlewares";

import { imageUploader } from "../middlewares/multer.middlewares";

const router = Router();

router
  .route("/:id")
  .get(getAlbum)
  .patch(imageUploader.single("photo"), isAdmin, updateAlbum)
  .delete(isAdmin, deleteAlbum);

router
  .route("/")
  .get(getAlbums)
  .post(imageUploader.single("photo"), isAdmin, addAlbum);

router.route("/artist/:artistId").get(getAlbumsByArtist);

export default (() => Router().use("/albums", isAuthorized, router))();
