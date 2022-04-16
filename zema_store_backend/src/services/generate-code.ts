const Generate_OTP = () =>
  Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000
export default Generate_OTP
