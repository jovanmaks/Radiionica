
<template>
<base-layout page-title="MagacinStanje" page-default-back-link="/tabs">
    <template v-slot:content>

      <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="loadData">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list>
        <ion-item v-for="(row, index) in data" :key="index">
          <ion-label>
            Materijal: {{ row.materijal }}<br />
            Oblik: {{ row.oblik }}<br />
            Širina: {{ row.sirina }}<br />
            Dužina: {{ row.duzina }}<br />
            Debljina: {{ row.debljina }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    </template>
  </base-layout>
  
  

</template>
  
  <script  lang="js">

    // import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    // import { ellipse, square, triangle,star } from 'ionicons/icons';
    
    import {  IonContent, IonList, IonItem, IonLabel, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { ref } from 'vue';
import { supabase } from '@/supabase'; // assuming you have a 'supabase.js' file in your project for Supabase configuration

export default {
  components: {
    // IonPage,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    const data = ref([]);

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

    loadData();

    return {
      data,
      loadData,
    };
  },
};

  </script>