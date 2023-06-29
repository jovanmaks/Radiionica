import { createStore } from 'vuex';
import user from './modules/user';
import notes from './modules/notes';
// import inventory from './modules/inventory';

const store = createStore({
  modules: {
    user,
    notes,
    // inventory,
  },
});

export default store;


