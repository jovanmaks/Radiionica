<template>
  <base-layout page-title="Activity" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-content class="content">

        <ion-refresher slot="fixed" @ionRefresh="loadData">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!--  Kartice-->
        <div v-for="(item, index) in combinedData" :key="index">
          <ion-card>

            <ion-card-header>
              <ion-card-title>Projekat: {{ item.ime_projekta }}</ion-card-title>
              <ion-card-subtitle>Investitor: {{ item.investitor }}</ion-card-subtitle>
              <ion-card-subtitle>Lokacija: {{ item.lokacija }}</ion-card-subtitle>
              <ion-card-subtitle>Predaja: {{ item.rok_predaja }}</ion-card-subtitle>
              <ion-card-subtitle v-if="isSpecialUser" >Cena: {{ item.cijena_projekta }}</ion-card-subtitle>
            </ion-card-header>


            <!-- Saradnici -->
            <ion-button fill="clear" @click="saradniciClicked(item.ime_projekta)">
              <ion-icon :icon="people"></ion-icon>
            </ion-button>

            <!-- Komentari -->
            <ion-button fill="clear" @click="biljeskeClicked(item.ime_projekta)">
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
                <!-- Here is the new trash button -->
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>


        <!-- Saradnici - modal -->
        <ion-modal :is-open="isOpenRefSaradnici" css-class="my-custom-class" @didDismiss="setOpenSaradnici(false)">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="end">
                <ion-button @click="setOpenSaradnici(false)">Close</ion-button>
              </ion-buttons>

              <!-- <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirmChangesSaradnici">Close</ion-button>
              </ion-buttons>` -->
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
                <ion-icon slot="end" :icon="trash" @click="removeUserFromProject(user.id)"></ion-icon>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>


        <!-- Biljeske - modal -->
        <ion-modal :is-open="isOpenRefBiljeske" css-class="my-custom-class" @didDismiss="setOpenBiljeske(false)">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="end">
                <ion-button @click="setOpenBiljeske(false)">Zatvori</ion-button>
              </ion-buttons>

              <!-- <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirmChangesBiljeska">Confirm</ion-button>
              </ion-buttons> -->

            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
            <Modal :data="data"></Modal>

            <div style="display: flex; flex-direction: column; height: 100%;">
              <!-- Display notes -->
              <div style="flex-grow: 1; overflow: auto; max-height: 70vh;">
                <ion-list>
                  <ion-item v-for="(note, index) in currentProjectNotes" :key="index">
                    {{ note }}
                    <ion-button fill="clear" @click="removeNote(index)" slot="end">
                      <ion-icon :icon="trash"></ion-icon>
                    </ion-button>
                  </ion-item>
                </ion-list>
              </div>

              <!-- Input field for notes -->
              <div class="input-button-container">
                <ion-item style="flex-grow: 1;">
                  <ion-input v-model="newNote" placeholder="Enter Note"></ion-input>
                </ion-item>

                <!-- Add Note Button -->
                <ion-button :strong="true" @click="addBiljeska" style="margin-left: 5px;">Add Note</ion-button>
              </div>
            </div>

          </ion-content>
        </ion-modal>




      </ion-content>
    </template>
  </base-layout>
</template>

<script lang="js">

import { trash, share, cube, home, heart, pin, analytics, build, chatbubble, people } from "ionicons/icons";
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
  IonList,
  IonLabel,

  IonCard,
  IonInput,
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
    IonList,
    IonLabel,

    IonCard,
    IonInput,
    // IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },



  setup() {

    const data = ref([]);
    const sendata = ref([]);
    const combinedData = ref([]);

    const modalRef = ref(null);
    const inputRef = ref(null);

    const allUsers = ref([]);
    const selectedUserIDs = ref([]);
    const currentUserID = ref(null);
    const currentUserEmail = ref(null);
    const selectedImeProjekta = ref(null);

    const isOpenRef = ref(false);
    const isOpenRefSaradnici = ref(false);
    const isOpenRefBiljeske = ref(false);

    const usernew = ref(supabase.auth.getUser())
    // const userEmail = ref(supabase.auth.getUser()?.email);
    const userEmail = ref(supabase.auth.getUser());


    //     const usernew = ref(supabase.auth.getUser());
    //   supabase.auth.onAuthStateChange(() => {
    //   usernew.value = supabase.auth.getUser();
    // });


    const newNote = ref('');

    const allowedUsers = ref(["jovanmaks92@gmail.com"]);




    // const isSpecialUser = computed(() => {
    //   console.log('email', usernew.value);
    //   console.log('email 2', usernew.value.email);
    //   return usernew.value && usernew.value.email === 'jovanmaks92@gmail.com';

    // });

    const isSpecialUser = computed(() => {
      return currentUserEmail.value === 'jovanmaks92@gmail.com'
    });

    // const isSuperUser = 

    const isUserAllowed = (currentUserEmail) => {
      console.log('userEmail', userEmail);
      console.log('evo ga email', currentUserEmail.value);
      console.log('evo ga id', currentUserID.value);
      return allowedUsers.value.includes(currentUserEmail);
    };

    const setOpen = (state) => { isOpenRef.value = state; };
    const setOpenSaradnici = (state) => { isOpenRefSaradnici.value = state; };
    const setOpenBiljeske = (state) => { isOpenRefBiljeske.value = state; };


    const shareClicked = (ime_projekta) => {
      selectedImeProjekta.value = ime_projekta;
      setOpen(true);
    };

    const saradniciClicked = (ime_projekta) => {
      selectedImeProjekta.value = ime_projekta;
      setOpenSaradnici(true);
    };

    const biljeskeClicked = (ime_projekta) => {
      selectedImeProjekta.value = ime_projekta;

      console.log(`selectedImeProjekta.value is ${selectedImeProjekta.value}`);
      console.log('data.value is', data.value);
      console.log('currentProjectNotes.value is', currentProjectNotes.value);

      setOpenBiljeske(true);
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
        // combineDatasets();



      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (event) {
          event.target.complete();
        }
      }
    };


    const loadSensitive = async (event = null) => {
      try {
        const { data: fetchedData, error } = await supabase
          .from('sensitiveData')
          .select('*');

        if (error) {
          throw error;
        }

        sendata.value = fetchedData;

      } catch (error) {
        console.error('Error loading sensitive data:', error);
        sendata.value = [];  // Set to empty when an error occurs
      } finally {
        if (event) {
          event.target.complete();
        }
      }
    };

    // const combineDatasets = () => {
    //   combinedData.value = [...data.value, ...sendata.value];
    // };

    const combineDatasets = () => {
      combinedData.value = data.value.map(item => {
        const sensitiveItem = sendata.value.find(sItem => sItem.projekti_id === item.id);
        return {
          ...item,
          cijena_projekta: sensitiveItem ? sensitiveItem.cijena_projekta : null
        }
      });
    };



    onMounted(async () => {
      const usernewResolved = await usernew.value;
      currentUserID.value = usernewResolved.data.user.id;
      currentUserEmail.value = usernewResolved.data.user.email;


      console.log('evo ga email mounted', currentUserEmail.value);
      console.log('evo ga id mounted', currentUserID.value);

      try {
        const { data: users, error } = await supabase
          .from('profiles')
          .select('*')

        if (error) throw error;

        allUsers.value = users.map(user => ({ ...user, selected: false }));
        // loadData();
        // console.log('dataaaaaa', data.value);
        // loadSensitive();
        await Promise.all([loadData(), loadSensitive()]);
        combineDatasets();
        console.log('ajdeeeee', combinedData.value);
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

    const confirmChangesBiljeska = async (ime_projekta) => {
      setOpenBiljeske(false);
    };

    const confirmChangesSaradnici = async (ime_projekta) => {
      setOpenBiljeske(false);
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

    const removeUserFromProject = async (userId) => {
      const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
      if (!currentProject || !Array.isArray(currentProject.saradnici)) return;
      currentProject.saradnici = currentProject.saradnici.filter(id => id !== userId);

      try {
        const { error } = await supabase
          .from('Projekti')
          .update({ saradnici: currentProject.saradnici })
          .eq('ime_projekta', selectedImeProjekta.value);

        if (error) throw error;

        // Reload the data from the database
        await loadData();
      } catch (error) {
        console.error("Error updating saradnici:", error);
      }
    };

    const currentProjectNotes = computed(() => {
      // Find the current project in the data array
      const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
      // If the project was not found or the biljeske field is not an array, return an empty array
      if (!currentProject || !Array.isArray(currentProject.biljeske)) return [];
      // Return the array of notes
      return currentProject.biljeske;
    });

    const currentProjectUsers = computed(() => {
      // Find the current project in the data array
      const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
      // If the project was not found or the saradnici field is not an array, return an empty array
      if (!currentProject || !Array.isArray(currentProject.saradnici)) return [];
      // Return the array of users whose IDs are in the 'saradnici' field of the current project
      return allUsers.value.filter(user => currentProject.saradnici.includes(user.id));
    });

    const addBiljeska = async () => {

      console.log('biljeska pokrenuta')

      if (!newNote.value || !selectedImeProjekta.value) return;

      try {
        const { data: project, error } = await supabase
          .from('Projekti')
          .select('biljeske')
          .eq('ime_projekta', selectedImeProjekta.value);

        console.log('sadrzaj:', newNote.value)

        if (error) throw error;

        // If the project doesn't exist, there's nothing to do
        if (!project || project.length === 0) return;

        // Ensure biljeske field is an array
        if (!Array.isArray(project[0].biljeske)) project[0].biljeske = [];

        // Add the new note to the array
        project[0].biljeske.push(newNote.value);

        // Now update the 'biljeske' field in the database
        const { error: updateError } = await supabase
          .from('Projekti')
          .update({ biljeske: project[0].biljeske })
          .eq('ime_projekta', selectedImeProjekta.value);

        if (updateError) throw updateError;

        // Clear the new note input field
        newNote.value = '';

        // Reload the data from the database
        await loadData();

      } catch (error) {
        console.error("Error updating biljeske:", error);
      }

    };

    const removeNote = async (index) => {
      const project = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
      if (!project || !Array.isArray(project.biljeske)) return;
      project.biljeske.splice(index, 1);
      try {
        const { error } = await supabase
          .from('Projekti')
          .update({ biljeske: project.biljeske })
          .eq('ime_projekta', selectedImeProjekta.value);
        if (error) throw error;
      } catch (error) {
        console.error("Error removing note:", error);
      }
    };


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
      cancel, confirm, confirmChanges, confirmChangesBiljeska, confirmChangesSaradnici, addBiljeska,
      modalRef, inputRef, isOpenRef, isOpenRefSaradnici, isOpenRefBiljeske,
      setOpen, setOpenSaradnici, setOpenBiljeske,
      allUsers, currentProjectUsers, selectedUserIDs, currentUserID, currentUserEmail, selectedImeProjekta,
      toggleUser, shareClicked, saradniciClicked, biljeskeClicked,
      newNote, currentProjectNotes, removeNote, removeUserFromProject, usernew, userEmail, isSpecialUser, isUserAllowed, combinedData, sendata
    };
  },
};
</script>


<style scoped>
.input-button-container {
  position: absolute;
  bottom: 100px;
  /* Adjust as needed */
}
</style>

