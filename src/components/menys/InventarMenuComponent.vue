
<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="end" fill="clear">
                    <ion-button size="large" fill="clear">
                        <ion-icon :icon="documentAttachOutline"></ion-icon>
                    </ion-button>
                    <ion-button @click="showArchivedInventar" size="large" fill="clear">
                        <ion-icon :icon="archiveOutline"></ion-icon>
                    </ion-button>
                    <ion-button @click="showUnarchivedInventar" size="large" fill="clear">
                        <!-- <ion-icon :icon="receiptOutline"></ion-icon> -->
                        <ion-icon :icon="receiptOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>


        <ion-footer>
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
                                        <ion-fab-button @click="openEmptyModal">
                                            <ion-icon :icon="add"></ion-icon>
                                        </ion-fab-button>
                                    </ion-fab-list>
                                    <ion-fab-list side="start">
                                        <ion-fab-button @click="showTemplejtSelect = true">
                                            <ion-icon :icon="documentAttachOutline"></ion-icon>
                                        </ion-fab-button>
                                    </ion-fab-list>
                                </ion-fab>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-toolbar>
            </ion-footer>
        </ion-footer>



        <ion-content>
            <InventarCardComponent v-for="card in displayInventar" :key="card?.id" :card="card" @view-card="viewCard"
                @archive-inventar="archiveInventar" @delete-inventar="deleteInventar" @return-inventar="returnInventar" />

        </ion-content>
    </ion-menu>

    <!-- Ovdje treba da stavis add note component -->
    <!-- <AddNoteModalComponent :isOpen="isOpenRef" @update:isOpen="setOpen" @submit="submitInventar" /> -->


    <TemplejtSelect :show="showTemplejtSelect" :templejtValues="filteredTemplejtValues"
        @didDismiss="showTemplejtSelect = false" @selectedTemplate="selectTemplate" />

    <ModalComponent :key="modalKey" :isOpen="isOpen" :selectedTemplate="selectedTemplate" @update:isOpen="setOpen"
        @submit="submitInventar" :id="modalId" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useStore } from 'vuex';
import { close, checkmark, add, documentAttachOutline, archiveOutline, receiptOutline } from 'ionicons/icons';
import { watch, computed } from 'vue';


import TemplejtSelect from '@/components/reusable/TemplejtSelect.vue';
import InventarCardComponent from '@/components/reusable/InventarCardComponent.vue';
import ModalComponent from '@/components/reusable/ModalComponent.vue';
import { Inventar } from "@/store/modules/inventory";


import {
    IonContent,
    IonFooter,
    IonMenu,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonButton,
    IonButtons,
} from '@ionic/vue';

export default {
    name: 'ParentComponent',
    components: {
        InventarCardComponent,
        TemplejtSelect,
        ModalComponent,

        IonContent,
        IonFooter,
        IonMenu,
        IonToolbar,
        IonGrid,
        IonRow,
        IonCol,
        IonFab,
        IonFabButton,
        IonFabList,
        IonIcon,
        IonButton,
        IonButtons,
    },

    setup() {

        const store = useStore();
        const inventarItems = computed(() => store.state.inventory.inventar);
        const isOpen = ref(false);
        const showTemplejtSelect = ref(false);
        const templejtValues = computed(() => store.state.inventory.templejtValues);
        const modalId = ref('');

        const filteredTemplejtValues = computed(() => {
            return templejtValues.value.filter((item: string) => !item.startsWith('modal'));
        });

        const archivedInventar = computed(() => store.getters['inventory/archivedInventar']);
        const unarchivedInentar = computed(() => store.getters['inventory/unarchivedNotes']);
        const displayArchivedInventar = ref(false);
        const selectedTemplate = ref<Template | null>(null);
        const modalKey = ref(0);


        interface Template {
            deklaracija: string;
            text_1_label: string;
            text_2_label: string;
            num_1_label: string;
            num_2_label: string;
            switch_1_label: string;
            switch_2_label: string;
            templejt_ime: string;

            // kolicina: number;
            // text_1: string;
            // text_2: string;
            // num_1: number;
            // num_2: number;
            // kolicina_notifikacija: number;
            // switch_1: boolean;
            // switch_2: boolean;
            // kolicina_isNotified: boolean;
            // templejt: string[];
        }

        const displayInventar = computed(() => {
            const inventarToDisplay = displayArchivedInventar.value ? archivedInventar.value : unarchivedInentar.value;
            return inventarToDisplay;
        });

        const archiveInventar = (inventarId: string | number) => {
            console.log('Archive inventar', inventarId);
            store.dispatch('inventory/archiveInventar', inventarId);
        };

        const deleteInventar = (inventarId: string | number) => {
            console.log('Delete inventar', inventarId);
            store.dispatch('inventory/deleteInventar', inventarId);
        };

        const returnInventar = (inventarId: string | number) => {
            console.log('Return inventar', inventarId);
            store.dispatch('inventory/returnInventar', inventarId);
        };


        onMounted(async () => {
            await store.dispatch('inventory/fetchInventar');
        });


        const selectTemplate = (templejt_ime: string) => {
            const template = inventarItems.value.find((template: Template) => template.templejt_ime === templejt_ime);
            if (template) {

                selectedTemplate.value = template;
                console.log('Selected template', selectedTemplate.value);
                setOpen(true); // This opens the modal after template selection
            } else {
                console.error('Template not found');
            }
        };

        const openEmptyModal = () => {
            modalId.value = 'modal-' + Math.floor(Math.random() * 1000000);
            selectedTemplate.value = null;
            setOpen(true);
        };

        const setOpen = (state: boolean) => {
            isOpen.value = state;
            if (!state) {
                modalKey.value++;
            }
        };

        const viewCard = (cardName: string) => {
            console.log(`Card clicked: ${cardName}`);
        };

        const submitInventar = async (inventar: Partial<Inventar>) => {
            console.log('Ovo je inventar', inventar);
            try {
                await store.dispatch('inventory/createInventar', inventar);
                console.log('Inventar created', inventar);
                await store.dispatch('inventory/fetchInventar'); // reload inventar after creation
                // qrCodeDataUrl.value = await store.dispatch('inventory/generateQRCode', inventar);

            } catch (error) {
                console.error('Error creating Inventar', error);
            }
            console.log('ispitivanje', inventar);
            setOpen(false);
        };

        const showArchivedInventar = () => {
            displayArchivedInventar.value = true;
            console.log('Ovo je archived', archivedInventar.value);
        };

        const showUnarchivedInventar = () => {
            displayArchivedInventar.value = false;
            console.log('Ovo je unarchived', unarchivedInentar.value);
        };

        return {
            inventarItems,
            viewCard,
            add, documentAttachOutline,
            isOpen,
            setOpen,
            showTemplejtSelect,
            submitInventar,
            archiveOutline,
            receiptOutline,
            showArchivedInventar,
            showUnarchivedInventar,
            archivedInventar,
            unarchivedInentar,
            displayInventar,
            templejtValues,
            selectedTemplate,
            selectTemplate,
            openEmptyModal,
            modalKey,
            modalId,
            filteredTemplejtValues,
            archiveInventar,
            deleteInventar,
            returnInventar,
            // qrCodeDataUrl,
        };
    },
};

</script>

<style scoped></style>
