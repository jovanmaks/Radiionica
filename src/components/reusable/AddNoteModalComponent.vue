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
        <!-- <Modal :data="data"></Modal> -->
        <ion-content class="ion-padding">
            <div class="input-button-container">
                <ion-item style="flex-grow: 1">
                    <ion-input v-model="newNote" placeholder="Унеси биљешку"></ion-input>
                </ion-item>
            </div>
        </ion-content>
    </ion-modal>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { IonModal, IonItem, IonInput, IonHeader, IonToolbar, IonContent, IonButton, IonButtons } from "@ionic/vue";
import { checkmark, close } from "ionicons/icons";
import { useStore } from "vuex";
import { supabase } from "@/supabase";

export default defineComponent({
    name: "AddNoteModalComponent",
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
        IonInput,

    },
    setup(props, { emit }) {
        const store = useStore();
        const username = computed(() => store.state.user.username);
        const user = computed(() => store.state.user.user);
        const newNote = ref("");  // new

        const setOpen = (state: any) => {
            emit('update:isOpen', state);
        }

        const addNote = () => {
            if (newNote.value.trim() === "" || !user.value) {  // updated
                console.log("Note value is empty or user is not logged in. Skipping insertion.");
                return;
            }

            const note = {
                homescreen: newNote.value,  
                user_id: user.value.id,     
                kreator: username.value,
                isHomescreenArchived: false,
                levelOne: false,
                levelTwo: false,
                levelThree: false,
            };

            store.dispatch('notes/addNote', note);
        };

        const confirmChanges = async () => {
            addNote();
            newNote.value = "";  // This will clear the input
            setOpen(false);
        };

        return {
            checkmark,
            close,
            setOpen,
            confirmChanges,
            newNote,  
            user,    
            addNote, 
        };
    }
});


</script>
  