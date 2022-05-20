/* eslint-disable no-useless-escape */
const formValidator = {
  validatePhoneNumber(phone: string) {
    let pattern = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
    var digits = phone.replace(/\D/g, "");
    return pattern.test(digits);
  },
  validateName(name: string) {
    let pattern = new RegExp(/^[a-zA-Z\-]+$/);
    return pattern.test(name);
  },
  validateEmail(email: string) {
    let pattern = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return pattern.test(email.trim());
  },
  validateAccountNumber(number: number) {
    // let pattern = new RegExp(/^ [0 - 9]{ 7, 14}$/g)
    // return pattern.test(number)
    return !isNaN(number);
  },
  validateBirthdate(date: string) {
    let pattern = new RegExp(
      /^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4})$/
    );
    return pattern.test(date);
  },
  validateAmount(amount: string) {
    let pattern = new RegExp(/^-?\d+\.?\d*$/);
    return pattern.test(amount);
  },
  validatePassword(password: string) {
    let pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\\\$%\\\\^&\\\\*])(?=.{8,})"
    );
    return pattern.test(password);
    // return password.length < 8 ? false : true;
  },

  validateNameWithSpaces(name: string) {
    let pattern = new RegExp(/^[a-zA-Z].*[\s\.]*$/g);
    return pattern.test(name);
  },
};
export default formValidator;
