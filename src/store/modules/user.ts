import { ActionContext } from 'vuex';
import { supabase } from "@/supabase";

interface State {
  selectedProject: string | null;
  username: string | null;
  user: any | null;
  userProfiles: any[] | null; // Add this line
}

const state: State = {
  selectedProject: localStorage.getItem('selectedProject') || null,
  username: null,
  user: null,
  userProfiles: null, // And this line
};

const mutations = {
  setSelectedProject(state: State, selectedProject: string) {
    state.selectedProject = selectedProject;
    localStorage.setItem('selectedProject', selectedProject);
  },
  setUsername(state: State, username: string) {
    state.username = username;
  },
  setUser(state: State, user: any) {
    state.user = user;
  },
  resetState(state: State) {
    state.selectedProject = null;
    state.username = null;
    state.user = null;
    localStorage.removeItem('selectedProject');
  },
  setUserProfiles(state: State, userProfiles: any[]) {
    state.userProfiles = userProfiles;
  },
};

const actions = {
  async fetchUsername({ commit }: ActionContext<State, unknown>, userId: string) {
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
  async signIn({ commit, dispatch }: ActionContext<State, unknown>, credentials: any) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      console.error("Error in signIn:", error.message);
      throw error;
    }

    if (data?.user) {
      commit('setUser', data.user);
      // After user sign in, fetch and commit the username.
      dispatch('fetchUsername', data.user.id);
    }

    return {};

  },



  async signOut({ commit }: ActionContext<State, unknown>) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      commit('resetState');
    } catch (error) {
      console.log("Error signing out:", error);
    }
  }, 


  async fetchUserProfiles({ commit }: ActionContext<State, unknown>) {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.log("Error fetching user profiles:", error);
      throw error;
    }

    if (profiles) {
      commit('setUserProfiles', profiles);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};



