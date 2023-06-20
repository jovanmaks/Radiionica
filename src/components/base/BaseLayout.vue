<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
          <ion-button fill="clear" @click="signOut">Log Out</ion-button>
          <ion-menu-button auto-hide="false" tab="meny" href="/meny"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

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

    <ion-footer>
      <ion-toolbar>
        <ion-button slot="start" fill="solid" tab="pocetna" href="/home">
          <ion-icon :icon="home"></ion-icon>
        </ion-button>
        <!-- <ion-button fill="solid" @click="takePhoto">
            <ion-icon :icon="camera"></ion-icon>
          </ion-button> -->
        <center>
          <ion-button id="open-modal" @click="setOpen(true)">
            <ion-icon :icon="notifications"></ion-icon>
          </ion-button>
        </center>
        <ion-button slot="end" fill="solid" tab="account" href="/account">
          <ion-icon :icon="person"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-footer>

    <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="setOpen(false)">Otkazi</ion-button>
          </ion-buttons>
          <!-- <ion-title>Notifikacija</ion-title> -->
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirmChanges">Potvrdi</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <Modal :data="data"></Modal>
      <ion-content class="ion-padding">

        <div class="input-button-container">
          <ion-item style="flex-grow: 1;">
            <ion-input v-model="newNote" placeholder="Enter Note"></ion-input>
          </ion-item>

          <!-- Add Note Button -->
          <!-- <ion-button :strong="true" @click="addBiljeska" style="margin-left: 5px;">Add Note</ion-button> -->
        </div>

      </ion-content>

    </ion-modal>



  </ion-page>
</template>

<script>
import {
  IonInput,
  IonItem,
  IonPage,
  IonModal,
  toastController,
  loadingController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButton,
  IonButtons,
  IonMenuButton,
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
} from "ionicons/icons";

import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/vue";

import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ExploreContainer from "@/components/ExploreContainer.vue";

import { trash, close } from "ionicons/icons";
import { usePhotoGallery } from "@/composables/usePhotoGallery";

import { store } from '@/store'; // Adjust the path according to your project structure


export default defineComponent({
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonInput,
    IonPage,
    IonItem,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCol,
    IonGrid,
    IonRow,
  },

  setup() {
    const router = useRouter();
    const routeName = router.currentRoute.value.name;

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
    const newNote = ref('');




    async function fetchUserMetadata() {
      const { user } = await supabase.auth.getUser();
      console.log('User OVDEEEEEEE:', user);

      if (user && user.user_metadata) {
        Object.keys(selectedLabels.value).forEach((key) => {
          if (user.user_metadata.selectedLabels[key]) {
            selectedLabels.value[key] = user.user_metadata.selectedLabels[key];
          }
        });
      } else {
        console.error("User or user metadata is not defined");
      }
    }

    const addNote = async () => {
      try {
        console.log('newNote:', newNote.value); // Add this line to log the value of newNote
        const { error } = await supabase
          .from('notes')
          .insert([
            { homescreen: newNote.value }, //  homescreen Assuming 'homescreen' is the column you want to insert into
          ]);
        if (error) throw error;

        console.log('Note added successfully');
        newNote.value = ''; // Clear the input after successful insertion
      } catch (error) {
        console.error('Error inserting note:', error);
      }
    };

    const confirmChanges = async () => {
      console.log('confirmChanges called, newNote:', newNote.value);
      addNote();

    };


    onMounted(() => {
      fetchUserMetadata();
      const urlParams = new URLSearchParams(window.location.search);
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
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }


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




















        <!-- <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Ponuda && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Ponuda</ion-button>
          </div>

          <div v-if="selectedLabels.Crtanje && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid" :router-link="{ path:'/crtanje'}" >Crtanje</ion-button>
          </div>

          <div v-if="selectedLabels.Programiranje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Programiranje</ion-button>
          </div>
        </div>
          
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.PripremaZaSjecenje && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Prip(sjecenje)</ion-button>
          </div>

          <div v-if="selectedLabels.Sjecenje && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid">Sjecenje</ion-button>
          </div>
        </div>
          
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.PripremaZaFarbanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Prip(farbanje)</ion-button>
          </div>

          <div v-if="selectedLabels.Farbanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Farbanje</ion-button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Sklapanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Sklapanje</ion-button>
          </div>

          <div v-if="selectedLabels.Predaja && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Predaja</ion-button>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Transport && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Transport</ion-button>
          </div>

          <div v-if="selectedLabels.Fotografisanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Fotografisanje</ion-button>
          </div>
        </div>

        
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Nabavka && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Nabavka</ion-button>
          </div>

          <div v-if="selectedLabels.Alati && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid">Alati</ion-button>
          </div>

          <div v-if="selectedLabels.Magacin && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid" :router-link="{ path:'/magacin'}">
              Magacin
            </ion-button>
          </div>
        </div> -->