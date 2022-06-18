import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import { isNil } from "lodash";

import Role from "../models/mongoose/role";
import User, { IUserDocument } from "../models/mongoose/user";

import {
  getAccessToken,
  getRefreshToken,
  validateRefreshToken,
} from "../services/auth-token";
import { sendOtpCode, sendWelcomeEmail } from "../services/emails/send-email";
import Generate_OTP from "../services/generate-code";

import CustomerProfile from "../models/mongoose/customer-profile";

import {
  forgotPasswordSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validation-schemas/auth.schemas";

const signUp = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;

    const validate = signUpSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser != null) {
      throw new Error("Email already in use!");
    }

    const role = await Role.findOne({ name: "USER" });

    if (!role) {
      return res
        .status(400)
        .send({ success: false, message: "Role doesn't exist" });
    }

    const profileModel = "CustomerProfile";
    const userProfile = await CustomerProfile.create({
      firstName: firstName || "No",
      lastName: lastName || "NAME",
    });

    const user: IUserDocument = new User({
      email,
      password,
      phone,
      roleId: role._id,
      profileId: userProfile._id,
      onModel: profileModel,
    });

    const savedUser = await user.save();

    userProfile.userId = savedUser._id;
    await userProfile.save();

    sendWelcomeEmail(email, firstName);

    const payload = {
      _id: user._id,
    };
    const accessToken = await getAccessToken(payload);
    const refreshToken = await getRefreshToken(payload);

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: { user, accessToken, refreshToken },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: (e as Error).message });
  }
};

const signIn = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const validate = signInSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password.toString());

    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials." });
    }

    const payload = {
      _id: user._id,
    };

    const accessToken = await getAccessToken(payload);
    const refreshToken = await getRefreshToken(payload);

    res.status(200).send({
      success: true,
      message: "user signed in successfully.",
      data: { user, accessToken, refreshToken },
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const validate = forgotPasswordSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findOne({
      email,
    }).populate("profileId", "firstName");

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email not found.", data: email });
    }

    const code = Generate_OTP();
    const otp = {
      code: code.toString(),
      createdAt: new Date(),
    };

    user.otp = otp;
    await user.save();

    const profile = user.profileId;

    sendOtpCode(user.email.toString(), profile["firstName"], code.toString());

    res.status(200).send({
      success: true,
      message:
        "Password reset code is sent to your email, please visit your email to get the code in the next 10 mins.",
      data: null,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const validate = resetPasswordSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findOne({
      email: res.locals.email,
    });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    }

    user.password = password;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
      data: user,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const validate = refreshTokenSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const refreshToken = req.body.refreshToken;
    const userId = await validateRefreshToken(refreshToken);

    if (isNil(userId)) {
      return res.status(400).send({
        success: false,
        message: "Refresh token is invalid or expired, Please signin again!",
      });
    }

    const payload = {
      _id: userId,
    };
    const accessToken = await getAccessToken(payload);

    res.status(200).send({
      success: true,
      data: { accessToken },
      message: "Token successfully refreshed!",
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

export { signUp, signIn, forgotPassword, resetPassword, refreshToken };
