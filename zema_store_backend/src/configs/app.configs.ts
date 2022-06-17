import path from "path";
import dotenv from "dotenv";
import serviceAccount from "../firebase/serviceAccountKey.json";
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
  process.env.STRIPE_SUBSCRIPTION_PRODUCT_ID || "prod_LtAiuxsb26BPpG";

// const GOOGLE_APPLICATION_CREDENTIALS = {
//   type: "service_account",
//   project_id: "engaged-proxy-350821",
//   private_key_id: "a04c557d4a7bd3f056d442e908f35370ebc07ea3",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDL5AvnnGCGLTnC\nlqOcGzaM0PdDNYRItZEMKiBR7xWbW65tXLC/yWEqUoNSA7h+Qi//Ex6EG+i5E6J9\nSs4zB/3wvjl+ujYUAqlBmlbjuZD25YMrMYdfii0HNRcMv20g0RO7BqFQaQLso/Yq\n/qbrL63YTSP/AMa3KhCMYRA339fHEkgathC5KBk0iCvFUht+D0rjEl4MBYkHfEpk\nYruTKC3GdeYy3yBYqR2ZCJzAJXci2ogLD8Cv6l3PUyWGjIXP2ugblzMSj9kPf66a\nTtdTZyFmxpNvmYiLZ6dgHOmvJTbFxCGkSqwdNF2LqbukUO4eEsggHyPjIgB1481D\nOlwh94fpAgMBAAECggEAAMnRZM4xbCQuqYdNfrU6+DqaMiZvkfsK+jR9WG2iH8j7\n6PZtpRgx4GXP+zlngg/KLquE4OplQNwqsVJA6ogUGftHJsgV8l6QcAXzMAuSNhzx\nuUgmBZ8+1hp27EuzlRcqp35IHN0tv4Mk+35g23NpIhVDNnXy1RIXBIAVrSwy2TjL\nPIkqSNiiDveZzLJ1mqOYSdynr1cxAmdRL+rp3py8E5iVJWf8qzqzToBOWAi4MO5l\nVZlEuWvWdUqkGhbOZGr0xT0irD8n/HDr4WPMIk2QQ+5ZieV3a7apSfV01Hkoomb5\n0BOESJa41oAIpLwRJZ3yQi2FlfUQ3bjneZrAz4fmtwKBgQDqnOlZlsfGNBFWMqlH\nxu/auMDjYBYJRMHOx48NXiRb9ixMtnVGJ/Wn3ImdgaNaRjYBa/wOp5grhLkEtHTq\nkrqJ6NaIE5CqJUjSWAB+lJKqfISdFJV6xheO8FbUZkrGO5juPytf3KJE62nFjDG7\nGGxJ/x58jFzY8MMSQsN45IghAwKBgQDeei6qyaTzE3EqC82YvY0EneGWKjyC2Ff0\nIDuiPSKULzjBGmJOOdgkW1KongaPKV2Lvy0vz52R4R+btvOnuMLyiKgzA2KaB0ZO\niKNzw9gDLxT6/WMr4Ls8ePLkJW/pOOzXH05kNgBDYYzjg4UpU3umxOkrkpPUjNMX\nOCjdmjiBowKBgG8Gjo9tAWFUppeqJd3n0P4qzG1NvV/pf+YBHjtvP7mdR92NwvXO\nVzx261D0Vn+UFl6Z4ZB101dU2dHWLDYN9eTpoQyIZb9/IXUZXDKK0NWJU6CaaxrM\nv71PE2g0eFJTRc4JatdUrB39YfKwo6AssKJb7ut16UJovYfYvHRrgdhNAoGBAJgq\np6qm2sxrOtaQViInW8GRnw8Pem3gPWA7f6469GC4X7AsNJrek4hicgnkdAYNO+9u\nZiCyd0qk2PKvUr4f8C7k625g3VsOqLbkXC+8/w1GcaouD1uejVISQ8dqF75D8jI9\nNmfyS4HKwguHFFgswoFRY04rJjOV0neqMMFJT2bTAoGASMioDOE9CrTHSe+FT1Cs\noQl22CjXUN6chxKVtCEHbqMuuOkmw1Y2GETsh043QbO2RQ9SIpkrKMDXQjUB2Wgd\nm6JwM9gpBsGI2y5ovUwiRE8K0DjRsCidnnmyEQMdR2wybj6YUvizqnHpoavo+ABw\nBYr30YUce175jkzUHBwdwvw=\n-----END PRIVATE KEY-----\n",
//   client_email: "zemastore@engaged-proxy-350821.iam.gserviceaccount.com",
//   client_id: "116639743452275489006",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/zemastore%40engaged-proxy-350821.iam.gserviceaccount.com",
// };

const GOOGLE_APPLICATION_CREDENTIALS = {
  type: "service_account",
  project_id: "engaged-proxy-350821",
  private_key_id: "eee143318901b73d2882c2a003a2156d463998e4",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+lUpgSEA1JmPg\nWC/iMgkSgrLmEGz+iCHOa2kEq7aV++BW3FuGW213/MNb0RF9NtRLj/nMgWjxNBSJ\nKgqEQJB0HpXQ7i5s+z8XQSR4cGjsCESHC2ozcMZPjXz2EX/Am54nld9jT7yEf4M2\nhdrmdHxj19TxEvnmXXpvPDeQVtDk9uB5k//OiXyEPygzPKEwItEbHcl0X9MVIdXB\nmfy+RsiNqcdX7EeG53TKYrt48+H6ekY1BLoytoXgxKgRfjR5XqwAlQvxxWtE5Czm\n7cdDm/HnSad4UhlTMW3IRUOERDTAgUTMILl+6iQA+3os10EeeiGo4M18ecbbxwye\nRr91UDQtAgMBAAECggEAWd+6Ksx3pvjbKa08q30wBRAogFDnrWKSGq9RX3gAixs0\nEJIrASG1blt+3xopFrTYCWg0gynVzMVkF8kBG5v84x2XRedEcnVLK9K2+ar8963w\nbwTFiMuaYWKWNs5KwhBA1WcaaNFt08f0Hy6ha4MsM8NQ8nyh525WsgUiKMmgChDH\nsbo9PurNozb72QEI/f/V6NrtBmIs9LObplGrHwkO/CSS6Oelzu+cnVy1DKc4lX1d\n1Qhiw4ttNxiEjRCqlOH+Bv1KVmPJiK8S7dhankGn2hdmr55NBKkDGeUyZC90FJa+\nb0I+N/xPfCztCc0syGOxczi1bo6WCuGKm6FYOLO3awKBgQDgQOpr0yzJJAAPXdEe\nRXuIbEbICeKTeZm0e9hA2F2U/IAM3wgv02KDB3D00QXzesaoLM7aEgVORQEcMjMc\ntFbu/x2hT/bGAFgt5ccNS7U4RnSjGO6ygsc1XK4Or9FtCtKLp4Hx0k1DhFvfd9L7\n7Ed7DkJnRdqIXESqaJ4x30GP8wKBgQDZkCOQAS01NWALGqthQt9Hpm31IAdkAWUy\nQg4+ScgI7VB8UH0XiO5qWJivfzoj65rKH/+SX2/Re7fJeG3oCnCNTnDQ8BNBxNE2\n9o34UOL7+s2p0Kq4RtZLduHqVKm2fhLtIQ2EApbXvm9kxtUTTh3xn14vjLCPQJ0H\n+VCaIHBTXwKBgDi+VFLaSX/P2zAINizpuftoInTlg257m3f+ylaGKQ/U4HXhTYoE\ne+3ZySw5Y78bNv9A70pguvT2IvTGgwZlX4X0CcRSnoe1eJqMhNSJbp6BvWuzmFqV\nGuEWxXgz5tMnpOTvisLsyt4ltLWT9VAHloK9tfG5zDUq27ke5cCK1GUfAoGBAJZF\n0/p8hZBR/LPOyP9WJEkmMJ72b4Ro3lAXhiUJ60wXNteW9MBTyXHVHilh9HOpIfJo\npauhleeYz7ouH6P9yf4gZxY6LOLpoiSXqjoRDKdFddbMlY7RBuV7CNJFhi/R5xq5\nEM/UxgHgvKpcGALMmywwiurG/5EC7TP7xeufalZ7AoGBAJl50DZdBniYY64cKnq7\nRbhLFBI07PsUOx/4ujwHUlkeaYYv8AuYf0grSgPGFNvM/OWZsKeCaYY0LAUvJR3l\nwbrhKMC+lRPkkFt6P7u8eieg7yIXGqCSMCFHZl7q3sH2GYhmxqmj0BMsoCmMORwx\n1xbXbeqV3dN+urnBJg+93plA\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-28jrt@engaged-proxy-350821.iam.gserviceaccount.com",
  client_id: "111921010993757655426",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-28jrt%40engaged-proxy-350821.iam.gserviceaccount.com",
};

const GOOGLE_ANALYTICS_PROPERTY_ID = 319939776;

const FCM_KEY = process.env.FCM_KEY || "";

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
  FCM_KEY,
};

export default configs;
