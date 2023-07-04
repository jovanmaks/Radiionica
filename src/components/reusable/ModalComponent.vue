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

    <ion-content class="input-button-container">
      <ion-item>
        <ion-input v-model="deklaracija" @input="onInputChange1" placeholder="Naziv"></ion-input>
      </ion-item>


      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-input v-model="text_1_label" @input="onInputChange2" placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="text_2_label" @input="onInputChange3" placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="num_1_label" @input="onInputChange4" placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="num_2_label" @input="onInputChange5" placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model.number="kolicina" @input="onInputChange6" type="number"
                placeholder="Kolicina"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="switch_1_label" @input="onInputChange7" placeholder="Overa"></ion-input>
              <!-- <ion-toggle :enable-on-off-labels="true" v-model="switch_1"></ion-toggle> -->
            </ion-item>


          </ion-col>
          <ion-col>
            <ion-item>
              <ion-input v-model="text_1" @input="onInputChange8" placeholder="Sadrzaj"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model="text_2" @input="onInputChange9" placeholder="Sadrzaj"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model.number="num_1" @input="onInputChange10" type="number" placeholder="Broj"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model.number="num_2" @input="onInputChange11" type="number" placeholder="Broj"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input v-model.number="kolicina_notifikacija" @input="onInputChange12" type="number"
                placeholder="Alarm na"></ion-input>
              <!-- <ion-toggle :enable-on-off-labels="true" v-model="kolicina_isNotified"></ion-toggle> -->
            </ion-item>

            <ion-item>
              <ion-input v-model="switch_2_label" @input="onInputChange13" placeholder="Overa"></ion-input>
              <!-- <ion-toggle :enable-on-off-labels="true" v-model="switch_2"></ion-toggle> -->
            </ion-item>
            <!-- 
          -->

          </ion-col>
        </ion-row>

      </ion-grid>

      <ion-item>
        <ion-input v-model="templejt_ime" @input="onInputChange14" placeholder="Templejt"></ion-input>
      </ion-item>


    </ion-content>
    <slot></slot>
  </ion-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
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
    },
    selectedTemplate: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:isOpen', 'confirm', 'update-deklaracija', 'submit'],

  setup(props, { emit }) {

    const closeIcon = ref(close);
    const checkmarkIcon = ref(checkmark);



    const deklaracija = ref(props.selectedTemplate[0] || "");
    const text_1_label = ref(props.selectedTemplate[1] || "");
    const text_2_label = ref(props.selectedTemplate[2] || "");
    const num_1_label = ref(props.selectedTemplate[3] || "");
    const num_2_label = ref(props.selectedTemplate[4] || "");
    const kolicina = ref(props.selectedTemplate[5] || 0);
    const switch_1_label = ref(props.selectedTemplate[6] || "");
    const text_1 = ref(props.selectedTemplate[7] || "");
    const text_2 = ref(props.selectedTemplate[8] || "");
    const num_1 = ref(props.selectedTemplate[9] || 0);
    const num_2 = ref(props.selectedTemplate[10] || 0);
    const kolicina_notifikacija = ref(props.selectedTemplate[11] || 0);
    const switch_2_label = ref(props.selectedTemplate[12] || "");
    const templejt_ime = ref(props.selectedTemplate[13] || "");



    const setOpen = (state: boolean) => {
      if (!state) {
        resetForm();
      }
      emit('update:isOpen', state);

    };

    const resetForm = () => {
      deklaracija.value = '';
      text_1_label.value = '';
      text_2_label.value = '';
      num_1_label.value = '';
      num_2_label.value = '';
      kolicina.value = 0;
      switch_1_label.value = '';
      text_1.value = '';
      text_2.value = '';
      num_1.value = 0;
      num_2.value = 0;
      kolicina_notifikacija.value = 0;
      switch_2_label.value = '';
      templejt_ime.value = '';
    };


    const confirm = () => {
      emit('submit', {

        deklaracija: deklaracija.value,
        text_1_label: text_1_label.value,
        text_2_label: text_2_label.value,
        num_1_label: num_1_label.value,
        num_2_label: num_2_label.value,
        kolicina: kolicina.value,
        switch_1_label: switch_1_label.value,
        text_1: text_1.value,
        text_2: text_2.value,
        num_1: num_1.value,
        num_2: num_2.value,
        kolicina_notifikacija: kolicina_notifikacija.value,
        switch_2_label: switch_2_label.value,
        templejt_ime: templejt_ime.value,

        templejt: [text_1_label.value, text_2_label.value, num_1_label.value, num_2_label.value]
      });
      deklaracija.value = '';
      text_1_label.value = '';
      text_2_label.value = '';
      num_1_label.value = '';
      num_2_label.value = '';
      kolicina.value = '';
      switch_1_label.value = '';
      text_1.value = '';
      text_2.value = '';
      num_1.value = '';
      num_2.value = '';
      kolicina_notifikacija.value = '';
      switch_2_label.value = '';
      templejt_ime.value = '';
    };

    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        resetForm();
      }
    });


    watch(() => props.selectedTemplate, (newVal) => {
      console.log('selectedTemplate changed:', newVal);
    }, { deep: true });


    const onInputChange1 = (event: Event) => {
      deklaracija.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange2 = (event: Event) => {
      text_1_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange3 = (event: Event) => {
      text_2_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange4 = (event: Event) => { // New input change handler for the fourth input
      num_1_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange5 = (event: Event) => { // New input change handler for the fourth input
      num_2_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange6 = (event: Event) => { // New input change handler for the fourth input
      kolicina.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange7 = (event: Event) => { // New input change handler for the fourth input
      switch_1_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange8 = (event: Event) => { // New input change handler for the fourth input
      text_1.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange9 = (event: Event) => { // New input change handler for the fourth input
      text_2.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange10 = (event: Event) => { // New input change handler for the fourth input
      num_1.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange11 = (event: Event) => { // New input change handler for the fourth input
      num_2.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange12 = (event: Event) => { // New input change handler for the fourth input
      kolicina_notifikacija.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange13 = (event: Event) => { // New input change handler for the fourth input
      switch_2_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange14 = (event: Event) => { // New input change handler for the fourth input
      templejt_ime.value = (event.target as HTMLInputElement).value;
    };


    return {
      closeIcon,
      checkmarkIcon,
      setOpen,
      confirm,
      deklaracija,
      onInputChange1,
      text_1_label,
      onInputChange2,
      text_2_label,
      onInputChange3,
      num_1_label,
      onInputChange4,
      num_2_label,
      onInputChange5,
      kolicina,
      onInputChange6,
      switch_1_label,
      onInputChange7,
      text_1,
      onInputChange8,
      text_2,
      onInputChange9,
      num_1,
      onInputChange10,
      num_2,
      onInputChange11,
      kolicina_notifikacija,
      onInputChange12,
      switch_2_label,
      onInputChange13,
      templejt_ime,
      onInputChange14,
    };
  }
});
</script>

  