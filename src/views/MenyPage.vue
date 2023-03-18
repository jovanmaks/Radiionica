<template>
   
  <base-layout page-title="Meny" page-default-back-link="/tabs" >
    <ion-menu content-id="main-content">
      <ion-header>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-menu-toggle>
          <ion-button>Click to close the menu</ion-button>
        </ion-menu-toggle>
      </ion-content>
    </ion-menu> 
    
    <ion-page id="main-content">
      <ion-header>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-menu-toggle>
          <ion-button>Click to open the menu</ion-button>
        </ion-menu-toggle>
      </ion-content>
    </ion-page>
  </base-layout>
  </template>
  
  <script lang="ts">
    import {
      IonButton,
      IonContent,
      IonHeader,
      IonMenu,
      IonMenuToggle,
      IonPage,
      // IonTitle,
      // IonToolbar
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      components: {
        IonButton,
        IonContent,
        IonHeader,
       //IonMenu,
        IonMenuToggle,
        IonPage,
        // IonTitle,
        // IonToolbar
      },
    });
  </script>