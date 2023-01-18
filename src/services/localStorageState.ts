const localStorageState = {
  setStorage(key: string, state: string): void {
    if (state) {
      localStorage.setItem(key, state);
    }
  },

  getStorage(key: string) {
    if (typeof localStorage.getItem(key) === "string") {
      return localStorage.getItem(key);
    } else {
      return null
    }
  },

  clearStorage() {
    localStorage.clear();
  },

  removeItemStorage(key: string) {
    localStorage.removeItem('keywords');
  }
};

export default localStorageState;