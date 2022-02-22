// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Storage
// https://betterprogramming.pub/creating-localstorage-wrapper-with-typescript-7ff6b71b35cb

interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class Storage {
  private readonly storage: IStorage;

  constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }

  get(key: string): string {
    return this.storage.getItem(key) || '';
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  clearItem(key: string): void {
    this.storage.removeItem(key);
  }

  clearItems(keys: string[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}

export { Storage };
