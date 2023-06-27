import { createStore } from 'vuex';
import user from './modules/user';
import notes from './modules/notes';

const store = createStore({
  modules: {
    user,
    notes,
  },
});

export default store;


