<template>
    <ion-footer>
      <ion-toolbar>
        <ion-button slot="start" fill="solid" tab="pocetna" @click="navigateTo('/home')" color="medium">
          <ion-icon :icon="home"></ion-icon>
        </ion-button>
  
        <center>
          <ion-button id="open-modal" @click="$emit('setOpen', true)" color="medium">
            <ion-badge slot="end">{{ noteCount }}</ion-badge>
            <ion-icon :icon="notifications"></ion-icon>
          </ion-button>
        </center>
  
        <ion-button slot="end" fill="solid" tab="account" @click="navigateTo('/account')" color="medium">
          <ion-icon :icon="person"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-footer>
    

    
  </template>
  
  <script>
  import {
    IonFooter,
    IonToolbar,
    IonButton,
    IonBadge,
  } from "@ionic/vue";
  import {
    home,
    person,
    notifications,
  } from "ionicons/icons";
  import { defineComponent } from "vue";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    props: ["noteCount"],
    components: {
      IonFooter,
      IonToolbar,
      IonButton,
      IonBadge,
    },
    setup() {
      const router = useRouter();
      const navigateTo = (route) => {
        setTimeout(() => {
          router.push(route);
        }, 0);
      };
      return {
        navigateTo,
        home,
        person,
        notifications,
      };
    },
  });
  </script>