

<template>
<base-layout page-title="Magacin" page-default-back-link="/tabs">
    <!-- Wrap the content you want to show on top of the baseLayout here -->
    <template v-slot:content>
        <h1>Content</h1>
      <!-- Add the specific content for MagacinPage here -->
    </template>
  </base-layout>
  
  

</template>
  
  <script setup lang="ts">

    import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    import { ellipse, square, triangle,star } from 'ionicons/icons';

  </script>