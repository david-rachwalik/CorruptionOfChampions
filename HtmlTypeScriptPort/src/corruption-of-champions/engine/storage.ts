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

  public constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }

  protected get(key: string): string | null {
    return this.storage.getItem(key);
  }

  protected set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  protected clearItem(key: string): void {
    this.storage.removeItem(key);
  }

  protected clearItems(keys: string[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}

export { Storage };
