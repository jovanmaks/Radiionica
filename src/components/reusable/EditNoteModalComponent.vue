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
import { defineComponent, ref, computed, watch } from 'vue';
import { IonModal, IonItem, IonInput, IonHeader, IonToolbar, IonContent, IonButton, IonButtons } from "@ionic/vue";
import { checkmark, close } from "ionicons/icons";
import { useStore } from "vuex";
import { supabase } from "@/supabase";

export default defineComponent({
    name: "EditNoteModalComponent",
    props: {
        isOpen: {
            type: Boolean,
            required: true,
            default: false,
        },
        note: {
            type: Object,
            required: false,
            default: () => ({ id: null, homescreen: "" }),
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
        const newNote = ref(props.note ? props.note.homescreen : "");

        const setOpen = (state: any) => {
            emit('update:isOpen', state);
        }

        const updateNote = () => {
            if (newNote.value.trim() === "" || !props.note) {
                console.log("Note value is empty, user is not logged in or note is not selected. Skipping update.");
                return;
            }

            const note = {
                id: props.note.id,
                ...props.note,
                homescreen: newNote.value,
                user_id: user.value.id,
                kreator: username.value,
            };
            

            store.dispatch('notes/updateNote', note);
        };


        watch(() => props.note, (newVal) => {
            newNote.value = newVal ? newVal.homescreen : "";
        }, { immediate: true });


        watch(() => props.note, (newVal, oldVal) => {
            console.log('old note: ', oldVal);
            console.log('new note: ', newVal);
        }, { immediate: true });
        
        const confirmChanges = async () => {
            updateNote();
            newNote.value = "";
            setOpen(false);
        };

        return {
            checkmark,
            close,
            setOpen,
            confirmChanges,
            newNote,
            user,
            updateNote,
        };
    }
});
</script>
