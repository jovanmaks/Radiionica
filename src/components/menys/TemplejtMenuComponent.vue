<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-templejt" side="start">
        <!-- ... -->
    </ion-menu>
    <!-- <ion-page id="main-content"> -->
    <!-- <div> -->
        <!-- <ion-content class="ion-padding">
            <div class="button-container">
                <ion-menu-toggle menu="sideMenu-project">
                    <ion-button size="large" fill="clear">
                        <ion-icon :icon="layersOutline"></ion-icon>
                    </ion-button>
                </ion-menu-toggle>
            </div>
        </ion-content> -->
    <!-- </div> -->
    <!-- </ion-page> -->
</template>

<script lang="ts">

import {
    IonButton, IonContent, IonHeader, IonMenu, IonMenuToggle, IonPage,
    IonTitle, IonToolbar, IonSegment, IonSegmentButton,
} from '@ionic/vue';
import { layersOutline } from 'ionicons/icons';

export default {
    components: {
        IonMenu,
        // IonMenuToggle,
    },
    setup() {
        return {
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
</style>