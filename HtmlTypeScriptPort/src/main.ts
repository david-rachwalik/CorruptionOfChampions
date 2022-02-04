import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { key, store } from './store';

const app = createApp(App);
app.use(store, key); // State management
app.use(router); // Begin routing & history
app.mount('#app'); // Attach app to the DOM
