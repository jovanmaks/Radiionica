
<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start" fill="clear">
                    <ion-button @click="toggleShowModalItems" size="large" fill="clear">
                        <ion-icon :icon="documentAttachOutline"
                            :class="{ 'clicked-icon': isDocumentAttachOutlineButtonClicked }"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end" fill="clear">
                    <ion-button @click="showArchivedInventar" size="large" fill="clear">
                        <ion-icon :icon="archiveOutline"></ion-icon>
                    </ion-button>
                    <ion-button @click="showUnarchivedInventar" size="large" fill="clear">
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
            <InventarCardComponent v-for="card in displayInventar" :key="card?.id" :card="card" @edit-card="editCard"
                @archive-inventar="archiveInventar" @delete-inventar="deleteInventar" @return-inventar="returnInventar"
                @qr-inventar="shareCode" />

        </ion-content>
    </ion-menu>

    <TemplejtSelect :show="showTemplejtSelect" :templejtValues="filteredTemplejtValues"
        @didDismiss="showTemplejtSelect = false" @selectedTemplate="selectTemplate" />

    <ModalComponent :key="modalKey" :isOpen="isOpen" :selectedTemplate="selectedTemplate" @update:isOpen="setOpen"
        @submit="submitInventar" :id="modalId" :editId="editId" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useStore } from 'vuex';
import { close, checkmark, add, documentAttachOutline, archiveOutline, receiptOutline, card } from 'ionicons/icons';
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

        const isDocumentAttachOutlineButtonClicked = ref(false);
        const editId = ref<number | ''>('');




        interface Template {
            deklaracija: string;
            text_1_label: string;
            text_2_label: string;
            num_1_label: string;
            num_2_label: string;
            switch_1_label: string;
            switch_2_label: string;
            templejt_ime: string;

        }


        onMounted(async () => {
            await store.dispatch('inventory/fetchInventar');
        });

        const toggleShowModalItems = () => {
            isDocumentAttachOutlineButtonClicked.value = !isDocumentAttachOutlineButtonClicked.value;
        }


        const displayInventar = computed(() => {
            const inventarToDisplay = displayArchivedInventar.value ? archivedInventar.value : unarchivedInentar.value;
            if (isDocumentAttachOutlineButtonClicked.value) {
                return inventarToDisplay.filter((item: Inventar) => !item.templejt_ime.startsWith('modal'));
            } else {
                return inventarToDisplay.filter((item: Inventar) => item.templejt_ime.startsWith('modal'));
            }
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

        const shareCode = (inventarId: string | number) => {
            console.log('Share code');
            const inventarItem = inventarItems.value.find((item: Inventar) => item.id === inventarId);



            if (inventarItem && inventarItem.qr_code) {
                store.dispatch('inventory/shareQRCode', inventarItem.qr_code);
            }
        };


        const selectTemplate = (templejt_ime: string, card?: Inventar) => {
            const template = inventarItems.value.find((template: Template) => template.templejt_ime === templejt_ime);
            if (template) {
                selectedTemplate.value = template;
                console.log('Selected template', selectedTemplate.value);
                setOpen(true); // This opens the modal after template selection
            } else {
                console.error('Template not found');
            }
        };

        const openEmptyModal = (card?: Inventar) => {
            modalId.value = 'modal-' + Math.floor(Math.random() * 1000000);
            selectedTemplate.value = card || null;
            if (card && card.id) { // Ensure card has valid id
                editId.value = card.id;
            } else {
                editId.value = '';
            }
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

        const editCard = (card: Inventar) => {
            if (card.id) {
                console.log('Editing card', card);
                openEmptyModal(card);
            } else {
                console.error('No valid id found for card:', card);
            }
        };
        const submitInventar = async (inventar: Partial<Inventar>) => {
            try {
                console.log('Ovo je inventar id', inventar.id);
                if (editId.value) {
                    const inventarToUpdate = { ...inventar, id: editId.value };
                    await store.dispatch('inventory/updateInventar', inventarToUpdate); // update existing inventar
                } else {
                    await store.dispatch('inventory/createInventar', inventar); // create new inventar
                }
                await store.dispatch('inventory/fetchInventar'); // reload inventar after creation or updating
                // qrCodeDataUrl.value = await store.dispatch('inventory/generateQRCode', inventar);

            } catch (error) {
                console.error('Error creating or updating Inventar', error);
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
            toggleShowModalItems,
            isDocumentAttachOutlineButtonClicked,
            editCard,
            editId,
            shareCode,
        };
    },
};

</script>

<style scoped>
.clicked-icon {
    color: blue;
    /* Choose the color you want when the icon is clicked */
}
</style>
