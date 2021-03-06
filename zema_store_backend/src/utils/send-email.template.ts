/* istanbul ignore next */
export const verifyEmailTemplate = (otpCode, to) => `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema Store</a>
              </div>
              <p style="font-size:1.1em">Hi, ${to}</p>
              <h4>Please verify your email</h4>
              <p>Thank you for choosing Zema Store Platform. Use the following Code to complete your Sign Up procedures. The code is valid only for 10 minutes</p>
              <h4 style="background: #00466a;margin: 0 auto;width: max-content;padding: 10px 30px;color: #fff;border-radius: 4px;">
                ${otpCode}
              </h4>
              <p style="font-size:0.9em;">Regards,<br />Zema Store</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Zema Store Inc</p>
              <p>Addis Ababa</p>
              <p>Ethiopia</p>
              </div>
          </div>
      </div>
      `;
/* istanbul ignore next */
export const resetPasswordEmailTemplate = (otpCode, to) => `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema Store</a>
                </div>
                <p style="font-size:1.1em">Hi, ${to}</p>
                <h4>Please Reset your password</h4>
                <p>Thank you for choosing Zema Store Platform.Use the following code to reset your password. The code is only valid for 10 minutes</p>
                <h4 style="background: #00466a;margin: 0 auto;width: max-content;padding: 10px 30px;color: #fff;border-radius: 4px;">
                ${otpCode}
                </h4>
                <p style="font-size:0.9em;">Regards,<br />Zema Store</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Zema Store Inc</p>
                <p>Addis Ababa</p>
                <p>Ethiopia</p>
                </div>
            </div>
        </div>
    
    `;

/* istanbul ignore next */
export const emailInviteTemplate = (to) => `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zema Store</a>
                </div>
                <p style="font-size:1.1em">Hi, ${to}</p>
                <h4>You are Invited to join Zema Store</h4>
                <p>Thank you for choosing Zema Store Platform.</p>
                <a href="https://zema-store.herokuapp.com/sign-up">Zema Store</a>
                <p style="font-size:0.9em;">Regards,<br />Zema Store</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Zema Store Inc</p>
                <p>Addis Ababa</p>
                <p>Ethiopia</p>
                </div>
            </div>
        </div>
        `;
