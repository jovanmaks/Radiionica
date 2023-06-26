

<template>
  <ion-page>

    <app-header :title="pageTitle" @back="$router.back()" @signOut="signOut">
      <slot name="actions-end" slot="actions-end"></slot>
    </app-header>


    <ion-content>
      <slot name="content"></slot>
    </ion-content>



    <app-footer :noteCount="noteCount" @setOpen="setOpen"></app-footer>

    <!-- <CustomModal v-model:isOpen="isOpenRef" :data="data" v-model:newNote="newNote" /> -->


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
    </ion-modal>


  </ion-page>
</template>

<script>

import AppHeader from "./HeaderLayout.vue";
import AppFooter from "./FooterLayout.vue";
import CustomModal from "../reusable/addingTasks.vue";


import {
  IonInput,
  IonBadge,
  IonItem,
  IonPage,
  IonModal,
  toastController,
  loadingController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  // IonBackButton,
  // IonMenuButton,
  // IonCol,
  // IonGrid,
  // IonRow,
} from "@ionic/vue";

import { checkmark, close } from "ionicons/icons";

import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/vue";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ExploreContainer from "@/components/ExploreContainer.vue";


import { store } from "@/store"; // Adjust the path according to your project structure
import { useStore } from "vuex";


export default defineComponent({
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    AppHeader,
    AppFooter,
    // CustomModal,

    IonInput,
    IonPage,
    IonItem,
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonButtons,

    // IonBadge,
    // IonTitle,
    // IonBackButton,
    // IonMenuButton,
    // IonCol,
    // IonGrid,
    // IonRow,
  },



  setup() {
    const store = useStore();


    const router = useRouter();
    const routeName = router.currentRoute.value.name;
    const noteCount = ref(0);


    const isOpenRef = ref(false);
    const setOpen = (state) => (isOpenRef.value = state);
    const newNote = ref("");
    const user = ref(supabase.auth.getUser());
    const usernew = ref(supabase.auth.getUser())

    const navigateTo = (route) => {
      setTimeout(() => {
        router.push(route);
      }, 0);
    };

    const addNote = async () => {
      try {
        console.log("newNote:", newNote.value);
        // console.log("user:", user.value);  // Add this line

        // user.value = supabase.auth.getUser();

        const usernewResolved = await usernew.value;
        // currentUserID.value = usernewResolved.data.user.id;
        // console.log('user je', usernewResolved.davalue);
        console.log('user je', usernewResolved.data.user.id);

        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', usernewResolved.data.user.id)  // use user.value.id directly
          .single();


        // Here, you should use user.value directly:
        if (newNote.value.trim() === "" || !user.value) {
          console.log("Note value is empty or user is not logged in. Skipping insertion.");
          return;
        }

        const { error } = await supabase.from("notes").insert([
          {
            homescreen: newNote.value,
            user_id: usernewResolved.data.user.id,
            kreator: profile.username,
          },
        ]);

        if (error) throw error;

        console.log("Note added successfully");
        newNote.value = ""; // Clear the input after successful insertion
      } catch (error) {
        console.error("Error inserting note:", error);
      }
    };


    watchEffect(async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) {
        console.error("Error fetching notes:", error);
      } else {
        noteCount.value = data.length;
      }
    });



    const confirmChanges = async () => {
      // console.log('confirmChanges called, newNote:', newNote.value);
      addNote();
      setOpen(false);
    };





    const signOut = async () => {
      store.dispatch('signOut')
        .then(() => {
          router.push({ name: "Entrance" });
        })
        .catch((error) => {
          // handle the error as you see fit
          console.error("Error signing out:", error);
        });
    };


    return {
      signOut,
      routeName,
      isOpenRef,
      setOpen,
      confirmChanges,
      newNote,
      user,
      usernew,
      checkmark,
      close,
      noteCount,
      navigateTo,
      // usernewResolved,
    };
  },


});
</script>

<style scoped>
ion-col {
  /* background-color: #135d54; */
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>


