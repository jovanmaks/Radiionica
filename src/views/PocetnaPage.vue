
<template>
<base-layout page-title="Pocetna" page-default-back-link="/tabs">
    <template v-slot:content>
        <!-- <ion-button color="dark" size="large" type="submit" fill="solid">stanje</ion-button> -->
        <h1>Pocetna:</h1>

        <!-- <router-link to="/magacinunesi">
            <ion-button color="dark" size="large" type="submit" fill="solid">unesi</ion-button>
        </router-link>

        <router-link to="/magacinstanje">
            <ion-button color="dark" size="large" type="submit" fill="solid">stanje</ion-button>
        </router-link> -->

    </template>
  </base-layout>
  
  

</template>
  
  <script lang="js">

    import { userouter, routerlink } from "vue-router";
    import { ionlist, iontitle,ionitem, iontabbar,ionmenu, iontabbutton, iontabs, ionlabel, ionicon, ionpage, ionrouteroutlet } from '@ionic/vue';
    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'ProfilePage',
        components: {
            // routerlink
            // ionlist, iontitle,ionitem, iontabbar,ionmenu, iontabbutton, iontabs, ionlabel, ionicon, ionpage, ionrouteroutlet
        },
        setup() 
        {
            // const router = userouter();
            
            return{}
        },
    };


  </script>