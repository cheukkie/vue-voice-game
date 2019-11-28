import Vuex from 'vuex';
import Vue from 'vue';

// import players from './modules/players.store';
import modules from './modules';

// Load Vuex
Vue.use(Vuex);

// Create store
const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
});

// Check if initStore exists in all modules,
// if so, dispatch it
Object.keys(modules).forEach((moduleName) => {
  if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
    store.dispatch(`${moduleName}/initStore`);
  }
});

export default store;
