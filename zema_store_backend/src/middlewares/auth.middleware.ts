import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isNil } from "lodash";

import configs from "../configs/app.configs";
import Role from "../models/role";
import User from "../models/user";

const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (isNil(token)) {
      throw new Error("Invalid Authentication Credentials");
    }

    const payload: any = jwt.verify(token, configs.JWT_SECRET);
    const user = await User.findById(payload._id);

    if (isNil(user)) {
      throw new Error("Invalid Authentication Credentials");
    }
    req["user"] = user;
    req["token"] = token;

    next();
  } catch (e) {
    return res
      .status(400)
      .send({ success: false, message: (e as Error).message });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (isNil(token)) {
      throw new Error("Invalid Authentication Credentials");
    }

    const payload: any = jwt.verify(token, configs.JWT_SECRET);
    const user = await User.findById(payload._id);

    if (isNil(user)) {
      throw new Error("Invalid Authentication credentials");
    }

    const role = await Role.findById(user.roleId);

    if (isNil(role)) {
      throw new Error("Role doesn't exist");
    }

    if (role.name === "ADMIN") {
      next();
    } else {
      throw new Error("Unauthorized access");
    }
  } catch (e) {
    return res
      .status(400)
      .send({ success: false, message: (e as Error).message });
  }
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (isNil(user)) {
      throw new Error("User not found.");
    }

    if (code !== user.otp.code) {
      throw new Error("Invalid or expired code.");
    }

    const currentDate = new Date();

    if (currentDate.getTime() - user.otp.createdAt.getTime() > 600000) {
      throw new Error("Invalid or expired code.");
    }

    req["email"] = email;
    req["code"] = code;

    next();
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

export { isAuthorized, isAdmin, verifyOTP };
