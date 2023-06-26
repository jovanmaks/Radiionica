import { createStore } from 'vuex';
import { supabase } from "@/supabase"; // adjust this path according to your project setup



interface State {
  selectedProject: string | null;
  username: string | null;
  user: any | null; // New state property for the user
}

const store = createStore<State>({
  state: {
    selectedProject: localStorage.getItem('selectedProject') || null,
    username: null,
    user: null, // Initialize user as null
  },

////////////////////////////// MUTATIONS  //////////////////////////////
  mutations: {
    setSelectedProject(state, selectedProject: string) {
      state.selectedProject = selectedProject;
      localStorage.setItem('selectedProject', selectedProject);
    },
    setUsername(state, username: string) {
      state.username = username;
    },
    setUser(state, user: any) { // New mutation for setting the user
      state.user = user;
    },
    resetState(state) {
      // Reset the state
      state.selectedProject = null;
      state.username = null;
      state.user = null; // Also reset the user
    },
  },

////////////////////////////// ACTIONS  //////////////////////////////
  actions: {
    async fetchUsername({ commit }, userId) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.log("Error fetching username:", error);
        throw error;
      }
      
      if (profile) {
        commit('setUsername', profile.username);
      }
    },
    
    async signIn({ commit }, credentials) {
      try {
        const response = await supabase.auth.signInWithPassword(credentials);
        if (response.error) {
          return { error: response.error };
        }
        const user = supabase.auth.getUser(); // fetch user after signIn
        commit('setUser', user);
        return {}; // return empty object when no error
      } catch (error) {
        console.error('Error in signIn:', (error as Error).message);
        throw error; // Or return the error here instead of throwing it
      }
    },
    

    async signOut({ commit }) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error; // handle the error as you see fit
  
        // If sign-out was successful, reset the Vuex state
        commit('resetState');
  
        // Also, clear any other data from local storage
        localStorage.removeItem('selectedProject');
  
      } catch (error) {
        console.log("Error signing out:", error);
        // handle the error as you see fit
      }
    }
  },
})

export default store;
