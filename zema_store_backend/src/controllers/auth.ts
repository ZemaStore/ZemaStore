import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";

import Role from "../models/role";
import User from "../models/user";
import { generateAccessToken } from "../services/auth-token";

export const signUp = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser != null) {
      throw new Error("Email already in use!");
    }

    const role = await Role.findOne({ name: "USER" });
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      roleId: role._id,
    });

    await user.save();

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
    return res.status(400).json({ success: false, message: e.message });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).send({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password.toString());

    if (!isMatch) {
      res.status(400).send({ success: false, message: "Invalid credentials." });
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
    res.status(500).send({ success: false, message: (e as Error).message });
  }
};
