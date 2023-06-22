<template>
  <base-layout page-title="" page-default-back-link="/admin">
    <template v-slot:content>

      <ion-refresher slot="fixed" @ionRefresh="doRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card class="my-card" v-for="note in notes" :key="note.id" :color="computeCardColor(note)">
        <div v-if="!note.isHomescreenArchived">
          <ion-card-header>
            <ion-card-subtitle> {{ note.homescreen }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>{{ note.kreator }}
          </ion-card-content>
          <ion-button class="archive-button" fill="clear" @click="archiveNote(note.id)">
            <ion-icon :icon="archive"></ion-icon>
          </ion-button>
          <ion-button class="alert-button" fill="clear" @click="setOpen(true, note)">
            <ion-action-sheet :is-open="isOpen" header="Приоритети" :buttons="actionSheetButtonsRef"
              @didDismiss="setOpen(false)"></ion-action-sheet>

            <ion-icon :icon="alertCircle"></ion-icon>
          </ion-button>

        </div>
      </ion-card>

      <div v-if="!isDataLoaded">Loading...</div>

      <ion-fab slot="fixed" vertical="top" horizontal="end">
        <ion-fab-button size="small" color="dark">
          <ion-icon :icon="hammer"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="bottom">
          <router-link to="/crtanje">
            <ion-fab-button size="small">
              <ion-icon :icon="brush"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/programiranje">
            <ion-fab-button size="small">
              <ion-icon :icon="desktop"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/pripremasjecenje">
            <ion-fab-button size="small">
              <ion-icon :icon="layers"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/sjecenje">
            <ion-fab-button size="small">
              <ion-icon :icon="cut"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/pripremafarbanje">
            <ion-fab-button size="small">
              <ion-icon :icon="create"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/farbanje">
            <ion-fab-button size="small">
              <ion-icon :icon="colorFill"></ion-icon>
            </ion-fab-button>
          </router-link>

          <router-link to="/sklapanje">
            <ion-fab-button size="small">
              <ion-icon :icon="extensionPuzzle"></ion-icon>
            </ion-fab-button>
          </router-link>
        </ion-fab-list>
        <!-- <ion-fab-list side="end">
          <ion-fab-button>
            <ion-icon :icon="cash"></ion-icon>
          </ion-fab-button>

          <ion-fab-button>
            <ion-icon :icon="car"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon :icon="checkmarkDone"></ion-icon>
          </ion-fab-button>
        </ion-fab-list> -->
      </ion-fab>

      <ion-fab slot="fixed" vertical="bottom" horizontal="start">
        <ion-fab-button size="small" color="dark">
          <ion-icon :icon="easel"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <!-- <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button> -->
          <router-link to="/select">
            <ion-fab-button size="small">
              <ion-icon :icon="list"></ion-icon>
            </ion-fab-button>
          </router-link>
          <router-link to="/arhiva">
            <ion-fab-button size="small">
              <ion-icon :icon="archive"></ion-icon>
            </ion-fab-button>
          </router-link>
          <ion-fab-button size="small" @click="setOpenFilter(true, note)">
            <ion-icon :icon="funnel"></ion-icon>
            <ion-action-sheet :is-open="isOpenFilter" header="Сортирај по:" :buttons="actionSheetButtonsFilterRef"
              @didDismiss="setOpenFilter(false)"></ion-action-sheet>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button size="small" color="dark">
          <ion-icon :icon="library"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <router-link to="/napraviprojekat">
            <ion-fab-button size="small">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </router-link>
          <router-link to="/projektistanje">
            <ion-fab-button size="small">
              <ion-icon :icon="list"></ion-icon>
            </ion-fab-button>
          </router-link>
        </ion-fab-list>
      </ion-fab>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button size="small" color="dark">
          <ion-icon :icon="server"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <router-link to="/magacinStanje">
            <ion-fab-button size="small">
              <ion-icon :icon="folder"></ion-icon>
            </ion-fab-button>
          </router-link>
          <!-- <ion-fab-button>
            <ion-icon :icon="construct"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon :icon="cart"></ion-icon>
          </ion-fab-button> -->
        </ion-fab-list>
      </ion-fab>



    </template>
  </base-layout>
</template>

<script lang="js">

import {
  IonList,
  IonActionSheet,
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
  IonFab,
  IonFabButton,
  IonFabList,
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
  ellipse,
  alertCircle,
  square,
  triangle,
  star,
  library,
  hammer,
  server,
  easel,
  add,
  archive,
  build,
  construct,
  folder,
  cash,
  brush,
  desktop,
  layers,
  cut,
  extensionPuzzle,
  colorFill,
  create,
  cart,
  camera,
  car,
  checkmarkDone,
  list,
  funnel,
} from 'ionicons/icons';



export default {
  name: 'HomePage',
  components: {
    IonActionSheet,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    // const emails = ref([]);
    // const currentUser = ref(null);

    const notes = ref([]);
    const isDataLoaded = ref(false);
    const isOpen = ref(false);
    const isOpenFilter = ref(false);
    const selectedColor = ref(''); // default color can be empty or any valid ionic color

    const actionSheetButtonsRef = ref([]);
    const actionSheetButtonsFilterRef = ref([]);


    const changeColor = (color) => {
      selectedColor.value = color;
    };


    // const fetchNotes = async () => {
    //   const { data, error } = await supabase.from('notes').select('homescreen, kreator, id, isHomescreenArchived');

    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   notes.value = data;
    //   isDataLoaded.value = true;
    //   console.log(data);
    // };

    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('homescreen, kreator, id, isHomescreenArchived, levelOne, levelTwo, levelThree')
        .order('id');

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

    const archiveNote = async (noteId) => {
      console.log(`Archiving note je ${noteId}`)
      const { data, error } = await supabase
        .from('notes')
        .update({ isHomescreenArchived: true })
        .eq('id', noteId)
      if (error) {
        console.error(error)
      } else {
        console.log(`Note ${noteId} archived successfully`)
      }
    }



    const setOpen = (state, note = null) => {
      console.log('setOpen', state, note);
      actionSheetButtonsRef.value = actionSheetButtons(note);
      isOpen.value = state;
    };


    const setOpenFilter = (state, note = null) => {
      console.log('filter oppened', state, note);
      actionSheetButtonsFilterRef.value = actionSheetButtonsFilter(note);
      isOpenFilter.value = state;
    };


    const actionSheetButtons = (note) => [
      {
        text: 'Хитно',
        handler: () => {
          console.log('Hitno clicked note', note);
          console.log('Hitno clicked id', note.id);
          updateNotePriority(note.id, true, false, false);
        },
      },
      {
        text: 'Важно',
        handler: () => {
          updateNotePriority(note.id, false, true, false);
        },
      },
      {
        text: 'Регуларно',
        handler: () => {
          updateNotePriority(note.id, false, false, true);
        },
      },
      {
        text: 'Откажи',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];

    const actionSheetButtonsFilter = (note) => [
      {
        text: 'Приоритету',
      },
      {
        text: 'Датуму',
      },
      {
        text: 'Креатору',
      },
      {
        text: 'Откажи',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];




    const computeCardColor = (note) => {
      if (note.levelOne) return 'danger';
      if (note.levelTwo) return 'warning';
      if (note.levelThree) return 'success';
      return ''; // default color if no level is set
    };


    const updateNotePriority = async (noteId, levelOne, levelTwo, levelThree) => {
      const { data, error } = await supabase
        .from('notes')
        .update({
          levelOne: levelOne,
          levelTwo: levelTwo,
          levelThree: levelThree
        })
        .eq('id', noteId);

      if (error) {
        console.error(error);
      } else {
        console.log(`Note ${noteId} priority updated successfully`);
        const note = notes.value.find(n => n.id === noteId);
        if (note) {
          note.levelOne = levelOne;
          note.levelTwo = levelTwo;
          note.levelThree = levelThree;
        }
      }
    };



    return {
      library, hammer, server, easel, add, archive, alertCircle,
      build,
      construct,
      folder,
      cash,
      brush,
      desktop,
      layers,
      cut,
      colorFill,
      extensionPuzzle,
      create,
      cart,
      camera,
      car,
      checkmarkDone,
      list,
      notes,
      // emails,
      isDataLoaded,
      doRefresh,
      archiveNote,
      isOpen,
      isOpenFilter,
      setOpen,
      setOpenFilter,
      changeColor, // Add this line
      selectedColor, // And this line
      computeCardColor,
      actionSheetButtons,
      actionSheetButtonsFilter,
      actionSheetButtonsRef,
      actionSheetButtonsFilterRef,
      funnel,
    }
  },
};
</script>
<style>
.archive-button {
  margin-left: 50px;
}
</style>