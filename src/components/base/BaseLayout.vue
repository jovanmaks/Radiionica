          <!-- <ion-back-button></ion-back-button> -->
<template>
    <ion-page>

      <ion-header>
        <ion-toolbar>
          <!-- <ion-router-outlet></ion-router-outlet> -->
          <ion-buttons slot="start">
            <ion-back-button
              :default-href="pageDefaultBackLink">
            </ion-back-button>

            <ion-button fill="solid" tab="activity"  href="/activity" > 
             </ion-button> 

          </ion-buttons> 
          

          <ion-title>{{ pageTitle }}</ion-title>
          
          <ion-buttons slot="end">
            <slot name="actions-end"></slot>

            <ion-button fill="solid" tab="search"  href="/search" > 
            </ion-button> 

            <ion-button fill="outline" tab="meny"  href="/meny" > 
            </ion-button> 

             <!-- <ion-menu-button auto-hide="false" tab="meny" href="/meny" >
             </ion-menu-button> -->

          </ion-buttons>

        </ion-toolbar>
      </ion-header>
      


      <ion-content>
        <slot />
      </ion-content>
     
      <ion-footer>
        <ion-toolbar>

          <ion-button  slot="start" fill="solid" tab="home"  href="/home">
            <!-- <ion-icon name="add"></ion-icon> -->
          </ion-button>

          <ion-button  slot="end" fill="solid" tab="profile"  href="/profile">
            <!-- <ion-icon name="add"></ion-icon> -->
          </ion-button>

          <center>
              <ion-button  fill="solid" tab="qr"  href="/qr">
              </ion-button>

              <ion-button  fill="solid" tab="messages"  href="/messages">
              </ion-button>

          </center>

        </ion-toolbar>
      </ion-footer>


    </ion-page>
  </template>
  
  
  <script >
  import {
    // IonIcon,
    // IonTabs,
    // IonRouterOutlet,
    IonPage,
    // IonTabBar,
    // IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButton,
    IonButtons,
  } from "@ionic/vue";

  import { 
    ellipse, 
    square,
    triangle,
    star, 
    } from 'ionicons/icons';

    import { defineComponent } from 'vue';

  export default {
    props: ["pageTitle", "pageDefaultBackLink"],
    components: {
      // IonIcon,
      // IonTabs,
      // IonRouterOutlet,
      IonPage,
      // IonTabBar,
      // IonLabel,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonBackButton,
      IonButton,
      IonButtons,
      
    },

    // setup(){

    //   const router = useRouter();

    //   const logout = async () => {
    //     await supabase.auth.signOut();
    //     router.push("Register");
    //   }

    // },


  };
  </script>