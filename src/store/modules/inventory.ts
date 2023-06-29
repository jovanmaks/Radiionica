
import { ActionContext } from 'vuex';
import { supabase } from "@/supabase";

interface Inventar {
    id: number;
    deklaracija: string;
    kolicina: number;
    cena: number;
    num_1_label: string;
    num_1: number;
    num_2_label: string;
    num_2: number;
    text_1_label: string;
    text_1: string;
    text_2_label: string;
    text_2: string;
    swich_1_label: string;
    switch_1: boolean;
    switch_2_label: string;
    switch_2: boolean;
    date: Date;
    time: string;
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
  


//   export default {
//       namespaced: true,
//       state,
//       mutations,
//       actions,
//       getters,
//   };