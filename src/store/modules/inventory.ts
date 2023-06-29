
import { ActionContext } from 'vuex';
import { supabase } from "@/supabase";

interface Inventar {
    id: number;
    deklaracija: string;
    kolicina: number;
    kolicina_notifikacija: number;
    kolicina_isNotified: boolean;
    cena: number;
    num_1_label: string;
    num_1: number;
    num_2_label: string;
    num_2: number;
    text_1_label: string;
    text_1: string;
    text_2_label: string;
    text_2: string;
    switch_1_label: string;
    switch_1: boolean;
    switch_2_label: string;
    switch_2: boolean;
    // date: Date;
    // time: string;
    datetime: Date;
    datetime_isNotified: boolean;
    qr_code: string;
  }
  
  interface State {
    inventar: Inventar[];
    isDataLoaded: boolean;
  }
  
  const state: State = {
    inventar: [],
    isDataLoaded: false,
  };
  
  const mutations = {
    setInventar(state: State, inventar: Inventar[]) {
      state.inventar = inventar;
    },
    setDataLoaded(state: State, isLoaded: boolean) {
      state.isDataLoaded = isLoaded;
    },
    addInventar(state: State, newInventar: Inventar) {
        state.inventar.push(newInventar);
      },
  };
  
  const actions = {
    async fetchInventar({ commit }: ActionContext<State, unknown>) {
      const { data, error } = await supabase
        .from('Inventar')
        .select('*')
        .order('id');
  
      if (error) {
        console.error(error);
        throw error;
      }
  
      commit('setInventar', data);
      commit('setDataLoaded', true);
    },
    async createInventar({ commit }: ActionContext<State, unknown>, inventar: Partial<Inventar>) {
        const { data, error } = await supabase
          .from('Inventar')
          .insert([inventar]);
    
        if (error) {
          console.error(error);
          throw error;
        }
    
        // Assuming that 'data' contains the inserted Inventar...
        commit('addInventar', data);
      },
  };
  
  const getters = {
    inventarCount: (state: State) => state.inventar.length,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  
