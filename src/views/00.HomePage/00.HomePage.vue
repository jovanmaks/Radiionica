
<template>
    <base-layout page-title="" page-default-back-link="/admin">
        <template v-slot:content>
            <!-- <TaskMenu ref="sideMenu-task" /> -->
            <!-- <InventarMenu ref="sideMenu-inventar" /> -->

            <!-- <ProjectMenu ref="sideMenu-project"  /> -->
            <!-- <InventarMenu ref="sideMenu-inventar"  /> -->


            <ion-menu content-id="main-content" menu-id="sideMenu-project" side="start">
                <!-- ... -->
            </ion-menu>

            <ion-menu content-id="main-content" menu-id="sideMenu-inventar" side="start">
                <!-- ... -->
            </ion-menu>


            <div class="ion-page" id="main-content">

                <!-- <ion-page id="main-content"> -->
                <ion-content class="ion-padding">
                    <div class="button-container">


                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-project')">Click to open the project</ion-button>
                        </ion-menu-toggle>

                        <ion-menu-toggle>
                            <ion-button @click="() => openMenu('sideMenu-inventar')">Click to open the inv</ion-button>
                        </ion-menu-toggle>



                        <!-- <ion-button size="large" fill="clear">
                                <ion-icon :icon="layersOutline"></ion-icon>
                            </ion-button>

                            <ion-button size="large" fill="clear">
                                <ion-icon :icon="libraryOutline"></ion-icon>
                            </ion-button> -->
                    </div>
                </ion-content>
            </div>
            <!-- </ion-page> -->

        </template>
    </base-layout>
</template>

<script lang="ts">
import { Ref, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskMenu from '@/components/menys/TasksMenuComponent.vue';
import InventarMenu from '@/components/menys/InventarMenuComponent.vue';
import ProjectMenu from '@/components/menys/ProjectMenuComponent.vue';

import { documentAttachOutline, layersOutline, libraryOutline } from 'ionicons/icons';
import { IonMenu } from '@ionic/vue';
import { menuController } from '@ionic/vue';


import {
    IonButton, IonButtons, IonContent, IonHeader, IonMenuToggle, IonPage,
    IonTitle, IonToolbar, IonSegment, IonSegmentButton,
    IonIcon,
} from '@ionic/vue';
export default {
    components: {
        // TaskMenu,
        // InventarMenu,
        // ProjectMenu,
        // menuController,

        // IonPage,
        IonContent,
        IonMenuToggle,
        IonButton,
        // IonIcon,

        // IonButtons,
        // IonHeader,
        IonMenu,
        // IonTitle,
        // IonToolbar,
    },
    setup() {
        const openMenu = async (menuId: string) => {
  await menuController.enable(true, menuId);
  await menuController.open(menuId);
};

        return {


            // documentAttachOutline, layersOutline, libraryOutline
            documentAttachOutline,
            layersOutline,
            libraryOutline,
            openMenu,
        }
    }
}
</script>

<style  scoped>
/* .button-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    align-items: flex-end;
    justify-items: flex-end;
} */

/* .button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
} */
</style>