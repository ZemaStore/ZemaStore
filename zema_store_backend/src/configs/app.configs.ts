import path from "path";
import dotenv from "dotenv";
import serviceAccount from "../firebase/serviceAccountKey.json";
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const DATABASE_URL = process.env.DATABASE_URL || "";
const DATABASE_TEST_URL = process.env.DATABASE_TEST_URL || "";
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
  process.env.STRIPE_SUBSCRIPTION_PRODUCT_ID || "prod_LtAiuxsb26BPpG";

const GOOGLE_APPLICATION_CREDENTIALS = {
  type: "service_account",
  project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID || "",
  private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PK_ID || "",
  private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PK || "",
  client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL || "",
  client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID || "",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    process.env.GOOGLE_APPLICATION_CREDENTIALS_CERT_URL || "",
};

const GOOGLE_ANALYTICS_PROPERTY_ID =
  process.env.GOOGLE_ANALYTICS_PROPERTY_ID || 319939776;

const FCM_KEY = process.env.FCM_KEY || "";

const configs = {
  DATABASE_URL,
  DATABASE_TEST_URL,
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
  FCM_KEY,
};

export default configs;
