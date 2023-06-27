<template>
    <ion-page>

      <ion-header>
        <ion-toolbar>
          <ion-title></ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>

        <ion-list :inset="true">
            
          <!--  Error handling-->
          <div v-if="errorMsg" class="ion-padding">
            <p>{{ errorMsg }}</p>
          </div>

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


            <!-- <ion-item v-for="item in items" :key="item.id">
              <ion-checkbox slot="start" v-model="item.checked"></ion-checkbox>
              <ion-label>{{ item.label }}</ion-label>
            </ion-item> -->


            <div class="ion-text-center">
              <ion-button type="submit" fill="clear">Register</ion-button>
            </div>

            <div class="ion-text-center">
                <ion-button fill="clear" :router-link="{ path: '/login' }">Click here to login</ion-button>
            </div>
            
            
          </form>
        </ion-list>
        

      </ion-content>
    </ion-page>
</template>


<!-- <script lang="ts"> -->
<script>
import { supabase } from '../../supabase';
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
    // IonCheckbox,
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
      // IonCheckbox,
    },

      setup(){
          // Create data
          const router = useRouter();
          const email            = ref('');
          const password         = ref('');
          const confirmPassword  = ref('');
          const errorMsg         = ref('');
          
          
        const items = ref([
        { id: 1, label: 'Ponuda',                checked: false },
        { id: 2, label: 'Crtanje',               checked: false },
        { id: 3, label: 'Programiranje',         checked: false },
        { id: 4, label: 'PripremaZaSjecenje',    checked: false },
        { id: 5, label: 'Sjecenje',              checked: false },
        { id: 6, label: 'PripremaZaFarbanje',    checked: false },
        { id: 7, label: 'Farbanje',              checked: false },
        { id: 8, label: 'Sklapanje',             checked: false },
        { id: 9, label: 'Predaja',               checked: false },
        { id: 10, label:'Transport',             checked: false },
        { id: 11, label:'Fotografisanje',        checked: false },
        { id: 12, label:'Nabavka',               checked: false },
        { id: 13, label:'Magacin',               checked: false },
        { id: 14, label:'Alati',                 checked: false },
        ]);



      const getSelectedLabels = () => {
        return items.value.reduce((acc, item) => {
        acc[item.label] = item.checked;
        return acc;
        }, {});
      };



      const isLabelSelected = (labelName) => {
          const item = items.value.find((item) => item.label === labelName);
          return item ? item.checked : false;
        };

          // // Register function
          // const register = async () =>{
          //     if (password.value === confirmPassword.value){
          //       try{

          //             const userSingUp = await supabase.auth.signUp({
          //                 email: email.value,
          //                 password: password.value,
          //                 options: {
          //                   data:
          //                   {
          //                     selectedLabels: getSelectedLabels(),
          //                   },
          //                 },
          //             });
          //         if (userSingUp.error) throw userSingUp.error;
                  

          //         router.push({name: 'Login'});   
          //         }catch(error){
          //         console.log('u ketchu si');
          //         errorMsg.value = error.message;
          //         setTimeout(()=>{
          //           errorMsg.value = null;
          //         }, 5000);
          //       } 
          //       return;
          //     }
          //     errorMsg.value = "Error: Password do not match";
          //     setTimeout( () => {
          //         errorMsg.value = '';
          //     }, 5000);

          // };

          // Register function
          const register = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (signUpError) throw signUpError;
      
      // If signup is successful, insert the new user data into publicusers table
      // if (user) {
      //   const { data, error: insertError } = await supabase
      //     .from('publicusers')
      //     .insert([
      //       {
      //         userid: user.id,
      //         user_email: email.value,
      //       },
      //     ]);

      //   // Log the response from the insert query
      //   console.log('Insert Response:', data, insertError);
        
      //   if (insertError) throw insertError;
      // }

      router.push({ name: 'Login' });   
    } catch(error) {
      console.log('Error occurred:', error.message);
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    } 
  } else {
    errorMsg.value = "Error: Passwords do not match";
    setTimeout(() => {
        errorMsg.value = '';
    }, 5000);
  }
};

          return { email, password, confirmPassword, errorMsg, items, register  };
      },
});

</script>