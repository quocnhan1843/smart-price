class Storage {
  setItem = (key, payload) => {
    window.localStorage.setItem(key, JSON.stringify(payload));
  };

  getItem = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return "";
    }
  };

  removeItem = (key) => {
    window.localStorage.removeItem(key);
  };
}

export default new Storage();
