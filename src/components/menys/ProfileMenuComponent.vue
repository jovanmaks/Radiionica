<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-profile" side="start">
        <!-- ... rest of your side menu ... -->
        <div class="logout-button-container">
            <ion-menu-toggle>
                <ion-button @click="signOut" fill="clear" size="large">
                    <ion-icon :icon="logOutOutline"></ion-icon>
                </ion-button>
            </ion-menu-toggle>
        </div>
    </ion-menu>
</template>

<script lang="ts">

import {
    IonButton, IonContent, IonHeader, IonMenu, IonMenuToggle, IonPage,
    IonTitle, IonToolbar, IonSegment, IonSegmentButton,
} from '@ionic/vue';

import { layersOutline, logOutOutline } from 'ionicons/icons';
import { useStore } from "vuex";
import { useRouter } from "vue-router";


export default {
    components: {
        IonMenu,
        IonMenuToggle,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const signOut = async () => {
            store.dispatch('user/signOut')
                .then(() => {
                    router.push({ name: "Entrance" });
                })
                .catch((error) => {
                    // handle the error as you see fit
                    console.error("Error signing out:", error);
                });
        };
        return {
            signOut,
            logOutOutline,
            // layersOutline
        }
    }
}

</script>



<style scoped>
.button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.logout-button-container {
    display: flex;
    justify-content: flex-end;
}
</style>
