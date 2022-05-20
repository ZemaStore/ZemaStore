import CryptoJS from "crypto-js";
let key = "dsgdfg3465hfdfjgdsjfgdafbbfgdsfgdsjybhrththt465";

const encrypt = (data: any) => {
  // Encrypt
  return CryptoJS.AES.encrypt(JSON.stringify(data), `${key}`);
};

const decrypt = (data: any) => {
  //Decrypt
  try {
    let bytes = CryptoJS.AES.decrypt(data, `${key}`);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const encryption = {
  encrypt,
  decrypt,
};

export default encryption;
