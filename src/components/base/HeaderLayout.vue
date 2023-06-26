<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="$emit('back')">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
          <ion-button fill="clear" @click="$emit('signOut')">
            <ion-icon :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script>
  import { IonHeader, IonToolbar, IonButtons, IonButton } from "@ionic/vue";
  import { arrowBack, logOut } from "ionicons/icons";
  
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
        logOut
      }
    }
  }
  </script>
  