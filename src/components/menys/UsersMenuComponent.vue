<template>
    <ion-menu side="start" menu-id="sideMenu-users" content-id="main-content">

        <ion-content>
            <ion-list>
                <ion-item v-for="teamId in selectedTeams" :key="teamId">
                    <ion-label v-for="user in getUsersByTeamId(teamId)" :key="user.id">{{ user.username }}</ion-label>
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

                            <ion-button @click="forceUpdateSelectedTeams" size="small" expand="full">
                                Force update
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

        const userProfiles = computed(() => store.state.user.userProfiles);
        const selectedTeams = computed(() => store.state.user.selectedTeams);


        const getUserById = (userId: string) => {
            console.log('userProfiles', userProfiles.value);
            return userProfiles.value.find((user: any) => user.id === userId);
        };

        const getUsersByTeamId = (teamIds: string[]) => {
            console.log('userProfiles team', userProfiles.value);
            // Filter users whose ID is in the specified teamIds
            return userProfiles.value.filter((user: any) => teamIds.includes(user.id));
        };

        onMounted(async () => {
            if (!store.state.user.userProfiles) {
                await store.dispatch('user/fetchUserProfiles');
            }
            console.log('userProfiles mounted', userProfiles.value);

            // Filter for the current user's profile
            const currentUserProfile = userProfiles.value.find((userProfile: any) => userProfile.id === user.value.id);

            // Extract team IDs from the current user's profile and add to selectedTeams
            if (currentUserProfile?.team && Array.isArray(currentUserProfile.team)) {
                for (const teamId of currentUserProfile.team) {
                    store.commit('user/addSelectedTeam', teamId);
                }
            }

            console.log('Ovdje gledaj selectedTeams', selectedTeams.value);
        });


        const openAddUserModal = () => {
            isOpen.value = true;
        }

        const forceUpdateSelectedTeams = () => {
            // Here you would call the Vuex action to update selectedTeams
            store.dispatch('user/forceUpdateSelectedTeams');
        };

        return {
            userProfiles,
            peopleOutline,
            add,
            openAddUserModal,
            isOpen,
            getUserById,
            selectedTeams,
            getUsersByTeamId,
            forceUpdateSelectedTeams,
        };
    }
});
</script>