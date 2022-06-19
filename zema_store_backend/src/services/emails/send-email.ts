import sgMail from "@sendgrid/mail";
import configs from "../../configs/app.configs";
import {
  resetPasswordEmailTemplate,
  verifyEmailTemplate,
} from "../../utils/send-email.template";

const sendGridAPIKey: string = configs.SEND_GRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email: string, name: String) => {
  sgMail.send({
    from: "henok.adane@aait.edu.et",
    to: email,
    subject: "Welcome to our app!",
    html: `<h1> A warm welcome for joining our app, ${name}! </h1>`,
  });
};

const sendOtpCode = (email: string, name: string, code: string) => {
  sgMail.send({
    from: "henok.adane@aait.edu.et",
    to: email,
    subject: "Zema-Store password reset code",
    html: resetPasswordEmailTemplate(code, name),
  });
};

const sendVerifyEmailOtpCode = (email: string, name: string, code: string) => {
  sgMail.send({
    from: "henok.adane@aait.edu.et",
    to: email,
    subject: "Zema-Store password reset code",
    html: verifyEmailTemplate(code, name),
  });
};

const sendCancelationEmail = (email: string, name: String) => {
  sgMail.send({
    from: "henok.adane@aait.edu.et",
    to: email,
    subject: "Sorry to see you go!",
    text: "And this is the text along with HTML",
    html: `<h1> We're sorry to see you go, ${name}! </h1>`,
  });
};

export {
  sendWelcomeEmail,
  sendVerifyEmailOtpCode,
  sendOtpCode,
  sendCancelationEmail,
};
