<template>
  <base-layout  page-default-back-link="/tabs" >
          <ion-title>Test-tab</ion-title>
  </base-layout>
<!-- 
  <ion-page>
    <ion-tabs >
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="messages" href="/tabs/messages">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Messages</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile3" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

    </ion-tabs>
  </ion-page> -->

</template>

<script setup lang="ts">
import { IonList,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle,star } from 'ionicons/icons';
</script>
