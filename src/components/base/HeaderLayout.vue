<template>
    <ion-header class="custom-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="$emit('back')">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
          <ion-button fill="clear" @click="$emit('signOut')" size="large" >
            <ion-icon :icon="logOutOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script>
  import { IonHeader, IonToolbar, IonButtons, IonButton } from "@ionic/vue";
  import { arrowBack, logOutOutline } from "ionicons/icons";
  
  export default {
    props: ["title"],
    components: {
      IonHeader,
      IonToolbar,
      IonButtons,
      IonButton
    },
    setup() {
      return {
        arrowBack,
        logOutOutline
      }
    }
  }
  </script>
  
  <style scoped>
.custom-header {
  --border-width: 0px !important;
}
</style>