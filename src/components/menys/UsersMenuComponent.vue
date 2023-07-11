<template>
    <ion-menu side="start" menu-id="sideMenu-users" content-id="main-content">

        <ion-content>
            <ion-list>
                <ion-item v-for="(member, index) in teamUsernames" :key="index">
                    {{ member }}
                </ion-item>
            </ion-list>

            <AddUserModalComponent v-model:isOpen="isOpen" />
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                        <ion-col style="display: flex; justify-content: center; align-items: center;">
                            <ion-button @click="openAddUserModal" size="small" expand="full">
                                <ion-icon :icon="add"></ion-icon>
                            </ion-button>

                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-footer>

    </ion-menu>
</template>


<script lang="ts">
import AddUserModalComponent from '@/components/reusable/AddUserModalComponent.vue';

import { useStore } from 'vuex';
import { defineComponent, watch } from 'vue';
import { ref, onMounted, computed } from 'vue';
import { peopleOutline, add } from 'ionicons/icons';
import {
    IonMenu,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonIcon
} from '@ionic/vue';

export default defineComponent({
    components: {
        AddUserModalComponent,

        IonMenu,
        IonToolbar,
        IonContent,
        IonList,
        IonFooter,
        IonIcon
    },
    setup() {

        const store = useStore();
        const isOpen = ref(false);
        const user = computed(() => store.state.user.user);
        const team = computed(() => store.state.user.team);
        const userProfiles = computed(() => store.state.user.userProfiles); // Add this line



        const teamUsernames = computed(() => {
            if (!team.value || !userProfiles.value) {
                return [];
            }

            return team.value.map((userId: string) => {
                const userProfile = userProfiles.value.find((profile: { id: string, username: string }) => profile.id === userId);
                return userProfile ? userProfile.username : userId;
            });
        });


        onMounted(async () => {
            console.log('teamUsernames', teamUsernames.value);
        });


        const openAddUserModal = () => {
            isOpen.value = true;
        }


        watch(team, (newValue, oldValue) => {
            console.log('Team updated:', newValue);
        }, { immediate: true });


        


        return {
            peopleOutline,
            add,
            openAddUserModal,
            isOpen,
            team,
            teamUsernames, // Add this line
        };
    }
});
</script>