<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div class="ion-padding">
          <h1>Radionica</h1>
        </div>
        <ion-list :inset="true">
        
          <!--  Error handling-->
          <div v-if="errorMsg" class="ion-padding">
            <p>{{ errorMsg }}</p>
          </div>

          
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
            
            <div class="ion-text-center">
                <ion-button fill="clear" :router-link="{ path: '/register' }">Click here to Register</ion-button>
            </div>

            
          </form>
        </ion-list>
        <!-- <p>{{email}}</p> -->
      </ion-content>
  
    </ion-page>
  </template>
  
  <script   >
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
      const user_roles = ref('');

      const login = async () => {
        try{
          const {error} = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          });
          if(error) throw error; 
          
          const {
            data: { user },
          } = await supabase.auth.getUser()
          const metadata = user.user_metadata.value
          console.log('meta')
          console.log(user.user_metadata.role)


          console.log('labele',user.user_metadata.selectedLabels.Alati);
          console.log('labele2',user.user_metadata.selectedLabels.Ponuda);
          console.log('labele3',user.user_metadata.selectedLabels.Crtanje);
          console.log('labele4',user.user_metadata.selectedLabels.Magacin);

          router.push({name: "Home"});
        }catch(error){
          errorMsg.value = error.message;
          setTimeout(()=>{
          errorMsg.value = null;
          }, 5000);
          return;
        }
        errorMsg.value = "Error: bad pasword";
        setTimeout( () => {
        errorMsg.value = '';
        }, 5000);
      }

      return {email, password, errorMsg, login};
    },
  });
  </script>