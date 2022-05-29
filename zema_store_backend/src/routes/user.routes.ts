import { Router } from "express";

import {
  changeUserStatus,
  getUser,
  getusers,
  updateUser,
} from "../controllers/user.controllers";
import { imageUploader } from "../middlewares/multer.middlewares";

const router = Router();

router.route("/").get(getusers);

router.route("/status").patch(changeUserStatus);

router
  .route("/:id")
  .get(getUser)
  .patch(imageUploader.single("photo"), updateUser);

export default (() => Router().use("/users", router))();
