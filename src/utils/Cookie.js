export default class Cookie {
  static insert(key, value, isTransfromToJson = false) {
    try {
      if (isTransfromToJson) {
        localStorage.setItem(key, JSON.stringify(value));
        return Cookie.select(key, null, true);
      }

      return localStorage.setItem(key, value);
      return Cookie.select(key);
    } catch (err) {
      throw new Error(err);
    }
  }

  static select(key, alternative = null, isJsonParsed = false) {
    try {
      if (isJsonParsed) return JSON.parse(localStorage.getItem(key));

      return localStorage.getItem(key) || alternative;
    } catch (err) {
      throw new Error(err);
    }
  }

  static check(key) {
    try {
      return Cookie.select(key) ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }
}
