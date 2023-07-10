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

                <form @submit.prevent="register">
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <ion-input v-model="email" type="email" name="email" autocomplete="name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked">Password</ion-label>
                        <ion-input v-model="password" type="password" name="password" autocomplete="name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked">Confirm password</ion-label>
                        <ion-input v-model="confirmPassword" type="password" name="confirmPassword"
                            autocomplete="name"></ion-input>
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

    setup() {
        // Create data
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const errorMsg = ref('');


        // Register function
        const register = async () => {
            if (password.value === confirmPassword.value) {
                try {
                    const { user, error: signUpError } = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value,
                    });

                    if (signUpError) throw signUpError;

     

                    router.push({ name: 'Login' });
                } catch (error) {
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

        return { email, password, confirmPassword, errorMsg,  register };
    },
});

</script>