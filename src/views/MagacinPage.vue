<template>
<base-layout page-title="Magacin" page-default-back-link="/tabs">
    <template v-slot:content>

        <router-link to="/magacinUnesi">
            <ion-button color="dark" size="large" type="submit" fill="solid">Unesi</ion-button>
        </router-link>

        <router-link to="/magacinStanje">
            <ion-button color="dark" size="large" type="submit" fill="solid">Stanje</ion-button>
        </router-link>

    </template>
  </base-layout>
  
  

</template>
  
  <script lang="js">

    import { useRouter, RouterLink } from "vue-router";
    import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'MagacinPage',
        components: {
            RouterLink
            // IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
        },
        setup() 
        {
            const router = useRouter();
            
            return{}
        },
    };


  </script>