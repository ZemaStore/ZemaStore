import { baseUrl } from ".";
import encryption from "../../utils/encryption";
import jwt_decode from "jwt-decode";
import Request from "../api/request";
export const ACCESS_TOKEN_KEY = "token";
export const PROFILE_KEY = "profile";

const AuthService: any = {
  async login(user: any) {
    const { email, password } = user;
    const { data } = await Request.post(`${baseUrl}/auth/signin`, {
      email,
      password,
    });
    if (data.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    }

    try {
      let decoded = jwt_decode(data.token);
      localStorage.setItem(PROFILE_KEY, encryption.encrypt(decoded));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(new Error("Unauthorized"));
    }
    //
  },
  logoutClientOnly() {
    localStorage.clear();
  },
  updateToken(token: any) {
    localStorage.setItem(ACCESS_TOKEN_KEY, encryption.encrypt(token));
  },
  getAccessToken: () =>
    encryption.decrypt(localStorage.getItem(ACCESS_TOKEN_KEY)),
  getProfile: () => encryption.decrypt(localStorage.getItem(PROFILE_KEY)),
  getRole() {
    return this.getProfile() && this.getProfile().role;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== "undefined";
  },
};

export default AuthService;
