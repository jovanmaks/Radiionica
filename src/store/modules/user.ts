import { ActionContext } from "vuex";
import { supabase } from "@/supabase";



interface State {
  selectedProject: string | null;
  username: string | null;
  user: any | null;
  userProfiles: any[] | null; // Add this line
  selectedUsers: string[];
  team: string[] | null; // Added line
  // team: VueReactive<string[]>; // Added line

}

const state: State = {
  selectedProject: localStorage.getItem("selectedProject") || null,
  username: null,
  user: null,
  userProfiles: null, // And this line
  selectedUsers: [],
  team: null, // And this line
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
  setTeam(state: State, team: string[]) {
    state.team = team;
  },
  // setTeam(state: State, team: string[]) {
  //   state.team = Vue.reactive(team);
  // },
  
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

  // async signIn(
  //   { commit, dispatch }: ActionContext<State, unknown>,
  //   credentials: any
  // ) {
  //   const { data, error } = await supabase.auth.signInWithPassword(credentials);
  //   if (error) {
  //     console.error("Error in signIn:", error.message);
  //     throw error;
  //   }

  //   if (data?.user) {
  //     commit("setUser", data.user);
  //     // After user sign in, fetch and commit the username.
  //     dispatch("fetchUsername", data.user.id);
  //   }

  //   return {};
  // },
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
      // Fetch the team for the signed in user
      dispatch("fetchTeam");
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
  async fetchTeam({ commit, state }: ActionContext<State, unknown>) {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("team") // make sure your table has a column named 'team'
      .eq("id", state.user.id)
      .limit(1);

    if (error) {
      console.error("Error fetching user team:", error);
      throw error;
    }

    if (profiles && profiles.length > 0) {
      commit("setTeam", profiles[0].team || []);
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

  async updateTeam({ commit, state }: ActionContext<State, unknown>, userId: string) {
    console.log("Received userId:", userId);

    const { data, error } = await supabase
        .from("profiles")
        .update({
            team: `{${state.selectedUsers.map((id) => `"${id}"`).join(",")}}`,
        })
        .eq("id", userId);

    console.log("IDDDDDD", userId);

    if (error) {
        console.error("Error updating team:", error);
        throw error;
    }

    console.log("Updated row:", data);
    
    commit("setTeam", state.selectedUsers);
},


};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
