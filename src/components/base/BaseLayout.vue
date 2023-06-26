

<template>
  <ion-page>

    <app-header :title="pageTitle" @back="$router.back()" @signOut="signOut">
      <slot name="actions-end" slot="actions-end"></slot>
    </app-header>

    <app-footer :noteCount="noteCount" @setOpen="setOpen"></app-footer>

 <!-- <CustomModal v-model:isOpen="isOpenRef" :data="data" v-model:newNote="newNote" /> -->


    <ion-content>
      <slot name="content"></slot>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  


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
  // IonBackButton,
  IonButton,
  IonButtons,
  // IonMenuButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";

import {
  ellipse,
  notifications,
  square,
  triangle,
  star,
  camera,
  person,
  home,
  library,
  hammer,
  server,
  easel,
  logOut,
  checkmark,
  close,
  trash,
  arrowBack,
} from "ionicons/icons";

import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/vue";

import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ExploreContainer from "@/components/ExploreContainer.vue";

import { usePhotoGallery } from "@/composables/usePhotoGallery";

import { store } from "@/store"; // Adjust the path according to your project structure

export default defineComponent({
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    AppHeader,
    AppFooter,
    // CustomModal,
    IonInput,
    // IonBadge,
    IonPage,
    IonItem,
    IonModal,
    IonHeader,
    IonToolbar,
    // IonTitle,
    IonContent,
    // IonBackButton,
    IonButton,
    IonButtons,
    // IonMenuButton,
    IonCol,
    IonGrid,
    IonRow,
  },



  setup() {
    const router = useRouter();
    const routeName = router.currentRoute.value.name;
    const noteCount = ref(0);


    const { photos, takePhoto } = usePhotoGallery();

    const selectedLabels = ref({
      Ponuda: false,
      Crtanje: false,
      Programiranje: false,
      PripremaZaSjecenje: false,
      Sjecenje: false,
      PripremaZaFarbanje: false,
      Farbanje: false,
      Sklapanje: false,
      Predaja: false,
      Transport: false,
      Fotografisanje: false,
      Nabavka: false,
      Magacin: false,
      Alati: false,
    });

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

    onMounted(async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) {
        console.error("Error fetching notes:", error);
      } else {
        noteCount.value = data.length;
      }
    });

    const signOut = async () => {
      console.log("Logout button clicked");
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });
      await loader.present();
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        window.localStorage.clear();
        // store.dispatch('signOut');

        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }

        // user.value = null;
        // usernew.value = null;
        // Redirects after successfully logging out
        router.push({ name: "Entrance" });
      } catch (error) {
        toast.message = error.message;
        await toast.present();
      } finally {
        await loader.dismiss();
      }
    };

    return {
      notifications,
      signOut,
      takePhoto,
      photos,
      selectedLabels,
      routeName,
      person,
      camera,
      home,
      library,
      hammer,
      server,
      easel,
      isOpenRef,
      setOpen,
      confirmChanges,
      newNote,
      user,
      usernew,
      logOut,
      checkmark,
      close,
      noteCount,
      arrowBack,
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


