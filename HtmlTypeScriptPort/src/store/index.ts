import { InjectionKey, State } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

// Create a new store instance
export const store = createStore<State>({
  state: {
    count: 0,
  },
});

// Override to pass injection key
export function useStore() {
  return baseUseStore(key);
}
