<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-content>
            <ion-card v-for="(item, index) in inventoryItems" :key="index">
                <ion-card-header>
                    {{ item.deklaracija }}
                </ion-card-header>
                <ion-card-content>
                    {{ item.description }}
                </ion-card-content>
            </ion-card>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                        <ion-col style="display: flex; justify-content: center; align-items: center;">
                            <ion-fab>
                                <ion-fab-button size="small" expand="full">
                                    <ion-icon :icon="add"></ion-icon>
                                </ion-fab-button>
                                <ion-fab-list side="end">
                                    <ion-fab-button @click="setOpen(true)">
                                        <ion-icon :icon="add"></ion-icon>
                                    </ion-fab-button>
                                </ion-fab-list>
                                <ion-fab-list side="start">
                                    <ion-fab-button @click="openActionSheet">
                                        <ion-icon :icon="documentOutline"></ion-icon>
                                    </ion-fab-button>
                                </ion-fab-list>
                            </ion-fab>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-footer>

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
            <ion-content class="ion-padding">yy

                <div class="input-button-container">
                    <ion-item>
                        <ion-input v-model="deklaracija" placeholder="Naziv"></ion-input>
                    </ion-item>


                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-item>
                                    <ion-input v-model="text_1_label" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="text_2_label" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="num_1_label" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="num_2_label" placeholder="Ime"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model.number="kolicina" type="number" placeholder="Kolicina"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="switch_1_label" placeholder="Overa"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true" v-model="switch_1"></ion-toggle>
                                </ion-item>


                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-input v-model="text_1" placeholder="Sadrzaj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model="text_2" placeholder="Sadrzaj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model.number="num_1" type="number" placeholder="Broj"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input v-model.number="num_2" type="number" placeholder="Broj"></ion-input>
                                </ion-item>

                                <ion-item>
                                    <ion-input v-model.number="kolicina_notifikacija" type="number"
                                        placeholder="Alarm na"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true" v-model="kolicina_isNotified"></ion-toggle>
                                </ion-item>

                                <ion-item>
                                    <ion-input v-model="switch_2_label" placeholder="Overa"></ion-input>
                                    <ion-toggle :enable-on-off-labels="true" v-model="switch_2"></ion-toggle>
                                </ion-item>

                            </ion-col>
                        </ion-row>

                    </ion-grid>

                    <ion-item>
                        <ion-input v-model.number="cena" type="number" placeholder="Cena"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-datetime v-model="datetimeInput" placeholder="Select Date"></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-toggle :enable-on-off-labels="true" v-model="datetime_isNotified">Notifikacija</ion-toggle>
                    </ion-item>
                    <!-- <ion-button expand="full" @click="saveTemplate">Sacuvaj templejt</ion-button> -->
                    <ion-item>
                        <ion-input v-model="templejt" placeholder="Templejt"></ion-input>
                    </ion-item>

                    <!-- <div v-if="qrCodeDataUrl">
                        <img :src="qrCodeDataUrl" alt="QR Code">
                    </div> -->

                </div>
            </ion-content>


            <!-- <TemplejtSelect v-model="isTemplejtOpen" @close="setTemplejtOpen(false)" /> -->
            <!-- <PriorityControl :note="note" :show="showActionSheet" @didDismiss="handleDismiss"/> -->
            <TemplejtSelect v-model="isActionSheetOpen" />
        </ion-modal>

    </ion-menu>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useStore } from 'vuex';
import { close, checkmark, add, documentOutline } from 'ionicons/icons';
// import { IonDatetime } from '@ionic/vue';
import { watch, computed } from 'vue';
import TemplejtSelect from '@/components/reusable/TemplejtSelect.vue';


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
    IonDatetime,
    IonFab,
    IonFabButton,
    // IonCheckbox,

} from '@ionic/vue';

export default {
    components: {
        TemplejtSelect,
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
        IonDatetime,
        IonFab,
        IonFabButton,
        // IonCheckbox,
    },
    setup() {


        // console.log(store) // Log the Vuex store
        // console.log(store.getters) // Log the Vuex store's getters


        // const inventoryItems = computed(() => {
        //     const items = store.getters.getAllInventar
        //     const ct = store.getters.inventarCount;
        //     console.log(items) // Log the return value of the getter
        //     return items
        // });

        const isOpen = ref(false);
        const newNote = ref("");
        const data = ref({}); // Some data you want to pass to the Modal component
        const username = computed(() => store.state.user.username);

        const deklaracija = ref("");
        const kolicina = ref(0.0);
        const kolicina_notifikacija = ref(0.0);
        const kolicina_isNotified = ref(false);
        const cena = ref(0.0);
        const num_1_label = ref("");
        const num_1 = ref(0.0);
        const num_2_label = ref("");
        const num_2 = ref(0.0);
        const text_1_label = ref("");
        const text_1 = ref("");
        const text_2_label = ref("");
        const text_2 = ref("");
        const switch_1_label = ref("");
        const switch_1 = ref(false);
        const switch_2_label = ref("");
        const switch_2 = ref(false);
        const datetimeInput = ref(null);
        const datetime_isNotified = ref(false);
        const kreator = ref("");
        const dateInput = ref("");
        const qrCodeDataUrl = ref(null);
        const isArchived = ref(false);
        const templejt = ref("");

        const store = useStore();
        const isTemplejtOpen = ref(false);
        const isActionSheetOpen = ref(false);

        const inventoryItems = computed(() => store.getters['inventory/getAllInventar']);

        // const noteCount = computed(() => store.getters['notes/notesCount']);

        const setTemplejtOpen = (state: boolean) => {
            isTemplejtOpen.value = state;
        };

        const openTemplejt = () => {
            // console.log('openTemplejt');
            setTemplejtOpen(true);
        };


        const setOpen = (state: boolean) => {
            isOpen.value = state;
        };


        const openActionSheet = () => {
            console.log('openActionSheet');
            isActionSheetOpen.value = true;
        };



        watch(dateInput, (newValue) => {
            if (newValue) {
                const dateTimeArray = newValue.split('T');
                const dateValue = dateTimeArray[0]; // the date part
                const timeValue = dateTimeArray[1] ? dateTimeArray[1].split('.')[0] : ''; // the time part
            }
        });


        const confirmChanges = async () => {

            console.log('Inventar sa getera', inventoryItems.value);
            const arrayToFill = [
                templejt.value,
                text_1_label.value,
                text_2_label.value,
                num_1_label.value,
                num_2_label.value,
                switch_1_label.value,
                switch_2_label.value
            ];

            let datetime = null;
            if (datetimeInput.value !== null) {
                datetime = datetimeInput.value; // directly assign the value
            }
            const inventarData = {
                deklaracija: deklaracija.value,
                kolicina: kolicina.value,
                kolicina_notifikacija: kolicina_notifikacija.value,
                kolicina_isNotified: kolicina_isNotified.value,
                cena: cena.value,
                num_1_label: num_1_label.value,
                num_1: num_1.value,
                num_2_label: num_2_label.value,
                num_2: num_2.value,
                text_1_label: text_1_label.value,
                text_1: text_1.value,
                text_2_label: text_2_label.value,
                text_2: text_2.value,
                switch_1_label: switch_1_label.value,
                switch_2_label: switch_2_label.value,
                switch_1: switch_1.value,
                switch_2: switch_2.value,
                datetime: datetimeInput.value,
                datetime_isNotified: datetime_isNotified.value,
                kreator: username.value,
                qr_code: qrCodeDataUrl.value,
                isArchived: isArchived.value,
                templejt: arrayToFill,
            };

            // Dispatch the action to insert the new inventar into the database
            qrCodeDataUrl.value = await store.dispatch('inventory/generateQRCode', inventarData);

            const inventar = {
                ...inventarData,
                qr_code: qrCodeDataUrl.value
            };

            await store.dispatch('inventory/createInventar', inventar);

            console.log('inventar', inventar);

            setOpen(false);
        };


        return {
            isOpen,
            setOpen,
            deklaracija,
            text_1_label,
            text_2_label,
            num_1_label,
            num_2_label,
            switch_1_label,
            switch_2_label,
            switch_1,
            switch_2,
            text_1,
            text_2,
            kolicina,
            num_1,
            num_2,
            kolicina_notifikacija,
            kolicina_isNotified,
            cena,
            dateInput,
            datetimeInput,
            datetime_isNotified,
            confirmChanges,
            templejt,
            close,
            checkmark,
            qrCodeDataUrl,
            add,
            documentOutline,
            openActionSheet,
            isTemplejtOpen,
            setTemplejtOpen,
            openTemplejt,
            isActionSheetOpen,
            inventoryItems,

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