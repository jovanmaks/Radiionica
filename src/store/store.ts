import { createStore } from 'vuex';

interface State {
  selectedProject: string | null;
}

 const store = createStore<State>({
  state: {
    selectedProject: localStorage.getItem('selectedProject') || null,
  },
  mutations: {
    setSelectedProject(state, selectedProject: string) {
      state.selectedProject = selectedProject;
      localStorage.setItem('selectedProject', selectedProject);
    },
    resetState(state) {
      // Reset the state
      state.selectedProject = null;
    },
  },
  actions: {
    signOut({commit}) {
      commit('resetState');
    }
  },
})

export default store;