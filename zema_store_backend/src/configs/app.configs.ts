import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 3000;
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || "JwtSecret";
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || "JwtRefreshToken";
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY || "";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_NUMBER = process.env.TWILIO_NUMBER || "";
const CLOUD_NAME = process.env.CLOUD_NAME || "";
const API_SECRET = process.env.API_SECRET || "";
const API_KEY = process.env.API_KEY || "";
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_SUBSCRIPTION_PRODUCT_ID =
  process.env.STRIPE_SUBSCRIPTION_PRODUCT_ID || "";
const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "";

const GOOGLE_ANALYTICS_PROPERTY_ID =
  process.env.GOOGLE_ANALYTICS_PROPERTY_ID || "";

const configs = {
  DATABASE_URL,
  PORT,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  SEND_GRID_API_KEY,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  STRIPE_API_KEY,
  STRIPE_SUBSCRIPTION_PRODUCT_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
  GOOGLE_ANALYTICS_PROPERTY_ID,
};

export default configs;
