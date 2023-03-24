<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div class="ion-padding">
          <h1>Supabase + Ionic Vue</h1>
          <p>Sign in via magic link with your email below</p>
        </div>
        <ion-list :inset="true">
          <form @submit.prevent="login">

            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                v-model="email"
                name="email"
                autocomplete="name"
                type="email"
              ></ion-input>
            </ion-item>
            
            
            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input
                v-model="password"
                type="password"
                name="password"
                autocomplete="name"
              ></ion-input>
            </ion-item>

            <div class="ion-text-center">
              <ion-button type="submit" fill="clear">Login</ion-button>
            </div>
          </form>
        </ion-list>
        <!-- <p>{{email}}</p> -->
      </ion-content>
  
    </ion-page>
  </template>
  
  <script lang="ts">
  import { supabase } from '../supabase';
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    toastController,
    loadingController,
  } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from "vue-router";
  export default defineComponent({
    name: 'LoginPage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    setup() {
      const router = useRouter();
      const email = ref('');
      const password = ref('');
      const errorMsg = ref('');

      const login = async () => {
        try{
          const {error} = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          });
          if(error) throw error; 
          router.push({name: "Account"});
        }catch(error){
          // errorMsg.value =  

        }
      }


      // const handleLogin = async () => {
      //   const loader = await loadingController.create({});
      //   const toast = await toastController.create({ duration: 5000 });
      //   try {
      //     await loader.present();
      //     const { error } = await supabase.auth.signInWithPassword({ email: email.value,password: password.value, });
      //     if (error) throw error;
      //     toast.message = 'Check your email for the login link!';
      //     await toast.present();
      //   } catch (error: any) {
      //     toast.message = error.error_description || error.message;
      //     await toast.present();
      //   } finally {
      //     await loader.dismiss();
      //   }
      // };

      return {email, password, errorMsg, login};
    },
  });
  </script>