<template>
    <ion-modal :is-open="isOpen" css-class="my-custom-class" @didDismiss="closeModal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="closeModal">
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
      <Modal :data="data"></Modal>
      <ion-content class="ion-padding">
        <div class="input-button-container">
          <ion-item style="flex-grow: 1">
            <ion-input v-model="localNewNote" placeholder="Унеси биљешку"></ion-input>
          </ion-item>
        </div>
      </ion-content>
    </ion-modal>
  </template>
  
  <script>
  import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonItem, IonInput } from "@ionic/vue";
  import { close, checkmark } from "ionicons/icons";
  import { defineComponent, ref, watch } from "vue";
  
  export default defineComponent({
    props: ['isOpen', 'data', 'newNote'],
    emits: ['update:isOpen', 'update:newNote'],
    components: {
      IonModal,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonButton,
      IonContent,
      IonItem,
      IonInput,
    },
    setup(props, { emit }) {
      const localNewNote = ref(props.newNote);
  
      watch(() => props.newNote, newValue => {
        localNewNote.value = newValue;
      });
  
      const closeModal = () => {
        emit('update:isOpen', false);
      };
  
      const confirmChanges = () => {
        emit('update:newNote', localNewNote.value);
        closeModal();
      };
  
      return {
        close,
        checkmark,
        localNewNote,
        closeModal,
        confirmChanges
      };
    }
  });
  </script>
  