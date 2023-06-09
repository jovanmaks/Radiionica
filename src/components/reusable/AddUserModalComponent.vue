<template>
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
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item v-for="userProfile in userProfiles" :key="userProfile.id">
                    <ion-checkbox slot="start" v-model="isUserSelected(userProfile.id).value"
                        @ionChange="toggleUser(userProfile.id, $event.target.checked)"></ion-checkbox>
                    <ion-label>{{ userProfile.username }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { IonModal, IonItem, IonLabel, IonHeader, IonToolbar, IonContent, IonButton, IonButtons, IonCheckbox, IonList } from "@ionic/vue";
import { checkmark, close } from "ionicons/icons";
import { useStore } from "vuex";
import { supabase } from "@/supabase";

export default defineComponent({
    name: "AddUserModalComponent",
    props: {
        isOpen: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    emits: ['update:isOpen'],
    components: {
        IonModal,
        IonHeader,
        IonToolbar,
        IonContent,
        IonButton,
        IonButtons,
        IonItem,
        IonLabel,
        IonCheckbox,
        IonList,
    },
    setup(props, { emit }) {
        const store = useStore();
        const userProfiles = computed(() => store.state.user.userProfiles);
        const isUserSelected = (userId: string) => computed(() => {
            return store.state.user.selectedUsers.includes(userId);
        });


        watch(() => props.isOpen, async (newVal) => {
            if (newVal) {
                await store.dispatch('user/fetchUserProfiles');
            }
        });


        const toggleUser = (userId: string, checked: boolean) => {
            if (checked) {
                store.dispatch('user/addSelectedUser', userId);
                console.log('selectedUsers', store.state.user.selectedUsers);
            } else {
                store.dispatch('user/removeSelectedUser', userId);
            }
        };

        const setOpen = (state: any) => {
            emit('update:isOpen', state);
        }

        const confirmChanges = async () => {
            console.log('store.state.user:', store.state.user);
            console.log('store.state.user.selectedUsers:', store.state.user.selectedUsers);

            if (store.state.user && store.state.user.selectedUsers && store.state.user.selectedUsers.length > 0) {
                console.log('Updating user:', store.state.user.user.id);
                await store.dispatch('user/updateTeam', store.state.user.user.id);
            }
            setOpen(false);
        };


        return {
            checkmark,
            close,
            setOpen,
            userProfiles,
            confirmChanges,
            toggleUser,
            isUserSelected,
        };
    }
});
</script>



  