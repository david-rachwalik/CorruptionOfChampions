// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Storage
// https://betterprogramming.pub/creating-localstorage-wrapper-with-typescript-7ff6b71b35cb
class Storage {
    constructor(getStorage = () => window.localStorage) {
        this.storage = getStorage();
    }
    get(key) {
        return this.storage.getItem(key);
    }
    set(key, value) {
        this.storage.setItem(key, value);
    }
    clearItem(key) {
        this.storage.removeItem(key);
    }
    clearItems(keys) {
        keys.forEach((key) => this.clearItem(key));
    }
}
export { Storage };
//# sourceMappingURL=storage.js.map