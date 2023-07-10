<template>
    <ion-menu side="start" menu-id="sideMenu-users" content-id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Start Menu</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>Users</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Tasks</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Settings</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-title>Footer</ion-title>
            </ion-toolbar>
        </ion-footer>

    </ion-menu>
</template>





<script lang="ts">  
    import { useStore } from 'vuex';
    import { defineComponent } from 'vue';
    import { ref, onMounted, computed } from 'vue';
    import { 
        IonMenu,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonFooter,


     } from '@ionic/vue';

    export default defineComponent({
        components: {
            IonMenu,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
            IonFooter,
        },
            setup(){


            return {
            }
        }

    });
</script>