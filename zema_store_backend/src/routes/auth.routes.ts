import { Router } from "express";

import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.controllers";
import { verifyOTP } from "../middlewares/auth.middleware";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").patch(verifyOTP, resetPassword);

export default (() => Router().use("/auth", router))();
