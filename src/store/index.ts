import { reactive } from "vue";

// // Ovo je novo
// const state = reactive({
//   user: null,
// });


// // Ovo je novo
// const methods = {
//   setUser(payload: Session){
//     state.user = payload ? payload.user : null;
//   }
// }

// // Ovo je novo
export default {
//   state,
//   methods, 
};

import { Session, User } from "@supabase/supabase-js"

export const store = reactive<{user: User | Record<string, unknown>}>({
  user: {},
})
