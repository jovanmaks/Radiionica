<template>
<base-layout page-title="Projekti" page-default-back-link="/tabs">
    <template v-slot:content>
        <!-- <ion-button color="dark" size="large" type="submit" fill="solid">Stanje</ion-button> -->
        <!-- <h1>Stanje</h1> -->

        <router-link to="/napraviprojekat">
            <ion-button color="dark" size="large" type="submit" fill="solid">Napravi projekat</ion-button>
        </router-link>

        <router-link to="/projektistanje">
            <ion-button color="dark" size="large" type="submit" fill="solid">Lista projekata</ion-button>
        </router-link>
        
        

    </template>
  </base-layout>
  
  

</template>
  
  <script lang="js">

    import { useRouter, RouterLink } from "vue-router";
    import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'ProjektiPage',
        components: {
            // RouterLink
            // IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
        },
        setup() 
        {
            // const router = useRouter();
            
            return{}
        },
    };


  </script>