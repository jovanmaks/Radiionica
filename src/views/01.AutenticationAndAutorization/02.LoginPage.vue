<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title></ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="ion-padding" style="text-align: center;">
                <h1>Чекић</h1>
            </div>

            <ion-list :inset="true">
                <div v-if="errorMsg" class="ion-padding">
                    <p>{{ errorMsg }}</p>
                </div>

                <form @submit.prevent="login">
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <ion-input v-model="email" name="email" autocomplete="name" type="email"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked">Password</ion-label>
                        <ion-input v-model="password" type="password" name="password" autocomplete="name"></ion-input>
                    </ion-item>

                    <div class="ion-text-center">
                        <ion-button type="submit" fill="clear">Login</ion-button>
                    </div>

                    <div class="ion-text-center">
                        <ion-button fill="clear" :router-link="{ path: '/register' }">Click here to Register</ion-button>
                    </div>
                </form>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useRouter } from "vue-router";
import store from "@/store";
import { useStore } from "vuex";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/vue';

export default defineComponent({
    name: 'LoginPage',
    components: {
        IonButton,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonLabel,
        IonList,
        IonPage,
        IonTitle,
        IonToolbar,
    },

    setup() {
        const appStore = useStore();
        const email = ref('');
        const password = ref('');
        const errorMsg = ref<string | null>('');
        const router = useRouter();

        const login = async () => {
            errorMsg.value = null;

            try {
                const result = await appStore.dispatch('signIn', {
                    email: email.value,
                    password: password.value,
                });

                if (result.error) {
                    errorMsg.value = result.error.message;
                    throw new Error(result.error.message);
                }

                router.push({ name: "Home" });
            } catch (error) {
                errorMsg.value = (error as any).message;
                setTimeout(() => {
                    errorMsg.value = null;
                }, 5000);
            }
        };

        return { email, password, errorMsg, login };
    },
});
</script>