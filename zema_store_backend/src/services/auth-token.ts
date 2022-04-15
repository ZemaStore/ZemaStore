import jwt from "jsonwebtoken";

import configs from "../configs/app.configs";
import User from "../models/user";

export const generateAccessToken = async (payload: any) => {
  const token = jwt.sign(payload, configs.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
