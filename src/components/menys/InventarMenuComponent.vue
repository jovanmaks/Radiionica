<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-content>
            <ion-card>
                <ion-card-header>
                    Dummy Card
                </ion-card-header>
                <ion-card-content>
                    This is a dummy ion card.
                </ion-card-content>
            </ion-card>
            <!-- Add as many cards as you want here -->
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" @click="setOpen(true)">Add</ion-button>
                        </ion-col>
                        <!-- <ion-col>
                            <ion-button expand="full">Temp</ion-button>
                        </ion-col> -->
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-footer>

        <!-- Modal -->
        <ion-modal :is-open="isOpen" css-class="my-custom-class" @didDismiss="setOpen(false)">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="setOpen(false)">
                            <ion-icon :icon="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button :strong="true" @click="confirmChanges">
                            <ion-icon :icon="checkmark"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <Modal :data="data"></Modal>
            <ion-content class="ion-padding">
                <div class="input-button-container">
                    <ion-item style="flex-grow: 1">
                        <ion-input v-model="newNote" placeholder="Enter note"></ion-input>
                    </ion-item>
                </div>
            </ion-content>
        </ion-modal>


    </ion-menu>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { close, checkmark } from 'ionicons/icons';

import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonContent,
    IonMenu,
    IonFooter,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonIcon
} from '@ionic/vue';

export default {
    components: {
        IonMenu,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonButton,
        IonFooter,
        IonToolbar,
        IonGrid,
        IonRow,
        IonCol,
        IonModal,
        IonIcon
    },
    setup() {


        const isOpen = ref(false);
        const newNote = ref("");
        const data = ref({}); // Some data you want to pass to the Modal component

        const setOpen = (state: boolean) => {
            isOpen.value = state;
        };

        const confirmChanges = () => {
            // Here you can define what happens when the user clicks on the confirm button
            // e.g. sending the newNote value somewhere
            console.log("Note:", newNote.value);
            setOpen(false);
        };

        return {
            isOpen,
            setOpen,
            newNote,
            data,
            confirmChanges,
            close,
            checkmark
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