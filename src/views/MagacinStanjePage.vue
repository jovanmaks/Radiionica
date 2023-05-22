<template>
  <base-layout page-title="Magacin" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-content class="content">
        <ion-refresher slot="fixed" @ionRefresh="loadData">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ion-fab slot="fixed" vertical="bottom" horizontal="center">
          <router-link to="/magacinUnesi">
            <ion-fab-button color="dark">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </router-link>
        </ion-fab>

        <div class="filter-icons-wrapper">
          <div class="filter-icons">
            <ion-button fill="clear" color="medium" @click="toggleFilter('polistirol')">
              <ion-icon :icon="flask"></ion-icon>
            </ion-button>
            <ion-button fill="clear" color="medium" @click="toggleFilter('poliuretan')">
              <ion-icon :icon="flask"></ion-icon>
            </ion-button>

            <ion-button fill="clear" color="medium" @click="toggleFilter('drvo')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
            <ion-button fill="clear" color="medium" @click="toggleFilter('medijapan')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
            <ion-button fill="clear" color="medium" @click="toggleFilter('iverica')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
          </div>
        </div>

        <ion-list>
          <ion-item v-for="(row, index) in filteredData" :key="index">
            <ion-label>
              Materijal: {{ row.materijal }}<br />
              Oblik: {{ row.oblik }}<br />
              Širina: {{ row.sirina }}<br />
              Dužina: {{ row.duzina }}<br />
              Debljina: {{ row.debljina }}
              Količina: {{ calculateQuantity(row) }}
            </ion-label>
            <ion-button fill="clear" @click="removeItem(row.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { trash, flask, diamond, add, leaf } from "ionicons/icons";
import { ref, computed } from "vue";
import { supabase } from "@/supabase";

import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  },
  setup() {
    const data = ref([]);
    const filters = ref(new Set());

    const loadData = async (event = null) => {
      try {
        const { data: fetchedData, error } = await supabase
          .from("Magacin") // replace 'your_table_name' with the actual table name in Supabase
          .select("*");

        if (error) {
          throw error;
        }

        data.value = fetchedData;
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (event) {
          event.target.complete();
        }
      }
    };

    const removeItem = async (id) => {
      try {
        const { error } = await supabase.from("Magacin").delete().match({ id });

        if (error) {
          throw error;
        }

        loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

    const calculateQuantity = (item) => {
  const { materijal, oblik, sirina, duzina, debljina } = item;
  const filteredItems = data.value.filter((row) => {
    return (
      row.materijal === materijal &&
      row.oblik === oblik &&
      row.sirina === sirina &&
      row.duzina === duzina &&
      row.debljina === debljina
    );
  });
  return filteredItems.length > 1 ? filteredItems.length : "";
};

    const toggleFilter = (filter) => {
      if (filters.value.has(filter)) {
        filters.value.delete(filter);
      } else {
        filters.value.add(filter);
      }
    };

    const filteredData = computed(() => {
  if (filters.value.size === 0) {
    return [];
  } else {
    const mergedItems = [];
    const processedItems = new Set();

    data.value.forEach((row) => {
      if (
        Array.from(filters.value).includes(row.materijal) &&
        !processedItems.has(row.id)
      ) {
        const { materijal, oblik, sirina, duzina, debljina } = row;
        const filteredItems = data.value.filter(
          (item) =>
            item.materijal === materijal &&
            item.oblik === oblik &&
            item.sirina === sirina &&
            item.duzina === duzina &&
            item.debljina === debljina
        );

        const mergedItem = { ...row, kolicina: filteredItems.length };
        mergedItems.push(mergedItem);
        filteredItems.forEach((item) => processedItems.add(item.id));
      }
    });

    return mergedItems;
  }
});

    loadData();

    return { calculateQuantity, data, loadData, removeItem, trash, toggleFilter, filteredData, flask, diamond, add, leaf };
  },
};
</script>

<style scoped>
.filter-icons-wrapper {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; */
  /* background-color: white; */
}

.filter-icons {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  /* width: 100%; */
}

.content {
  padding-top: 4.5rem;
}

.active {
  color: #ffffff !important;
  background-color: #009605 !important;
}
</style>
