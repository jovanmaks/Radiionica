<template>
  <base-layout page-title="Архива" page-default-back-link="/admin">
    <template v-slot:content>

      <ion-refresher slot="fixed" @ionRefresh="doRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card class="my-card" v-for="note in notes" :key="note.id">
        <div v-if="note.isHomescreenArchived">
          <ion-card-header>
            <ion-card-subtitle> {{ note.homescreen }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>{{ note.kreator }}</ion-card-content>
          <ion-button fill="clear" @click="deleteNote(note.id)">
            <ion-icon :icon="trash"></ion-icon>
          </ion-button>
        </div>
      </ion-card>

    </template>
  </base-layout>
</template> 



<script lang="js">


import {
  IonList,
  IonTitle,
  IonItem,
  IonTabBar,
  IonMenu,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  // IonFab,
  // IonFabButton,
  // IonFabList,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';

import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';

import {
  trash,
  archive,
} from 'ionicons/icons';


export default {
  name: 'HomePage',
  components: {
    // IonFab,
    // IonFabButton,
    // IonFabList,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    // RouterLink
    // IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
  },

  setup() {

    const notes = ref([]);
    const isDataLoaded = ref(false);


    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('homescreen, kreator, id, isHomescreenArchived');

      if (error) {
        console.error(error);
        return;
      }
      notes.value = data;
      isDataLoaded.value = true;
      console.log(data);
    };

    onMounted(fetchNotes);

      const doRefresh = async (event) => {
      await fetchNotes();
      event.target.complete();
    };

    const deleteNote = async (noteId) => {
      console.log(`Archiving note je ${noteId}`)
      const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
      if (error) {
        console.error(error)
      } else {
        console.log(`Note ${noteId} archived deleted`)
      }
    }


    return {
      //   notes: ref([]),
      notes,
      isDataLoaded,
      trash,
      archive,
      doRefresh,
      deleteNote,
    }
  },
};
</script>