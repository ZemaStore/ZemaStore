import { Router } from "express";

import {
  createFollower,
  deleteFollower,
  getArtistFollowers,
  getArtistsFollowedByUser,
  getFollower,
  getFollowers,
  updateFollower,
} from "../controllers/follow.controllers";

import { isAuthorized } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/:id").get(getFollower).patch(updateFollower);

router.route("/artist/:artistId").get(getArtistFollowers);

router.route("/user/:customerId").get(getArtistsFollowedByUser);

router.route("/").get(getFollowers).delete(deleteFollower).post(createFollower);

export default (() => Router().use("/follows", router))();
