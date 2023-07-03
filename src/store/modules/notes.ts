import { ActionContext } from "vuex";
import { supabase } from "@/supabase";

interface Note {
  homescreen: string;
  user_id: string;
  kreator: string;
  id: number;
  isHomescreenArchived: boolean;
  levelOne: boolean;
  levelTwo: boolean;
  levelThree: boolean;
}

interface State {
  notes: Note[];
  isDataLoaded: boolean;
}

const state: State = {
  notes: [],
  isDataLoaded: false,
};

const mutations = {
  setNotes(state: State, notes: Note[]) {
    state.notes = notes;
  },
  setDataLoaded(state: State, isLoaded: boolean) {
    state.isDataLoaded = isLoaded;
  },
  archiveNote(state: State, noteId: number) {
    const noteToArchive = state.notes.find((note) => note.id === noteId);
    if (noteToArchive) {
      noteToArchive.isHomescreenArchived = true;
    }
  },
  updateNotePriority(
    state: State,
    payload: {
      noteId: number;
      levelOne: boolean;
      levelTwo: boolean;
      levelThree: boolean;
    }
  ) {
    const noteToUpdate = state.notes.find((note) => note.id === payload.noteId);
    if (noteToUpdate) {
      noteToUpdate.levelOne = payload.levelOne;
      noteToUpdate.levelTwo = payload.levelTwo;
      noteToUpdate.levelThree = payload.levelThree;
    }
  },
  deleteNote(state: State, noteId: number) {
    state.notes = state.notes.filter((note) => note.id !== noteId);
  },
  addNote(state: State, note: Note) {
    state.notes.push(note);
  },
  returnNote(state: State, noteId: number) {
    const noteToReturn = state.notes.find((note) => note.id === noteId);
    if (noteToReturn) {
      noteToReturn.isHomescreenArchived = false;
    }
  },
};

const actions = {
  async fetchNotes({ commit }: ActionContext<State, unknown>) {
    const { data, error } = await supabase
      .from("notes")
      .select(
        "homescreen, kreator, id, isHomescreenArchived, levelOne, levelTwo, levelThree"
      )
      .order("id");

    if (error) {
      console.error(error);
      throw error;
    }

    commit("setNotes", data);
    commit("setDataLoaded", true);
  },

  async addNote(
    { commit, dispatch }: ActionContext<State, unknown>,
    note: Note
  ) {
    const { data, error } = await supabase.from("notes").insert([note]);

    if (error) {
      console.error("Error inserting note:", error);
      throw error;
    }

    if (!data && error) {
      console.error(
        "Data is null, note might not have been inserted correctly"
      );
      throw new Error(
        "Data is null, note might not have been inserted correctly"
      );
    }

    console.log("Note added successfully");
    dispatch("fetchNotes");
  },
  async archiveNote({ commit }: ActionContext<State, unknown>, noteId: number) {
    const { data, error } = await supabase
      .from("notes")
      .update({ isHomescreenArchived: true })
      .eq("id", noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit("archiveNote", noteId);
  },
  async updateNotePriority(
    { commit }: ActionContext<State, unknown>,
    payload: {
      noteId: number;
      levelOne: boolean;
      levelTwo: boolean;
      levelThree: boolean;
    }
  ) {
    const { data, error } = await supabase
      .from("notes")
      .update({
        levelOne: payload.levelOne,
        levelTwo: payload.levelTwo,
        levelThree: payload.levelThree,
      })
      .eq("id", payload.noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit("updateNotePriority", payload);
  },
  async deleteNote({ commit }: ActionContext<State, unknown>, noteId: number) {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit("deleteNote", noteId);
  },
  async returnNote({ commit }: ActionContext<State, unknown>, noteId: number) {
    const { data, error } = await supabase
      .from("notes")
      .update({ isHomescreenArchived: false })
      .eq("id", noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit("returnNote", noteId);
  },
};

const getters = {
  notesCount: (state: State) => state.notes.length,
  archivedNotes: (state: State) =>
    state.notes.filter((note) => note.isHomescreenArchived),
  unarchivedNotes: (state: State) =>
    state.notes.filter((note) => !note.isHomescreenArchived),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
