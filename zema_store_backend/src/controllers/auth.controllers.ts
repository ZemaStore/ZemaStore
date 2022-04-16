import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";

import Role from "../models/role";
import User, { IUserDocument } from "../models/user";
import { generateAccessToken } from "../services/auth-token";
import { sendOtpCode, sendWelcomeEmail } from "../services/emails/send-email";
import Generate_OTP from "../services/generate-code";
import CustomerProfile from "../models/customer-profile";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validation-schemas/auth.schemas";

const signUp = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, phone, password, fullName } = req.body;

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
      fullName: fullName || "No Name",
    });

    const user: IUserDocument = new User({
      email,
      password,
      phone,
      roleId: role._id,
      profileId: userProfile._id,
      onModel: profileModel,
    });

    await user.save();

    sendWelcomeEmail(email, fullName);

    const payload = {
      _id: user._id,
    };
    const token = await generateAccessToken(payload);
    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: { user, token },
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
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

    const token = await generateAccessToken(payload);
    res.status(200).send({
      success: true,
      message: "user signed in successfully.",
      data: { user, token },
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
    }).populate("profileId", "fullName");

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

    sendOtpCode(user.email.toString(), profile["fullName"], code.toString());

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
      email: req["email"],
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

export { signUp, signIn, forgotPassword, resetPassword };
