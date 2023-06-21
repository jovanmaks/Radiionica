<template>
    <ion-page>
      <ion-header>
          <ion-toolbar>
            <ion-title></ion-title>
          </ion-toolbar>
        </ion-header>
  
         
        <ion-content>
          <ion-list :inset="true">
          
            <div class="ion-text-center">
              <ion-button fill="clear" :router-link="{ path: '/login' }">Login</ion-button>
            </div>
  
            <div class="ion-text-center">
              <ion-button fill="clear" :router-link="{ path: '/register' }">Register</ion-button>
            </div>
          
          </ion-list>
        </ion-content>
  
  
    </ion-page>
  </template>
  
  
  <script>
  
  import { supabase } from '../supabase';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from "vue-router";
  
    import {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonList,
      IonButton,
      toastController,
      loadingController,
    } from '@ionic/vue';
  export default defineComponent({
      name: 'EntrancePage',
      components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonList,
        IonButton,
      },
  
  
  });
  </script>