import { ActionContext } from "vuex";
import { supabase } from "@/supabase";

interface State {
  selectedProject: string | null;
  username: string | null;
  user: any | null;
  userProfiles: any[] | null; // Add this line
  selectedUsers: string[];
  selectedTeams: string[];
}

const state: State = {
  selectedProject: localStorage.getItem("selectedProject") || null,
  username: null,
  user: null,
  userProfiles: null, // And this line
  selectedUsers: [],
  selectedTeams: [],
};

const mutations = {
  setSelectedProject(state: State, selectedProject: string) {
    state.selectedProject = selectedProject;
    localStorage.setItem("selectedProject", selectedProject);
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
    localStorage.removeItem("selectedProject");
  },
  setUserProfiles(state: State, userProfiles: any[]) {
    state.userProfiles = userProfiles;
  },
  addSelectedUser(state: State, userId: string) {
    // Added line
    state.selectedUsers.push(userId);
  },
  removeSelectedUser(state: State, userId: string) {
    // Added line
    state.selectedUsers = state.selectedUsers.filter((id) => id !== userId);
  },
  addSelectedTeam(state: State, teamId: string) {
    state.selectedTeams.push(teamId);
  },
  removeSelectedTeam(state: State, teamId: string) {
    state.selectedTeams = state.selectedTeams.filter((id) => id !== teamId);
  },
  forceUpdateSelectedTeams(state: State) {
    // Create a copy of selectedTeams to trigger Vue's reactivity
    state.selectedTeams = [...state.selectedTeams];
  },
};

const actions = {
  async fetchUsername(
    { commit, dispatch }: ActionContext<State, unknown>,
    userId: string
  ) {
    console.log("OVDJEEEE");
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .limit(1);

    console.log("OVDJEEEE");

    if (error) {
      console.log("Error fetching username:", error);
      throw error;
    }

    if (profiles.length > 0) {
      commit("setUsername", profiles[0].username);
    } else {
      console.log("Profile not found, creating a new one");
      // You'll need to create a user object that has the properties needed by `createUserProfile`
      const user = { id: userId };
      dispatch("createUserProfile", user);
    }
  },

  async signIn(
    { commit, dispatch }: ActionContext<State, unknown>,
    credentials: any
  ) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      console.error("Error in signIn:", error.message);
      throw error;
    }

    if (data?.user) {
      commit("setUser", data.user);
      // After user sign in, fetch and commit the username.
      dispatch("fetchUsername", data.user.id);
    }

    return {};
  },

  async createUserProfile(
    { commit }: ActionContext<State, unknown>,
    user: any
  ) {
    const { data: profiles, error: existingProfileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .limit(1);

    if (existingProfileError) {
      console.error("Error fetching user profile:", existingProfileError);
      throw existingProfileError;
    }

    if (profiles.length === 0) {
      const { error: createError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, email: user.email }]);

      if (createError) {
        console.error("Error creating user profile:", createError);
        throw createError;
      }
    }
  },

  async signOut({ commit }: ActionContext<State, unknown>) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      commit("resetState");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  },

  async fetchUserProfiles({ commit, state }: ActionContext<State, unknown>) {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*"); // Make sure "*" includes the `team` column or specify it explicitly

    if (error) {
      console.log("Error fetching user profiles:", error);
      throw error;
    }

    if (profiles) {
      commit("setUserProfiles", profiles);

      // Sync user selections
      const userProfile = profiles.find(
        (profile) => profile.id === state.user.id
      );
      if (userProfile && userProfile.team) {
        for (const userId of userProfile.team) {
          if (!state.selectedUsers.includes(userId)) {
            commit("addSelectedUser", userId);
          }
        }
      }
    }
  },

  addSelectedUser({ commit }: ActionContext<State, unknown>, userId: string) {
    // Added line
    commit("addSelectedUser", userId);
  },
  removeSelectedUser(
    { commit }: ActionContext<State, unknown>,
    userId: string
  ) {
    // Added line
    commit("removeSelectedUser", userId);
  },
  addSelectedTeam({ commit }: ActionContext<State, unknown>, teamId: string) {
    commit("addSelectedTeam", teamId);
  },
  removeSelectedTeam(
    { commit }: ActionContext<State, unknown>,
    teamId: string
  ) {
    commit("removeSelectedTeam", teamId);
  },
  async updateTeam({ state }: ActionContext<State, unknown>, userId: string) {
    console.log("Received userId:", userId); // This should be the id of the logged in user.

    const { data, error } = await supabase
      .from("profiles")
      .update({
        team: `{${state.selectedUsers.map((id) => `"${id}"`).join(",")}}`,
      }) // Postgres array syntax
      .eq("id", userId); // This should be comparing with the id of the logged in user.

    console.log("IDDDDDD", userId);

    if (error) {
      console.error("Error updating team:", error);
      throw error;
    }

    // Log the updated row
    console.log("Updated row:", data);
  },
  forceUpdateSelectedTeams({ commit }: ActionContext<State, unknown>) {
    commit('forceUpdateSelectedTeams');
},
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
