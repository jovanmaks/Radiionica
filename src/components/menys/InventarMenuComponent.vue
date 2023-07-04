
<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="end" fill="clear">
                    <ion-button @click="showArchivedInventar" size="large" fill="clear">
                        <ion-icon :icon="archiveOutline"></ion-icon>
                    </ion-button>
                    <ion-button @click="showUnarchivedInventar" size="large" fill="clear">
                        <ion-icon :icon="documentAttachOutline"></ion-icon>
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
                                            <ion-icon :icon="documentOutline"></ion-icon>
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
            <InventarCardComponent v-for="card in displayInventar" :key="card?.id" :card="card" @view-card="viewCard" />

            <!-- <InventarCardComponent v-for="card in inventarItems" :key="card?.id" :card="card" @view-card="viewCard" /> -->
        </ion-content>
    </ion-menu>


    <TemplejtSelect :show="showTemplejtSelect" :templejtValues="templejtValues" @didDismiss="showTemplejtSelect = false"
        @selectedTemplate="selectTemplate" />
        
        
    <ModalComponent :isOpen="isOpen" @update:isOpen="setOpen" @submit="submitInventar" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useStore } from 'vuex';
import { close, checkmark, add, documentOutline, archiveOutline, documentAttachOutline } from 'ionicons/icons';
import { watch, computed } from 'vue';
// import { Inventar } from "@/store/inventory"; // Modify the path as needed


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
        // const inventarItems = computed(() => store.state.inventory.inventar);
        const inventarItems = computed(() => store.state.inventory.inventar);
        const isOpen = ref(false);
        const showTemplejtSelect = ref(false);
        const templejtValues = computed(() => store.state.inventory.templejtValues);



        const archivedInventar = computed(() => store.getters['inventory/archivedInventar']);
        const unarchivedInentar = computed(() => store.getters['inventory/unarchivedNotes']);
        const displayArchivedInventar = ref(false);

        const selectedTemplate = ref<Template | null>(null);


        interface Template {
            deklaracija: string;
            kreator: string;
            text_1_label: string;
            templejt: string[];
        }

        const displayInventar = computed(() => {
            const inventarToDisplay = displayArchivedInventar.value ? archivedInventar.value : unarchivedInentar.value;
            return inventarToDisplay;
        });

        onMounted(async () => {
            await store.dispatch('inventory/fetchInventar');
            console.log('Ovdje gledaj', inventarItems.value);

        });

        const selectTemplate = (template: Template) => {
            selectedTemplate.value = template;
            setOpen(true); // This opens the modal after template selection
        };

        const openEmptyModal = () => {
            selectedTemplate.value = null;
            setOpen(true);
        };



        const setOpen = (state: boolean) => {
            isOpen.value = state;
        };

        const viewCard = (cardName: string) => {
            // Print the card name to the console for now
            console.log(`Card clicked: ${cardName}`);
        };

        const submitInventar = async (inventar: Partial<Inventar>) => {

            console.log('Ovo je inventar', inventar);
            try {
                await store.dispatch('inventory/createInventar', inventar);
                console.log('Inventar created', inventar);
                await store.dispatch('inventory/fetchInventar'); // reload inventar after creation
            } catch (error) {
                console.error('Error creating Inventar', error);
            }
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
            add, documentOutline,
            isOpen,
            setOpen,
            showTemplejtSelect,
            submitInventar,
            archiveOutline,
            documentAttachOutline,
            showArchivedInventar,
            showUnarchivedInventar,
            archivedInventar,
            unarchivedInentar,
            displayInventar,
            templejtValues,
            selectedTemplate,
            selectTemplate,
            openEmptyModal,
        };
    },
};

</script>

<style scoped></style>
