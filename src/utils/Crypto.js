import cryptoJS from "crypto-js";

export default class Crypto {
  static encrypt(text, key) {
    try {
      if (!key) return btoa(text);
      return cryptoJS.AES.encrypt(text, key);
    } catch (err) {
      throw new Error(err);
    }
  }

  static decrypt(encrypted, key) {
    try {
      if (!key) return atob(encrypted);
      return cryptoJS.AES.decrypt(encrypted, key);
    } catch (err) {
      throw new Error(err);
    }
  }
}
