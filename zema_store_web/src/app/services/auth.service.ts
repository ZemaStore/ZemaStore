import encryption from "../../utils/encryption";
import { baseUrl } from ".";
import jwt_decode from "jwt-decode";
import Request from "../api/request";
import configs from "../../helpers/configs";

const login = async (user: any) => {
  const { email, password } = user;

  try {
    const { data } = await Request.post(`${baseUrl}/auth/admin-sign-in`, {
      email,
      password,
    });
    console.log("data is ", data);
    if (data.accessToken) {
      updateToken(data.accessToken);
    }

    let decoded = jwt_decode(data.accessToken);
    localStorage.setItem(
      configs.PROFILE_KEY,
      encryption.encrypt(decoded).toString()
    );
    return { data: decoded };
  } catch (error) {
    throw new Error("INVALID EMAIL OR PASSWORD!");
  }
};
const logoutServerOnly = async () => {
  const accessToken = encryption.decrypt(
    localStorage.getItem(configs.ACCESS_TOKEN_KEY)
  );
  console.log("acc ", accessToken)
  try {
    const { data } = await Request.patch(`${baseUrl}/auth/logout`, {
      accessToken,
    });
    return { data };
  } catch (error) {
    throw new Error("There is an error!");
  }
};

const logoutClientOnly = async () => {
  localStorage.clear();
};

const updateToken = (accessToken: any) => {
  localStorage.setItem(
    configs.ACCESS_TOKEN_KEY,
    encryption.encrypt(accessToken).toString()
  );
};
const getAccessToken = () => {
  return encryption.decrypt(localStorage.getItem(configs.ACCESS_TOKEN_KEY));
};

const getProfile = () => {
  return encryption.decrypt(localStorage.getItem(configs.PROFILE_KEY));
};

const getRole = () => {
  return getProfile() && getProfile().role;
};

const isAuthenticated = () => {
  // const accessToken = localStorage.getItem(configs.ACCESS_TOKEN_KEY);
  // return accessToken !== null && accessToken !== "undefined";
  return getAccessToken() !== null && getAccessToken() !== "undefined";
};

const AuthService = {
  login,
  logoutClientOnly,
  updateToken,
  getAccessToken,
  getProfile,
  getRole,
  isAuthenticated,
  logoutServerOnly,
};

export default AuthService;
