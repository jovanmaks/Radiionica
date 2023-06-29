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
            <ion-content class="ion-padding">
                <div class="input-button-container">
                    <!-- Textual Input Fields -->
                    <ion-item>
                        <ion-input v-model="textInput1" placeholder="Naziv"></ion-input>
                    </ion-item>


                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <!-- Textual Input Fields -->
                                <ion-item>
                                    <ion-input v-model="textInput2" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="textInput3" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="textInput4" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="textInput5" placeholder="Ime"></ion-input>
                                </ion-item>

                                <ion-item>
                                    <ion-input v-model.number="numInput1" placeholder="Kolicina"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="textInput6" type="number" placeholder="Overa"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true"></ion-toggle>
                                </ion-item>



                            </ion-col>
                            <ion-col>
                                <!-- Additional Textual Input Fields -->
                                <ion-item>
                                    <ion-input v-model="textInput6" placeholder="Sadrzaj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="textInput7" placeholder="Sadrzaj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model.number="numInput2" type="number" placeholder="Broj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model.number="numInput3" type="number" placeholder="Broj"></ion-input>
                                </ion-item>

                                <ion-item>
                                    <ion-input v-model.number="numInput4" type="number" placeholder="Alarm na"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true"></ion-toggle>
                                </ion-item>

                                <ion-item>
                                    <ion-input v-model="textInput8" type="number" placeholder="Overa"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true"></ion-toggle>
                                </ion-item>

                            </ion-col>
                        </ion-row>

                        <!-- Add the remaining input fields below as needed -->
                    </ion-grid>

                    <ion-item>
                        <ion-input v-model.number="numInput5" placeholder="Cena"></ion-input>
                    </ion-item>
                    <!-- Datetime Ionic Input Field -->
                    <ion-item>
                        <ion-datetime v-model="dateInput" placeholder="Select Date"></ion-datetime>
                   
                    </ion-item>
                    <ion-item>
                      
                        <ion-toggle :enable-on-off-labels="true">Notifikacija</ion-toggle>
                    </ion-item>
                    <!-- Additional Textual Input Fields -->

                </div>
            </ion-content>
        </ion-modal>

    </ion-menu>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useStore } from 'vuex';
import { close, checkmark } from 'ionicons/icons';
import { IonDatetime } from '@ionic/vue';

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
    IonIcon,
    IonItem,
    IonInput,
    IonToggle,

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
        IonIcon,
        IonItem,
        IonInput,
        IonToggle,
    },
    setup() {


        const isOpen = ref(false);
        const newNote = ref("");
        const data = ref({}); // Some data you want to pass to the Modal component

        const textInput1 = ref("");
        const textInput2 = ref("");
        const textInput3 = ref("");
        const textInput4 = ref("");
        const textInput5 = ref("");
        const textInput6 = ref("");
        const textInput7 = ref("");
        const textInput8 = ref("");
        // const textInput9 = ref("");
        // const textInput10 = ref("");

        const numInput1 = ref(0.0);
        const numInput2 = ref(0.0);
        const numInput3 = ref(0.0);
        const numInput4 = ref(0.0);
        const numInput5 = ref(0.0);
        // const numInput6 = ref(0.0);

        const dateInput = ref("");


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
            textInput1,
            textInput2,
            textInput3,
            textInput4,
            textInput5,
            textInput6,
            textInput7,
            textInput8,
            // textInput9,
            // textInput10,
            numInput1,
            numInput2,
            numInput3,
            numInput4,
            numInput5,
            // numInput6,
            dateInput,
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