import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import { isNil } from "lodash";
import jwt from "jsonwebtoken";

import Role from "../models/mongoose/role";
import User, { IUserDocument } from "../models/mongoose/user";

import {
  getAccessToken,
  getRefreshToken,
  validateAccessToken,
  validateRefreshToken,
} from "../services/auth-token";
import {
  sendOtpCode,
  sendVerifyEmailOtpCode,
  sendWelcomeEmail,
} from "../services/emails/send-email";
import Generate_OTP from "../services/generate-code";

import CustomerProfile from "../models/mongoose/customer-profile";

import {
  forgotPasswordSchema,
  refreshTokenSchema,
  resendOtpCodeSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "../validation-schemas/auth.schemas";
import configs from "../configs/app.configs";

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

    ////
    const code = Generate_OTP();
    const otp = {
      code: code.toString(),
      expiresAt: new Date(Date.now() + 600000),
      createdAt: new Date(),
    };
    user.otp = otp;
    const profile = user.profileId;
    sendVerifyEmailOtpCode(
      user.email.toString(),
      profile["firstName"],
      code.toString()
    );

    ////

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

    if (user.isActive === false) {
      return res
        .status(400)
        .send({ success: false, message: "Your account is not active." });
    }

    const usersTokens = user.tokens;

    user.tokens.forEach((token) => {
      if (!validateAccessToken(token)) {
        usersTokens.splice(usersTokens.indexOf(token), 1);
      }
    });
    user.tokens = usersTokens;
    await user.save();

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = await getAccessToken(payload);
    const refreshToken = await getRefreshToken(payload);

    if (user.tokens.length < 2) {
      usersTokens.push(accessToken);
      user.tokens = usersTokens;
      await user.save();
    } else {
      return res.status(403).json({
        success: false,
        message: "You have already logged in.",
      });
    }

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

const adminSignIn = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
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
    }).populate("roleId");
    // console.log(user, " is user");
    if (!user || (user.roleId as any).name !== "ADMIN") {
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
    if (user.isActive === false) {
      return res
        .status(400)
        .send({ success: false, message: "Your account is not active." });
    }

    const usersTokens = user.tokens;

    user.tokens.forEach((token) => {
      if (!validateAccessToken(token)) {
        usersTokens.splice(usersTokens.indexOf(token), 1);
      }
    });
    user.tokens = usersTokens;
    await user.save();

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = await getAccessToken(payload);
    const refreshToken = await getRefreshToken(payload);

    if (user.tokens.length < 2) {
      usersTokens.push(accessToken);
      user.tokens = usersTokens;
      await user.save();
    } else {
      return res.status(403).json({
        success: false,
        message: "You have already logged in.",
      });
    }

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
      expiresAt: new Date(Date.now() + 600000),
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

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const validate = verifyEmailSchema.validate(req.body);
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
    if (user.otp.code !== otp) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid OTP.", data: otp });
    }
    if (user.otp.expiresAt < new Date()) {
      return res
        .status(400)
        .send({ success: false, message: "OTP expired.", data: otp });
    }

    user.isActive = true;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Email verified successfully.",
      data: null,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const resendOtpCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const validate = resendOtpCodeSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email not found.", data: email });
    }

    const code = Generate_OTP();
    const otp = {
      code: code.toString(),
      expiresAt: new Date(Date.now() + 600000),
      createdAt: new Date(),
    };

    user.otp = otp;
    await user.save();
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

const logOut = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;
    const payload: any = jwt.verify(accessToken, configs.JWT_ACCESS_TOKEN);
    const user = await User.findById(payload._id);
    if (isNil(user)) {
      return res
        .status(500)
        .send({ success: true, message: "logged out successfully!" });
    }

    let usersTokens = new Set(user.tokens);
    if (usersTokens.has(accessToken)) {
      usersTokens.delete(accessToken);
      user.tokens = [...usersTokens];
      await user.save();
    }
    return res
      .status(200)
      .send({ success: false, message: "User successfully logged out!" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: (error as Error).message });
  }
};

export {
  signUp,
  adminSignIn,
  verifyEmail,
  signIn,
  forgotPassword,
  resetPassword,
  refreshToken,
  resendOtpCode,
  logOut,
};
