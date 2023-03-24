<template>
    <ion-page>

      <ion-header>
        <ion-toolbar>
          <ion-title>Register</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="ion-padding">
        <!--  Error handling-->
        </div>

        <ion-list :inset="true">
            
          <form @submit.prevent="register" >
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                v-model="email"
                type="email"
                name="email"
                autocomplete="name"
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

            <ion-item>
              <ion-label position="stacked">Confirm password</ion-label>
              <ion-input
                v-model="confirmPassword"
                type="password"
                name="confirmPassword"
                autocomplete="name"
              ></ion-input>
            </ion-item>

            <div class="ion-text-center">
              <ion-button type="submit" fill="clear">Register</ion-button>
            </div>

            <div class="ion-text-center">
                <ion-button fill="clear" :router-link="{ path: '/login' }">Click here to l ogin</ion-button>
            </div>
          </form>
         
          
        </ion-list>
      </ion-content>
    </ion-page>
</template>


<script lang="ts">
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
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    toastController,
    loadingController,
  } from '@ionic/vue';
export default defineComponent({
    name: 'RegisterPage',
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

    setup(){
        // Create data
        const router = useRouter();
        const email            = ref('');
        const password         = ref('');
        const confirmPassword  = ref('');
        const errorMsg         = ref('');
        
        // Register function
        const register = async () =>{
            if (password.value === confirmPassword.value){
               try{
                    const {error} = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value,
                    });
                console.log('odradio si auth');
                if (error) throw error;
                router.push({name: 'Login'});
                }catch(error){
                console.log('u ketchu si');
                // errorMsg.value = error.message;
                    
               } 
               return;
            }
            errorMsg.value = "Error: Password do not match";
            setTimeout( () => {
                errorMsg.value = '';
            }, 5000);
        };

        return { email,password,confirmPassword,errorMsg, register };
    },


});

</script>