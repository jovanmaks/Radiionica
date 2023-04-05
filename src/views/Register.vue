<template>
    <ion-page>

      <ion-header>
        <ion-toolbar>
          <ion-title>Register</ion-title>
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

            <!-- <ion-item>
              <ion-label>role</ion-label>
              <ion-select v-model="role" ok-text="Select" cancel-text="Cancel">
                <ion-select-option value="admin">Admin</ion-select-option>
                <ion-select-option value="tehnicar">Tehnicar</ion-select-option>
                <ion-select-option value="modeler">Modeler</ion-select-option>
              </ion-select>
            </ion-item> -->

            <!-- <ion-item>
              <ion-label>Role</ion-label>
              <ion-select v-model="role">
                <ion-select-option v-for="r in roles" :key="r" :value="r">{{r}}</ion-select-option>
              </ion-select>
            </ion-item> -->
<!-- 
            <ion-item>
              <ion-select  aria-label="fruit"   placeholder="Select fruit" v-model="SelectedFruit">
                <ion-select-option value="apples">Apples</ion-select-option>
                <ion-select-option value="oranges">Oranges</ion-select-option>
                <ion-select-option value="bananas">Bananas</ion-select-option>
              </ion-select>
            </ion-item> -->


            <ion-item>
              <ion-select  aria-label="rolee"   placeholder="Selected role" v-model="role">
                <ion-select-option value="admin">Admin</ion-select-option>
                <ion-select-option value="tehnicar">Tehnicar</ion-select-option>
                <ion-select-option value="modeler">Modeler</ion-select-option>
              </ion-select>
            </ion-item>


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


<!-- aaaaa -->
<!-- <script lang="ts"> -->
<script>
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
    IonSelect,
    IonSelectOption,
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
      IonSelect,
      IonSelectOption,
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
          const role             = ref(null);
          // const role             = ref('');
          const SelectedFruit             = ref(null);
          
          const roles = ref(['admin1', 'tehnicar1', 'modeler1']);



          // Register function
          const register = async () =>{
              if (password.value === confirmPassword.value){
                try{
                      const userSingUp = await supabase.auth.signUp({
                          email: email.value,
                          password: password.value,
                          options: {
                            data: {role: role.value,},
                          },
                      });
                      console.log('ovdje_1')
                      console.log(role.value)

                      // Add the role to the user
                    //  const insertRole = await supabase
                    //     .from('user_roles')
                    //     .update({
                    //       role: role.value,
                    //       // user_id: userSingUp.id,
                    //     })
                    //     .eq('id', userSingUp.id);
                        
                      console.log('ovdje_2')
                      
                      
                    // const roleError = await supabase.from('user_roles').insert({
                    // user_id: response.user?.id,
                    // role: response.role.value,
                    //   });

                    // if (role) {
                    //   throw roleError;
                    // }



                  console.log('odradio si auth');
                  if (userSingUp.error) throw userSingUp.error;
                  router.push({name: 'Login'});   
                  }catch(error){
                  console.log('u ketchu si');
                  // console.log('testRole')
                  // console.log(role.value)
                  errorMsg.value = error.message;
                  setTimeout(()=>{
                    errorMsg.value = null;
                  }, 5000);
                } 
                return;
              }
              errorMsg.value = "Error: Password do not match";
              setTimeout( () => {
                  errorMsg.value = '';
              }, 5000);
          };

          return { email,password,confirmPassword,errorMsg, role, roles, register, SelectedFruit };
      },
});

</script>