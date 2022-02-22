// https://next.vuex.vuejs.org/guide/typescript-support.html
// Putting in index.d.ts breaks compilation for some reason

import { Store } from 'vuex';
import { GameContext } from '../corruption-of-champions/game-context';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number;
    liveData: GameContext;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
