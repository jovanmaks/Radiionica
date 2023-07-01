<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
        <ion-content>
            <InventarCardComponent v-for="card in inventarItems" :key="card.id" :card="card" @view-card="viewCard" />


        </ion-content>
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
                                        <ion-fab-button @click="setOpen(true)">
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
    </ion-menu>
    <TemplejtSelect :show="showTemplejtSelect" @didDismiss="showTemplejtSelect = false" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useStore } from 'vuex';
import { close, checkmark, add, documentOutline } from 'ionicons/icons';
import { watch, computed } from 'vue';
import TemplejtSelect from '@/components/reusable/TemplejtSelect.vue';
import InventarCardComponent from '@/components/reusable/InventarCardComponent.vue';


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
} from '@ionic/vue';

export default {
    name: 'ParentComponent',
    components: {
        InventarCardComponent,
        TemplejtSelect,
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
    },

    setup() {

        const store = useStore();
        const inventarItems = computed(() => store.state.inventory.inventar);
        const isOpen = ref(false);
        const showTemplejtSelect = ref(false);  

        onMounted(async () => {
            await store.dispatch('inventory/fetchInventar');
            console.log('Inventar fetched', inventarItems.value);
        });


        const setOpen = (state: boolean) => {
            isOpen.value = state;
        };

        const viewCard = (cardName: string) => {
            // Print the card name to the console for now
            console.log(`Card clicked: ${cardName}`);
        };


        return {
            inventarItems,
            viewCard,
            add, documentOutline,
            isOpen,
            setOpen,
            showTemplejtSelect,
        };
    },
};

</script>

<style scoped></style>
