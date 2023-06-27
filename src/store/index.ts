import { createStore } from 'vuex';
import user from './modules/user';

const store = createStore({
  modules: {
    user,
  },
});

export default store;



// import { reactive } from "vue";



// // Ovo je novo
// export default {
// //   state,
// //   methods, 
// };

// import { Session, User } from "@supabase/supabase-js"

// export const store = reactive<{user: User | Record<string, unknown>}>({
//   user: {},
// })
