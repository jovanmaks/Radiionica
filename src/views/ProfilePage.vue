<template>
  <base-layout page-title="profile" page-default-back-link="/tabs" >
  </base-layout>
    <!-- <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Profile</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Profile page" />
      </ion-content>
    </ion-page> -->
  </template>
  
  <script setup lang="ts">
  // import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  // import ExploreContainer from '@/components/ExploreContainer.vue';
import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle,star } from 'ionicons/icons';
  </script>
  