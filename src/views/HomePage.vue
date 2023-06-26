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

          <ion-button class="edit-button" fill="clear" @click="setOpenEdit(true, note)">
            <ion-icon :icon="documentText"></ion-icon>
          </ion-button>

        </div>
      </ion-card>



      <ion-modal :is-open="isOpenEdit" css-class="my-custom-class" @didDismiss="setOpenEdit(false)">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="setOpenEdit(false)">
                <!-- Откажи -->
                <ion-icon :icon="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <!-- <ion-title>Notifikacija</ion-title> -->
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirmChanges">
                <!-- Потврди -->
                <ion-icon :icon="checkmark"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <Modal :data="data"></Modal>
        <ion-content class="ion-padding">
          <div class="input-button-container">
            <ion-item style="flex-grow: 1">
              <ion-input v-model="newNote" placeholder="Enter Note"></ion-input>
            </ion-item>

            <!-- Add Note Button -->
            <!-- <ion-button :strong="true" @click="addBiljeska" style="margin-left: 5px;">Add Note</ion-button> -->
          </div>
        </ion-content>
      </ion-modal>


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
  IonActionSheet, IonIcon, IonFab, IonFabButton, IonFabList, IonCard, IonCardHeader, IonButton, IonButtons, IonItem,
  IonCardSubtitle, IonCardContent, IonRefresher, IonRefresherContent, IonInput, IonModal, IonHeader, IonToolbar, IonContent,
  // IonAlert,
} from '@ionic/vue';

import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';

import {
  ellipse, alertCircle, square, triangle, star, library, hammer, server, easel,
  add, archive, build, construct, folder, cash, brush, desktop, layers, cut,
  extensionPuzzle, colorFill, create, cart, camera, car, checkmarkDone, list, funnel,
  documentText, checkmark, close ,
} from 'ionicons/icons';



export default {
  name: 'HomePage',
  components: {
    IonActionSheet, IonFab, IonFabButton, IonFabList, IonIcon, IonCard, IonCardHeader, IonButton, IonButtons, IonItem,
  IonCardSubtitle, IonCardContent, IonRefresher, IonRefresherContent, IonInput,IonModal, IonHeader, IonToolbar,IonContent ,
    // IonAlert,
  },

  setup() {

    const notes = ref([]);
    const isDataLoaded = ref(false);
    const isOpen = ref(false);
    const isOpenFilter = ref(false);
    const isOpenEdit = ref(false);
    const selectedColor = ref(''); // default color can be empty or any valid ionic color

    const actionSheetButtonsRef = ref([]);
    const actionSheetButtonsFilterRef = ref([]);
    // const alertButtonsEditRef = ref([]);

    const selectedNote = ref(null); // This will store the currently selected note
    const newNote = ref(''); // This will store the updated text of the note



    const changeColor = (color) => {
      selectedColor.value = color;
    };


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

    const fetchLoggedInUser = async () => {
      const user = supabase.auth.getUser();
      console.log(user);  // prints the currently logged in user
    };

    onMounted(async () => {
        await fetchLoggedInUser();
        await fetchNotes();
    });

    // onMounted(fetchNotes);

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

    const setOpenEdit = (state, note = null) => {
      console.log('edit opened', state, note);
      if (state) {
        selectedNote.value = note; // When the modal is opening, set the selected note
        newNote.value = note.homescreen; // Initialize the new note text to be the same as the current note's text
        console.log('selected note', selectedNote.value);
        console.log('new note', newNote.value);
      } else {
        selectedNote.value = null; // When the modal is closing, clear the selected note
      }
      isOpenEdit.value = state;
    };

    const confirmChanges = async () => {
      if (selectedNote.value) { // If a note is selected
        const { data, error } = await supabase
          .from('notes')
          .update({ homescreen: newNote.value }) // Update the kreator field with the new text
          .eq('id', selectedNote.value.id); // Find the note by its id
          console.log('selected note', newNote.value);
        if (error) {
          console.error(error);
        } else {
          console.log(`Note ${selectedNote.value.id} updated successfully`);
        }
      }
      setOpenEdit(false);
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


    const sortNotes = (compareFunction) => {
      notes.value.sort(compareFunction);
    };

    const sortByPriority = () => {
      sortNotes((a, b) => {
        if (a.levelOne !== b.levelOne) {
          return b.levelOne - a.levelOne;
        } else if (a.levelTwo !== b.levelTwo) {
          return b.levelTwo - a.levelTwo;
        } else {
          return b.levelThree - a.levelThree;
        }
      });
    };

    const sortById = () => {
      sortNotes((a, b) => a.id - b.id);
    };

    const sortByCreator = () => {
      sortNotes((a, b) => a.kreator.localeCompare(b.kreator));
    };

    const actionSheetButtonsFilter = (note) => [
      {
        text: 'Приоритету',
        handler: () => {
          sortByPriority();
        },
      },
      {
        text: 'Датуму',
        handler: () => {
          sortById();
        },
      },
      {
        text: 'Креатору',
        handler: () => {
          sortByCreator();
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

    const alertButtons = ['OK'];



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
      library, hammer, server, easel, add, archive, alertCircle, build, construct, folder, cash, funnel,
      brush, desktop, layers, cut, colorFill, extensionPuzzle, create, cart, camera, car, checkmark, close,
      checkmarkDone, list, notes, isDataLoaded, doRefresh, archiveNote, isOpen, isOpenFilter, isOpenEdit,
      setOpen, setOpenFilter, setOpenEdit, changeColor, selectedColor, computeCardColor,
      actionSheetButtons, actionSheetButtonsFilter,
      //  alertButtonsEdit,
      actionSheetButtonsRef, actionSheetButtonsFilterRef,
      // alertButtonsEditRef,
      sortByPriority, sortById, sortByCreator, documentText, alertButtons,
      confirmChanges, newNote,
    }
  },
};
</script>
<style>
.archive-button {
  margin-left: 50px;
}
</style>