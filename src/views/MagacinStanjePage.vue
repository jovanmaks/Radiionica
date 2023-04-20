
<template>
<base-layout page-title="Stanje u magacinu" page-default-back-link="/tabs">
    <template v-slot:content>

      <ion-content class="content">
      <ion-refresher slot="fixed" @ionRefresh="loadData">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <div class="filter-icons-wrapper">
      <div class="filter-icons">

          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('polistirol')))">
            <ion-icon :icon="flask"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('poliuretan')))">
            <ion-icon :icon="flask"></ion-icon>
          </ion-button>
          
          
          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('drvo')))">
            <ion-icon :icon="diamond"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('medijapan')))">
            <ion-icon :icon="diamond"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('iverica')))">
            <ion-icon :icon="diamond"></ion-icon>
          </ion-button>

          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('plocasti')))">
            <ion-icon :icon="cube"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="medium" @click="($event) => ($event.currentTarget.classList.toggle('active', toggleFilter('kubicni')))">
            <ion-icon :icon="cube"></ion-icon>
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
              Kolicina: {{ row.kolicina }}
            </ion-label>
            <ion-button fill="clear" @click="removeItem(row.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>>

    </ion-content>
    </template>
  </base-layout>
  


</template>
  
  <script  lang="js">


    import { trash, flask, diamond, cube} from "ionicons/icons"; 
    import { ref, computed } from 'vue';
    import { supabase } from '@/supabase'; 

    import {
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonButton,
    IonIcon,
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
  },
  setup() {
    const data = ref([]);
    const filters = ref(new Set());

    const loadData = async (event = null) => {
      try {
        const { data: fetchedData, error } = await supabase
          .from('Magacin') // replace 'your_table_name' with the actual table name in Supabase
          .select('*');

        if (error) {
          throw error;
        }

        data.value = fetchedData;
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (event) {
          event.target.complete();
        }
      }
    };
    
    const removeItem = async (id) => {
      try {
        const { error } = await supabase
          .from("Magacin")
          .delete()
          .match({ id });

        if (error) {
          throw error;
        }

        loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

    const toggleFilter = (filter) => {
  if (filters.value.has(filter)) {
    filters.value.delete(filter);
    return false;
  } else {
    filters.value.add(filter);
    return true;
  }
};

  const filteredData = computed(() => {
  const itemsCount = new Map();

  // Count the number of identical items
  data.value.forEach((row) => {
    const key = `${row.materijal}-${row.oblik}-${row.sirina}-${row.duzina}-${row.debljina}`;
    itemsCount.set(key, (itemsCount.get(key) || 0) + 1);
  });

  // Create a new filtered data array
  const uniqueItems = data.value.filter((row, index, self) => {
    return (
      Array.from(filters.value).every((filter) => {
        switch (filter) {
          case 'polistirol':
              return row.materijal === 'polistirol';
            case 'poliuretan':
              return row.materijal === 'poliuretan';
            case 'drvo':
              return row.materijal === 'drvo';
            case 'medijapan':
              return row.materijal === 'medijapan';
            case 'iverica':
              return row.materijal === 'iverica';
            case 'plocasti':
              return row.oblik === 'plocasti';
            case 'kubicni':
              return row.oblik === 'kubicni';
            default:
              return true;
        }
      }) &&
      // Check if the item is unique by comparing its index with the first occurrence of an item with the same attributes
      index ===
        self.findIndex(
          (item) =>
            item.materijal === row.materijal &&
            item.oblik === row.oblik &&
            item.sirina === row.sirina &&
            item.duzina === row.duzina &&
            item.debljina === row.debljina
        )
    );
  });

  // Add the kolicina attribute to each unique item
  uniqueItems.forEach((row) => {
    const key = `${row.materijal}-${row.oblik}-${row.sirina}-${row.duzina}-${row.debljina}`;
    row.kolicina = itemsCount.get(key);
  });

  return uniqueItems;
});


    loadData();

    return {data,loadData, removeItem,trash, toggleFilter, filteredData, flask,diamond, cube,};
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
</style>>

