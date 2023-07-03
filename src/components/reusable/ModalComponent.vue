<template>
  <ion-modal :is-open="isOpen" css-class="my-custom-class">
    <ion-header>
      <ion-toolbar>

        <ion-buttons slot="start">
          <ion-button @click="setOpen(false)">
            <ion-icon :icon="closeIcon" />
          </ion-button>
          <!-- <ion-title>{{ modalTitle }}</ion-title> -->
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="confirm">
            <ion-icon :icon="checkmarkIcon" />
          </ion-button>
          <!-- <ion-title>{{ modalTitle }}</ion-title> -->
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <DeklaracijaComponent />
      <slot></slot>
      <!-- <ion-button @click="confirm" expand="full">
        <ion-icon slot="start" :icon="checkmarkIcon" />
        Save
      </ion-button> -->
    </ion-content>
  </ion-modal>
</template>
  
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { close, checkmark } from 'ionicons/icons';
import DeklaracijaComponent from '@/components/reusable/DeklaracijaComponent.vue';


export default defineComponent({
  name: "ModalComponent",
  components: {
    DeklaracijaComponent
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    modalTitle: {
      type: String,
      default: "Modal Title"
    }
  },
  emits: ['update:isOpen', 'confirm'],
  setup(props, { emit }) {
    const closeIcon = ref(close); // renamed ref
    const checkmarkIcon = ref(checkmark); // renamed ref

    const setOpen = (state: boolean) => {
      emit('update:isOpen', state);
    };

    const confirm = () => {
      emit('confirm');
    };

    return {
      closeIcon,
      checkmarkIcon,
      setOpen,
      confirm
    };
  }
});
</script>
  