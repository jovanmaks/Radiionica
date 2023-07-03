import { ActionContext } from "vuex";
import { supabase } from "@/supabase";
import QRCode from "qrcode";
import { FileSharer } from "capacitor-plugin-filesharer";

export interface Inventar {
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
  datetime: Date;
  datetime_isNotified: boolean;
  kreator: string;
  qr_code: string;
  isArchived: boolean;
  templejt: string[];
}

interface State {
  inventar: Inventar[];
  isDataLoaded: boolean;
  templejtValues: [];
}

const state: State = {
  inventar: [],
  isDataLoaded: false,
  templejtValues: [],
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
  setTemplejtValues(state: State, templejtValues: []) {
    state.templejtValues = templejtValues;
  },
};

const actions = {
  async fetchInventar({ commit }: ActionContext<State, unknown>) {
    const { data, error } = await supabase
      .from("Inventar")
      .select("*")
      .order("id");

    // .select("deklaracija, kreator, id, text_1_label")
    // if (data) {
    //   let templejtValues = data.map(item => item.templejt && item.templejt[0] ? item.templejt[0] : null);
    //   // Remove nulls and duplicates
    //   templejtValues = templejtValues.filter((value, index, self) => {
    //     return value && self.indexOf(value) === index;
    //   });
    //   commit('setTemplejtValues', templejtValues);
    // }

    if (error) {
      console.error(error);
      throw error;
    }

    commit("setInventar", data);
    commit("setDataLoaded", true);
  },
  async createInventar(
    { commit }: ActionContext<State, unknown>,
    inventar: Partial<Inventar>
  ) {
    const { data, error } = await supabase.from("Inventar").insert([inventar]);

    if (error) {
      console.error(error);
      throw error;
    }

    // Assuming that 'data' contains the inserted Inventar...
    // commit('addInventar', data);
    if (data && (data as Inventar[]).length > 0) {
      commit("addInventar", data[0]);
    } else {
      console.error("Unexpected response format. Expected array of Inventar.");
    }
  },

  async generateQRCode(_: ActionContext<State, unknown>, dataObject: Inventar) {
    try {
      const dataString =
        "Deklaracija: " +
        dataObject.deklaracija +
        "\n" +
        "Kolicina: " +
        dataObject.kolicina +
        "\n" +
        "Cena: " +
        dataObject.cena +
        "\n" +
        dataObject.num_1_label +
        ": " +
        dataObject.num_1 +
        "\n" +
        dataObject.num_2_label +
        ": " +
        dataObject.num_2 +
        "\n" +
        dataObject.text_1_label +
        ": " +
        dataObject.text_1 +
        "\n" +
        dataObject.text_2_label +
        ": " +
        dataObject.text_2 +
        "\n" +
        dataObject.switch_1_label +
        ": " +
        dataObject.switch_1 +
        "\n" +
        dataObject.switch_2_label +
        ": " +
        dataObject.switch_2 +
        "\n" +
        "Datetime: " +
        dataObject.datetime +
        "\n" +
        "Kreator: " +
        dataObject.kreator;

      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, dataString);
      const dataUrl = canvas.toDataURL("image/jpeg");

      return dataUrl;
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  },
  async shareQRCode(_: ActionContext<State, unknown>, qrCodeDataUrl: string) {
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async function () {
        if (typeof reader.result === "string") {
          const base64data = reader.result;
          await FileSharer.share({
            filename: "qrcode.png",
            base64Data: base64data.split(",")[1], // remove the data url prefix
            contentType: "image/png",
            header: "Share QR Code", // add this line to add a header
          });
        } else {
          console.error("Unexpected data format. Expected base64 string.");
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error sharing QR code:", error);
    }
  },
};

const getters = {
  inventarCount: (state: State) => state.inventar.length,
  getInventarById: (state: State) => (id: number) => {
    return state.inventar.find((inventar) => inventar.id === id);
  },
  getInventarByDeklaracija: (state: State) => (deklaracija: string) => {
    return state.inventar.filter(
      (inventar) => inventar.deklaracija === deklaracija
    );
  },
  getAllInventar: (state: State) => {
    return state.inventar;
  },
  archivedInventar: (state: State) =>
    state.inventar.filter((inventar) => inventar.isArchived),
  unarchivedNotes: (state: State) =>
    state.inventar.filter((inventar) => !inventar .isArchived),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
