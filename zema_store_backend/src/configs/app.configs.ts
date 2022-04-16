import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "JwtSecret";
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY || "";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_NUMBER = process.env.TWILIO_NUMBER || "";

const configs = {
  DATABASE_URL,
  PORT,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  SEND_GRID_API_KEY,
};

export default configs;
