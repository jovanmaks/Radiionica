<template>
  <ion-modal :is-open="isOpen" css-class="my-custom-class">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="setOpen(false)">
            <ion-icon :icon="closeIcon" />
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="confirm">
            <ion-icon :icon="checkmarkIcon" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input type="text" v-model="inputText1" @input="onInputChange1" placeholder="Enter text here">
      </ion-input>
      <ion-input type="text" v-model="inputText2" @input="onInputChange2" placeholder="Enter text here">
      </ion-input>
      <ion-input type="text" v-model="inputText3" @input="onInputChange3" placeholder="Enter text here">
      </ion-input>
      <ion-input type="text" v-model="inputText4" @input="onInputChange4" placeholder="Enter text here">
      </ion-input>  
      <slot></slot>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { close, checkmark } from 'ionicons/icons';

export default defineComponent({
  name: "ModalComponent",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    modalTitle: {
      type: String,
      default: "Modal Title"
    },
    id: {
      type: String,
      default: ""
    }
  },
  emits: ['update:isOpen', 'confirm', 'update-deklaracija', 'submit'],

  setup(props, { emit }) {
    const closeIcon = ref(close);
    const checkmarkIcon = ref(checkmark);
    const inputText1 = ref("");
    const inputText2 = ref("");
    const inputText3 = ref("");
    const inputText4 = ref("");


    const setOpen = (state: boolean) => {
      emit('update:isOpen', state);
    };

    const confirm = () => {
      emit('submit', {
        deklaracija: inputText1.value,
        kreator: inputText2.value,
        text_1_label: inputText3.value,
        templejt: [inputText1.value, inputText2.value, inputText3.value, inputText4.value] 
      });
    };


    const onInputChange1 = (event: Event) => {
      inputText1.value = (event.target as HTMLInputElement).value;
    };

    const onInputChange2 = (event: Event) => {
      inputText2.value = (event.target as HTMLInputElement).value;
    };

    const onInputChange3 = (event: Event) => {
      inputText3.value = (event.target as HTMLInputElement).value;
    };

    const onInputChange4 = (event: Event) => { // New input change handler for the fourth input
      inputText4.value = (event.target as HTMLInputElement).value;
    };


    return {
      closeIcon,
      checkmarkIcon,
      setOpen,
      confirm,
      inputText1,
      onInputChange1,
      inputText2,
      onInputChange2,
      inputText3,
      onInputChange3,
      inputText4,
      onInputChange4
    };
  }
});
</script>

  