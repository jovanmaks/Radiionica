

<template>
  <ion-page>
          <!-- <ion-button fill="clear" @click="signOut" size="large" class="logout-button">
            <ion-icon :icon="logOutOutline"></ion-icon>
          </ion-button> -->
    <app-header :title="pageTitle" @back="$router.back()" @signOut="signOut">
      <slot name="actions-end" slot="actions-end"></slot>
    </app-header>


    <ion-content>
      <slot name="content"></slot>
    </ion-content>

    <app-footer></app-footer>

    <!-- <CustomModal v-model:isOpen="isOpenRef" :data="data" v-model:newNote="newNote" /> -->

<!-- 
    <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="setOpen(false)">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirmChanges">
              <ion-icon :icon="checkmark"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <Modal :data="data"></Modal>
      <ion-content class="ion-padding">
        <div class="input-button-container">
          <ion-item style="flex-grow: 1">
            <ion-input v-model="newNote" placeholder="Унеси биљешку"></ion-input>
          </ion-item>

        </div>
      </ion-content>
    </ion-modal> -->


  </ion-page>
</template>

<script>

import AppHeader from "./HeaderLayout.vue";
import AppFooter from "./FooterLayout.vue";
import CustomModal from "../reusable/addingTasks.vue";


import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonBadge,
  IonItem,
  IonPage,
  toastController,
  loadingController,
  IonTitle,
  IonButton,
  IonButtons,
} from "@ionic/vue";

import { checkmark, close, logOutOutline } from "ionicons/icons";

import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/vue";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ExploreContainer from "@/components/ExploreContainer.vue";


import { store } from "@/store"; // Adjust the path according to your project structure
import { useStore } from "vuex";
import { computed } from 'vue';


export default defineComponent({
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    AppHeader,
    AppFooter,

    // IonInput,
    IonPage,
    // IonItem,
    // IonModal,
    // IonHeader,
    // IonToolbar,
    IonContent,
    // IonButton,
    // IonButtons,

    // IonModal,
        // IonHeader,
        // IonToolbar,
        // // IonContent,
        // IonButton,
        // IonButtons,
  },



  setup() {
    const store = useStore();
    const user = computed(() => store.state.user.user);
    const username = computed(() => store.state.user.username);
    // const noteCount = computed(() => store.getters['notes/notesCount']);
    const router = useRouter();
    const routeName = router.currentRoute.value.name;
    const isOpenRef = ref(false);
    const setOpen = (state) => (isOpenRef.value = state);
    // const newNote = ref("");
    const usernew = ref(supabase.auth.getUser())



    const navigateTo = (route) => {
      setTimeout(() => {
        router.push(route);
      }, 0);
    };

    // const addNote = () => {
    //   if (newNote.value.trim() === "" || !user.value) {
    //     console.log("Note value is empty or user is not logged in. Skipping insertion.");
    //     return;
    //   }

    //   const note = {
    //     homescreen: newNote.value,
    //     user_id: user.value.id,
    //     kreator: username.value,
    //     isHomescreenArchived: false,
    //     levelOne: false,
    //     levelTwo: false,
    //     levelThree: false,
    //   };

    //   store.dispatch('notes/addNote', note);
    // };


    // watchEffect(() => {
    //   noteCount.value = store.state.notes.notes.length;
    // });

    const confirmChanges = async () => {
      // addNote();
      setOpen(false);
    };

    const signOut = async () => {
      store.dispatch('user/signOut')
        .then(() => {
          router.push({ name: "Entrance" });
        })
        .catch((error) => {
          // handle the error as you see fit
          console.error("Error signing out:", error);
        });
    };


    return {
      signOut, user, username, routeName, isOpenRef,
      setOpen, confirmChanges, 
      // newNote, 
      usernew, checkmark,
      close, 
      // noteCount, 
      navigateTo, 
      // addNote,
      logOutOutline
    };

  },


});
</script>

<style scoped>
/* .logout-button {
  position: absolute;
  right: 10px;
} */


ion-col {
  /* background-color: #135d54; */
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>


