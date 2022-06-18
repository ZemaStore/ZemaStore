import { Router } from "express";

import {
  adminSignIn,
  forgotPassword,
  refreshToken,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.controllers";
import { verifyOTP } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/admin-sign-in").post(adminSignIn);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").patch(verifyOTP, resetPassword);
router.route("/token/refresh").patch(refreshToken);

export default (() => Router().use("/auth", router))();
