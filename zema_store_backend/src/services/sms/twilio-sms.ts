import { Twilio } from "twilio";
import configs from "../../configs/app.configs";

const client = new Twilio(
  configs.TWILIO_ACCOUNT_SID,
  configs.TWILIO_AUTH_TOKEN
);

export const sendVerificationMessage = async (
  code: string,
  phoneNumber: string
) => {
  client.messages.create({
    from: configs.TWILIO_NUMBER,
    to: phoneNumber,
    body: code,
  });
};

