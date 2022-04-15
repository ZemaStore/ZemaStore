import jwt from "jsonwebtoken";

import configs from "../configs/app.configs";

export const generateAccessToken = async (payload: any) => {
  const token = jwt.sign(payload, configs.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
