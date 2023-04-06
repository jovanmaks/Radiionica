<template>

  <base-layout page-title="Photo" page-default-back-link="/tabs" >
  </base-layout>

</template>
  
  <script setup lang="ts">


    import {
        IonContent,
        IonCol,
        IonFab,
        IonFabButton,
        IonGrid,
        // IonPage,
        IonHeader,
        // IonIcon,
        IonImg,
        IonRow,
        // IonTitle,
        IonToolbar,
    } from '@ionic/vue';

    import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    import { ellipse, square, triangle,star } from 'ionicons/icons';
    import { camera, trash, close } from 'ionicons/icons';
    import { usePhotoGallery } from '@/composables/usePhotoGallery';

const { takePhoto } = usePhotoGallery();
  </script>
  

  
