<template>
  <base-layout page-title="Activity" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-content class="content">

        <ion-refresher slot="fixed" @ionRefresh="loadData">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!--  Kartice-->
        <div v-for="(item, index) in data" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Projekat: {{ item.ime_projekta }}</ion-card-title>
              <ion-card-subtitle>Investitor: {{ item.investitor }}</ion-card-subtitle>
              <ion-card-subtitle>Lokacija: {{ item.lokacija }}</ion-card-subtitle>
              <ion-card-subtitle>Predaja: {{ item.rok_predaja }}</ion-card-subtitle>
            </ion-card-header>


            <!-- Saradnici -->
            <ion-button  fill="clear" @click="saradniciClicked(item.ime_projekta)">
              <ion-icon :icon="people"></ion-icon>
            </ion-button>

            <!-- Komentari -->
            <ion-button fill="outline">
              <ion-icon :icon="chatbubble"></ion-icon>
            </ion-button>

            <!-- Dijeljenje -->
            <ion-button id="open-modal" fill="clear" @click="shareClicked(item.ime_projekta)">
              <ion-icon :icon="share"></ion-icon>
            </ion-button>

            <!-- Brisanje -->
            <ion-button fill="clear" @click="removeItem(item.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>

            <!-- Status -->
            <ion-item>
              <ion-label>Status</ion-label>
              <ion-select v-model="velicina">
                <ion-select-option value="mala">Ceka odgovor</ion-select-option>
                <ion-select-option value="srednja">U toku</ion-select-option>
                <ion-select-option value="velika">Ceka naplatu</ion-select-option>
                <ion-select-option value="specijalna">Zavrseno</ion-select-option>
              </ion-select>
            </ion-item>
            
          </ion-card>
        </div>

        <!-- Dijeljenje - modal -->
        <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">

          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="setOpen(false)">Cancel</ion-button>
              </ion-buttons>

              <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirmChanges">Confirm</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          
          <Modal :data="data"></Modal>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-searchbar></ion-searchbar>
            </ion-item>

            <ion-list>
              <ion-item v-for="(user, index) in allUsers" :key="index">
                <ion-checkbox slot="start" v-model="user.selected"
                  @ionChange="toggleUser(user.id, $event.target.checked)"></ion-checkbox>
                <ion-label>{{ user.username }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>


    <!-- Saradnici - modal -->
<ion-modal :is-open="isOpenRefSaradnici" css-class="my-custom-class" @didDismiss="setOpenSaradnici(false)">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="setOpenSaradnici(false)">Cancel</ion-button>
      </ion-buttons>

      <ion-buttons slot="end">
        <ion-button :strong="true" @click="confirmChanges">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <Modal :data="data"></Modal>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-searchbar></ion-searchbar>
    </ion-item>

    <ion-list>
      <ion-item v-for="(user, index) in currentProjectUsers" :key="index">
        <ion-label>{{ user.username }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-modal>





      </ion-content>
    </template>
  </base-layout>
</template>

<script lang="js">

import { trash, share,  cube, home, heart, pin, analytics, build, chatbubble, people } from "ionicons/icons";
import { ref, computed, nextTick, onMounted } from 'vue';
import { supabase } from '@/supabase';


import {
  // IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonContent,
  IonCheckbox,

  IonIcon,
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonItem,
  IonLabel,

  IonCard,
  // IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";

export default {
  components: {
    // IonSearchbar,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonCheckbox,
    IonIcon,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,

    IonCard,
    // IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },

  setup() {

    const data = ref([]);
    const modalRef = ref(null);
    const inputRef = ref(null);

    const allUsers = ref([]);
    const selectedUserIDs = ref([]);
    const currentUserID = ref(null);
    const selectedImeProjekta = ref(null);

    const isOpenRef = ref(false);
    const isOpenRefSaradnici = ref(false);

    const usernew = ref(supabase.auth.getUser())

    const setOpen = (state) => { isOpenRef.value = state; };
    const setOpenSaradnici = (state) => { isOpenRefSaradnici.value = state; };


    const shareClicked = (ime_projekta) => {
      selectedImeProjekta.value = ime_projekta;
      setOpen(true);
    };

    const saradniciClicked = (ime_projekta) => {
      selectedImeProjekta.value = ime_projekta;
      setOpenSaradnici(true);
    };

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


    onMounted(async () => {
      const usernewResolved = await usernew.value;
      currentUserID.value = usernewResolved.data.user.id;

      try {
        const { data: users, error } = await supabase
          .from('profiles')
          .select('*')

        if (error) throw error;

        allUsers.value = users.map(user => ({ ...user, selected: false }));
      } catch (error) {
        console.log('Error: ', error)
      }
    });


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


    const fetchUsers = async () => {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
      // .neq('id', currentUserID)

      allUsers.value = users;

      if (error) console.log('Error: ', error)
      else {
        allUsers.value = users;
      }
    };


    const confirmChanges = async (ime_projekta) => {

      ime_projekta = selectedImeProjekta.value;
      // console.log('IME in confirmChanges:', ime_projekta);
      // console.log('selectedImeProjekta.value in confirmChanges:', selectedImeProjekta.value);

      try {
        // Fetch the project from the database
        const { data: project, error } = await supabase
          .from('Projekti')
          .select('saradnici')
          .eq('ime_projekta', ime_projekta);

        if (error) throw error;

        // If the project doesn't exist, there's nothing to do
        if (!project || project.length === 0) return;

        // Ensure saradnici field is an array
        if (!Array.isArray(project[0].saradnici)) project[0].saradnici = [];

        const existingIDs = project[0].saradnici;

        // Check for each selected ID
        for (const userID of selectedUserIDs.value) {
          // If the selected ID is not in the 'saradnici' field, add it
          if (!existingIDs.includes(userID)) {
            existingIDs.push(userID);
          }
        }

        // Update the 'saradnici' field in the database
        const { error: updateError } = await supabase
          .from('Projekti')
          .update({ saradnici: existingIDs })
          .eq('ime_projekta', ime_projekta);

        if (updateError) throw updateError;

        console.log('selectedUserIDs.value in confirmChanges:', selectedUserIDs.value);
        // Clear the selected IDs
        selectedUserIDs.value = [];

      } catch (error) {
        console.error("Error updating saradnici:", error);
      }

      setOpen(false);
    };


    const toggleUser = (userId, isChecked) => {
      // console.log(`toggleUser called with userId=${userId} and isChecked=${isChecked}`);
      nextTick(() => {
        if (isChecked && !selectedUserIDs.value.includes(userId)) {
          selectedUserIDs.value.push(userId);
        } else if (!isChecked && selectedUserIDs.value.includes(userId)) {
          selectedUserIDs.value = selectedUserIDs.value.filter(id => id !== userId);
        }
      });
    };

    loadData();
    fetchUsers();

    const currentProjectUsers = computed(() => {
      // Find the current project in the data array
      const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
      // If the project was not found or the saradnici field is not an array, return an empty array
      if (!currentProject || !Array.isArray(currentProject.saradnici)) return [];
      // Return the array of users whose IDs are in the 'saradnici' field of the current project
      return allUsers.value.filter(user => currentProject.saradnici.includes(user.id));
    });



    const cancel = () => {
      IonModal.dismiss(null, "cancel", modalRef);
    };

    const confirm = () => {
      const name = inputRef.value.value;
      IonModal.dismiss(name, "confirm", modalRef);
    };

    return {  
      data, loadData, removeItem,
      people, chatbubble, share, trash,
      cancel, confirm, confirmChanges,
      modalRef,  inputRef, isOpenRef, isOpenRefSaradnici, setOpen, setOpenSaradnici,
      allUsers, currentProjectUsers, selectedUserIDs, currentUserID, selectedImeProjekta,
      toggleUser, shareClicked, saradniciClicked,
    };
  },
};
</script>




