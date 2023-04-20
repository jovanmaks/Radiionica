<template>

  <base-layout page-title="Activity" page-default-back-link="/tabs" >
    <template v-slot:content>

      <ion-content class="content">
        <!-- <ion-refresher slot="fixed" @ionRefresh="loadData">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher> -->

        <div v-for="(item, index) in data" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Projekat: {{ item.ime_projekta }}</ion-card-title>
              <ion-card-subtitle>Investitor: {{ item.investitor }}</ion-card-subtitle>
              <ion-card-subtitle>Lokacija: {{ item.lokacija }}</ion-card-subtitle>
              <ion-card-subtitle>Predaja: {{ item.rok_predaja }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                Opis projekta. Treba unijeti ovo polje u tabelu i dodati pri kreiranju projekta.
            </ion-card-content>
            
            <ion-button fill="clear">Statistika</ion-button>
            <ion-button fill="clear">Organizacija rada</ion-button>
            <ion-button fill="clear" @click="removeItem(item.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-card>
        </div>
        

      </ion-content>
    </template>
  </base-layout>

</template>
  
  <script lang="js">

    import { trash, flask, diamond, cube} from "ionicons/icons"; 
    import { ref, computed } from 'vue';
    import { supabase } from '@/supabase'; 

    import {
    IonContent,
    // IonList,
    // IonItem,
    // IonLabel,
    // IonRefresher,
    // IonRefresherContent,
    // IonButton,
    // IonIcon,
  } from "@ionic/vue";

export default {
  components: {
    IonContent,
    // IonList,
    // IonItem,
    // IonLabel,
    // IonRefresher,
    // IonRefresherContent,
    // IonButton,
    // IonIcon,
  },


  setup() {
    
    const data = ref([]);
    

    const loadData = async (event = null) => {
      try {
        const { data: fetchedData, error } = await supabase
          .from('Projekti') 
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
          .from("Projekti")
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
    
    loadData();
    
    return {data,loadData, removeItem,trash,};

  },
};


  
  </script>