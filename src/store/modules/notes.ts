import { ActionContext } from 'vuex';
import { supabase } from "@/supabase";

interface Note {
  homescreen: string;
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
    const noteToArchive = state.notes.find(note => note.id === noteId);
    if (noteToArchive) {
      noteToArchive.isHomescreenArchived = true;
    }
  },
  updateNotePriority(state: State, payload: {noteId: number, levelOne: boolean, levelTwo: boolean, levelThree: boolean}) {
    const noteToUpdate = state.notes.find(note => note.id === payload.noteId);
    if (noteToUpdate) {
      noteToUpdate.levelOne = payload.levelOne;
      noteToUpdate.levelTwo = payload.levelTwo;
      noteToUpdate.levelThree = payload.levelThree;
    }
  },
  deleteNote(state: State, noteId: number) {
    state.notes = state.notes.filter(note => note.id !== noteId);
},
};

const actions = {
  async fetchNotes({ commit }: ActionContext<State, unknown>) {
    const { data, error } = await supabase
      .from('notes')
      .select('homescreen, kreator, id, isHomescreenArchived, levelOne, levelTwo, levelThree')
      .order('id');

    if (error) {
      console.error(error);
      throw error;
    }

    commit('setNotes', data);
    commit('setDataLoaded', true);
  },
  async archiveNote({ commit }: ActionContext<State, unknown>, noteId: number) {
    const { data, error } = await supabase
      .from('notes')
      .update({ isHomescreenArchived: true })
      .eq('id', noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit('archiveNote', noteId);
  },
  async updateNotePriority({ commit }: ActionContext<State, unknown>, payload: {noteId: number, levelOne: boolean, levelTwo: boolean, levelThree: boolean}) {
    const { data, error } = await supabase
      .from('notes')
      .update({
        levelOne: payload.levelOne,
        levelTwo: payload.levelTwo,
        levelThree: payload.levelThree
      })
      .eq('id', payload.noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit('updateNotePriority', payload);
  },
  async deleteNote({ commit }: ActionContext<State, unknown>, noteId: number) {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      console.error(error);
      throw error;
    }

    commit('deleteNote', noteId);
},
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};