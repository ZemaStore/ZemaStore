import jwt from "jsonwebtoken";
import { isNil } from "lodash";

import configs from "../configs/app.configs";
import User from "../models/mongoose/user";

const jwtHashAlgorithm = "HS256";

const getAccessToken = async (payload: any) => {
  return jwt.sign(payload, configs.JWT_ACCESS_TOKEN, {
    algorithm: jwtHashAlgorithm,
    expiresIn: "6hr",
  });
};

const validateAccessToken = async (accessToken: string) => {
  try {
    const payload: any = jwt.verify(accessToken, configs.JWT_ACCESS_TOKEN);
    const user = await User.findById(payload._id);

    if (isNil(user)) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
};

const getRefreshToken = async (payload: any) => {
  return jwt.sign(payload, configs.JWT_REFRESH_TOKEN, {
    algorithm: jwtHashAlgorithm,
    expiresIn: "90d",
  });
};

const validateRefreshToken = async (refreshToken: string) => {
  try {
    const payload: any = jwt.verify(refreshToken, configs.JWT_REFRESH_TOKEN);
    const user = await User.findById(payload._id);

    if (isNil(user)) {
      return null;
    }
    return user._id;
  } catch (e) {
    return null;
  }
};

export {
  getAccessToken,
  validateAccessToken,
  getRefreshToken,
  validateRefreshToken,
};
