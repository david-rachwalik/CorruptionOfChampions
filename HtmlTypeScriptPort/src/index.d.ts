// https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.png' {
  const value: any;
  export default value;
}
