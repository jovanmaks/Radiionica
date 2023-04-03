<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
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
    // IonItem,
    // IonLabel,
    // IonInput,
    IonButton,
    toastController,
    loadingController,
  } from '@ionic/vue';
export default defineComponent({
    name: 'HomePage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonList,
      // IonItem,
      // IonLabel,
      // IonInput,
      IonButton,
    },


});
</script>


<!-- 
<template>

  <base-layout page-title="Home" page-default-back-link="/tabs" >
  </base-layout>

</template>
  
  <script setup lang="ts">

    import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    import { ellipse, square, triangle,star } from 'ionicons/icons';

  </script> -->
  <!-- <template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Blank</ion-title>
          </ion-toolbar>
        </ion-header>
      
        <div id="container">
          <strong>Ready to create an app?</strong>
          <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HomePage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar
    }
  });
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  #container a {
    text-decoration: none;
  }
  </style>
   -->