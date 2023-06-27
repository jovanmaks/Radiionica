import { ActionContext } from 'vuex';
import { supabase } from "@/supabase";

interface State {
  selectedProject: string | null;
  username: string | null;
  user: any | null;
}

const state: State = {
  selectedProject: localStorage.getItem('selectedProject') || null,
  username: null,
  user: null,
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
  
  async signIn({ commit }: ActionContext<State, unknown>, credentials: any) {
    try {
      const response = await supabase.auth.signInWithPassword(credentials);
      if (response.error) {
        return { error: response.error };
      }
      const user = supabase.auth.getUser();
      commit('setUser', user);
      return {};
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in signIn:', error.message);
      }
      throw error;
    }
  },

  async signOut({ commit }: ActionContext<State, unknown>) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      commit('resetState');
    } catch (error) {
      console.log("Error signing out:", error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
