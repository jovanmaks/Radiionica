// store/modules/notes.ts

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
  }

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
  }


};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
