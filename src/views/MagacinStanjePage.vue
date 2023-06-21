<template>
  <base-layout page-title="Магацин" page-default-back-link="/tabs">
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
            <ion-button fill="clear" :color="isFilterActive('polistirol') ? 'danger' : 'medium'"  @click="toggleFilter('polistirol')">
              <ion-icon :icon="flask"></ion-icon>
            </ion-button>
            <ion-button fill="clear" :color="isFilterActive('poliuretan') ? 'danger' : 'medium'" @click="toggleFilter('poliuretan')">
              <ion-icon :icon="flask"></ion-icon>
            </ion-button>

            <ion-button fill="clear" :color="isFilterActive('drvo') ? 'danger' : 'medium'" @click="toggleFilter('drvo')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
            <ion-button fill="clear" :color="isFilterActive('medijapan') ? 'danger' : 'medium'" @click="toggleFilter('medijapan')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
            <ion-button fill="clear" :color="isFilterActive('iverica') ? 'danger' : 'medium'" @click="toggleFilter('iverica')">
              <ion-icon :icon="leaf"></ion-icon>
            </ion-button>
          </div>
        </div>

        <ion-searchbar  @ionInput="handleInput($event)"></ion-searchbar>
        
        <ion-list>
          <ion-item v-for="(row, index) in displayData" :key="index">
              
  <ion-label>
    Biljeska: {{ row.biljeska }}<br />
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
  <ion-button fill="clear" @click="shareQRCode(row)">
    <ion-icon :icon="share"></ion-icon>
  </ion-button>
</ion-item>

        </ion-list>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { trash, flask, diamond, add, leaf, share } from "ionicons/icons";
import { ref, computed } from "vue";
import { supabase } from "@/supabase";
import { FileSharer } from 'capacitor-plugin-filesharer';
import { watch } from 'vue';

import {
  IonSearchbar,
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
    IonSearchbar,
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
    const searchQuery = ref("");
    const searchResults = ref([]);
    const displayData = ref([]);


  const qrCodeDataUrl = computed(() => {
    const row = data.value.find(item => item.qr_code);
    return row ? row.qr_code : null;
  });


  


const shareQRCode = async (row) => {
  try {
    const response = await fetch(row.qr_code);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async function() {
      const base64data = reader.result;
      await FileSharer.share({
        filename: 'qrcode.png',
        base64Data: base64data.split(',')[1], // remove the data url prefix
        contentType: 'image/png',
      });
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Error sharing QR code:', error);
  }
};


const loadData = async (event = null) => {
  try {
    const { data: fetchedData, error } = await supabase
      .from("Magacin") 
      .select("*");

    if (error) {
      throw error;
    }

    data.value = fetchedData;
    displayData.value = [...fetchedData];  // Initialize displayData with the fetched data
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
  const { materijal, oblik, sirina, duzina, debljina, biljeska } = item;
  const filteredItems = data.value.filter((row) => {
    return (
      row.biljeska === biljeska &&
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

  if (filters.value.size === 0) {
    displayData.value = [...data.value];
  } else {
    displayData.value = data.value.filter(item => filters.value.has(item.materijal));
  }
};




const filteredData = computed(() => {
  if (!searchQuery.value && filters.value.size === 0) {
    return data.value;
  }

  const query = searchQuery.value.toLowerCase();

  return data.value.filter(item => {
    const matchesFilter = filters.value.size > 0 
      ? filters.value.has(item.materijal) 
      : false;

    const matchesSearch = searchQuery.value 
      ? searchItem(item, query) 
      : false;

    return (matchesFilter && matchesSearch) || (filters.value.size === 0 && matchesSearch) || (searchQuery.value === '' && matchesFilter);
  });
});

const searchItem = (item, query) => {
  // Define fields you want to search in
  const searchFields = ['materijal', 'oblik', 'sirina', 'duzina', 'debljina', 'biljeska'];

  // Get only those fields from the item
  const itemValues = searchFields.map(field => item[field]).filter(value => value);

  console.log('Query:', query);
  console.log('Item values:', itemValues);

  // Check if any of the item values includes the search query
  return itemValues.some((value) => String(value).toLowerCase().includes(query));
};



const handleInput = (event) => {
  const query = event.target.value.toLowerCase();
  displayData.value = data.value.filter((item) => searchItem(item, query));
};




watch(searchResults, newVal => {
  console.log('Updated searchResults:', newVal);
});


watch(filteredData, newVal => {
  console.log('Updated filteredData:', newVal);
});


watch([searchQuery, filters], () => {
  if (searchQuery.value === '') {
    searchResults.value = filteredData.value;
  } else {
    handleInput(searchQuery.value);
  }
}, { immediate: true });



const isFilterActive = (filter) => {
  return filters.value.has(filter);
};

    loadData();

    return {
    calculateQuantity, data, loadData, removeItem, 
    trash, toggleFilter, filteredData, flask,
    diamond, add, leaf, share, shareQRCode, isFilterActive, searchResults, searchQuery, handleInput, displayData
  };

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
