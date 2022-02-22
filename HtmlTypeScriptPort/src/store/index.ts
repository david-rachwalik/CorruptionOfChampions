import { InjectionKey, State } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { GameContext } from '../corruption-of-champions/game-context';

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

// Create a new store instance
export const store = createStore<State>({
  state: {
    count: 0,
    liveData: new GameContext(),
  },
});

// Override to pass injection key
export function useStore() {
  return baseUseStore(key);
}
