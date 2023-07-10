
<template>
    <base-layout page-title="" page-default-back-link="/admin">
        <template v-slot:content>

            <TaskMenu ref="sideMenu-task" />
            <ProjectMenu ref="sideMenu-project" />
            <InventarMenu ref="sideMenu-inventar" />
            <UsersMenu ref="sideMenu-users" />
            <!-- <TemplejtMenu ref="sideMenu-templejt" /> -->




            <ion-page id="main-content">
                <ion-content class="ion-padding">
                    <div class="button-container">

                        <ion-button size="large" fill="clear">
                            <ion-icon :icon="bookmarksOutline"></ion-icon>
                        </ion-button>
                        
                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-users')" size="large" fill="clear">
                                <ion-icon :icon="peopleOutline"></ion-icon>
                            </ion-button>
                        </ion-menu-toggle>
                        <!-- <ion-button size="large" fill="clear">
                            <ion-icon :icon="peopleOutline"></ion-icon>
                        </ion-button> -->

                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-task')" size="large" fill="clear">
                                <ion-icon :icon="documentAttachOutline"></ion-icon>
                                <ion-badge>{{ noteCount }}</ion-badge>
                            </ion-button>
                        </ion-menu-toggle>

                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-project')" size="large" fill="clear">
                                <ion-icon :icon="libraryOutline"></ion-icon>
                            </ion-button>
                        </ion-menu-toggle>

                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-inventar')" size="large" fill="clear">
                                <ion-icon :icon="layersOutline"></ion-icon>
                                <ion-badge>{{ inventariCount }}</ion-badge>
                            </ion-button>
                        </ion-menu-toggle>

                        <ion-button size="large" fill="clear">
                            <ion-icon :icon="hammerOutline"></ion-icon>
                        </ion-button>

                        <ion-button size="large" fill="clear">
                            <ion-icon :icon="cartOutline"></ion-icon>
                        </ion-button>

                        <ion-menu-toggle>
                            <ion-button size="large" fill="clear">
                                <ion-icon :icon="addOutline"></ion-icon>
                            </ion-button>
                        </ion-menu-toggle>


                    </div>
                </ion-content>
            </ion-page>
        </template>
    </base-layout>
</template>

<script lang="ts">
import { Ref, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskMenu from '@/components/menys/TasksMenuComponent.vue';
import InventarMenu from '@/components/menys/InventarMenuComponent.vue';
import ProjectMenu from '@/components/menys/ProjectMenuComponent.vue';
import UsersMenu from '@/components/menys/UsersMenuComponent.vue';
// import TemplejtMenu from '@/components/menys/TemplejtMenuComponent.vue';


import { addOutline, documentAttachOutline, layersOutline, libraryOutline, peopleOutline, hammerOutline, searchOutline, cartOutline, bookmarksOutline } from 'ionicons/icons';
import { IonMenu } from '@ionic/vue';
import { menuController } from '@ionic/vue';


import {
    IonButton, IonContent, IonMenuToggle, IonPage, IonIcon, IonBadge
} from '@ionic/vue';
export default {
    components: {
    TaskMenu,
    InventarMenu,
    ProjectMenu,
    UsersMenu,
    // TemplejtMenu,
    IonPage,
    IonContent,
    IonMenuToggle,
    IonButton,
    IonIcon,
    IonBadge // Add IonBadge to the components
},
    setup() {
        const store = useStore();


        const noteCount = computed(() => store.getters['notes/notesCount']);
        const inventariCount = computed(() => store.getters['inventory/inventoryCount']);

        const openMenu = async (menuId: string) => {
            await menuController.enable(true, menuId);
            await menuController.open(menuId);
        };

        return {
            addOutline,
            documentAttachOutline,
            layersOutline,
            libraryOutline,
            peopleOutline,
            hammerOutline,
            bookmarksOutline,
            cartOutline,
            openMenu,
            noteCount,
            inventariCount,
        }
    }
}
</script>

<style  scoped>
.button-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    align-items: flex-end;
    justify-items: flex-end;
}


/* .button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
} */
</style>