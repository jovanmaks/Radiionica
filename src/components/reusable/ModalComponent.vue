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
      <ion-input :value="deklaracija" @input="onInputChange1" @ionChange="deklaracija = $event.target.value"
        placeholder="Naziv"></ion-input>

      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-input :value="text_1_label" @input="onInputChange2" @ionChange="text_1_label = $event.target.value"
                placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :value="text_2_label" @input="onInputChange3" @ionChange="text_2_label = $event.target.value"
                placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :value="num_1_label" @input="onInputChange4" @ionChange="num_1_label = $event.target.value"
                placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :value="num_2_label" @input="onInputChange5" @ionChange="num_2_label = $event.target.value"
                placeholder="Ime"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input v-model.number="kolicina" @input="onInputChange6" type="number"
                placeholder="Kolicina"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input :value="switch_1_label" @input="onInputChange7" @ionChange="switch_1_label = $event.target.value"
                placeholder="Overa"></ion-input>
              <ion-toggle :enable-on-off-labels="true" v-model="switch_1"></ion-toggle>
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
              <ion-toggle :enable-on-off-labels="true" v-model="kolicina_isNotified"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-input :value="switch_2_label" @input="onInputChange13"
                @ionChange="switch_2_label = $event.target.value" placeholder="Overa"></ion-input>
              <ion-toggle :enable-on-off-labels="true" v-model="switch_2"></ion-toggle>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>


      <ion-item>
        <ion-input v-model.number="cena" @input="onInputChange15" placeholder="Cena"></ion-input>
        <!-- <ion-input v-model.number="cena" type="number" placeholder="Cena"></ion-input> -->
      </ion-item>
      <ion-item>
        <ion-datetime v-model="datetimeInput" placeholder="Select Date"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-toggle :enable-on-off-labels="true" v-model="datetime_isNotified">Notifikacija</ion-toggle>
        <!-- <ion-toggle :enable-on-off-labels="true" v-model="switch_2"></ion-toggle> -->
      </ion-item>


      <ion-item>
        <ion-input v-model="templejt_ime" @input="onInputChange14" placeholder="Templejt"></ion-input>
      </ion-item>


    </ion-content>
    <slot></slot>
  </ion-modal>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref, defineComponent, watch, computed } from 'vue';
import { close, checkmark } from 'ionicons/icons';
import {
  IonButton,
  IonContent,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonIcon,
  IonItem,
  IonInput,
  IonToggle,
  IonDatetime,

} from '@ionic/vue';

export default defineComponent({
  name: "ModalComponent",
  components: {
    IonContent,
    IonButton,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonIcon,
    IonItem,
    IonInput,
    IonToggle,
    IonDatetime,
  },
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
      type: Object as () => Record<string, any> | null,
      default: null
    },
  },
  emits: ['update:isOpen', 'confirm', 'update-deklaracija', 'submit'],

  setup(props, { emit }) {

    const closeIcon = ref(close);
    const checkmarkIcon = ref(checkmark);




    // const selectedTemplate = props.selectedTemplate || {};
    const deklaracija = ref(props.selectedTemplate?.deklaracija || "");
    const text_1_label = ref(props.selectedTemplate?.text_1_label || "");
    const text_2_label = ref(props.selectedTemplate?.text_2_label || "");
    const num_1_label = ref(props.selectedTemplate?.num_1_label || "");
    const num_2_label = ref(props.selectedTemplate?.num_2_label || "");
    const switch_1_label = ref(props.selectedTemplate?.switch_1_label || "");
    const switch_2_label = ref(props.selectedTemplate?.switch_2_label || "");
    const templejt_ime = ref(props.selectedTemplate?.templejt_ime || "");

    const kolicina = ref(props.selectedTemplate?.kolicina || 0);
    const text_1 = ref(props.selectedTemplate?.text_1 || "");
    const text_2 = ref(props.selectedTemplate?.text_2 || "");
    const num_1 = ref(props.selectedTemplate?.num_1 || 0);
    const num_2 = ref(props.selectedTemplate?.num_2 || 0);
    const kolicina_notifikacija = ref(props.selectedTemplate?.kolicina_notifikacija || 0);
    const cena = ref(props.selectedTemplate?.cena || 0);
    const switch_1 = ref(props.selectedTemplate?.switch_1 || false);
    const switch_2 = ref(props.selectedTemplate?.switch_2 || false);
    const datetime_isNotified = ref(props.selectedTemplate?.datetime_isNotified || false);
    const kolicina_isNotified = ref(props.selectedTemplate?.kolicina_isNotified || false);
    const datetimeInput = ref(props.selectedTemplate?.datetimeInput || null)

    // const text_1 = ref("");
    // const text_2 = ref("");
    // const kolicina = ref(0);
    // const num_1 = ref(0);
    // const num_2 = ref(0);
    // const kolicina_notifikacija = ref(0);
    // const cena = ref(0);
    // const switch_1 = ref(false);
    // const switch_2 = ref(false);
    // const datetime_isNotified = ref(false);
    // const kolicina_isNotified = ref(false);
    // const datetimeInput = ref(null);
    



    const store = useStore();
    const qrCodeDataUrl = ref(props.selectedTemplate?.qrCodeDataUrl || null)
    const username = computed(() => store.state.user.username);



    const setOpen = (state: boolean) => {
      if (!state) {
        resetForm();
      }
      emit('update:isOpen', state);

    };

    const resetForm = () => {
      // deklaracija.value = '';
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
      cena.value = 0;
      kolicina_notifikacija.value = 0;
      switch_2_label.value = '';
      templejt_ime.value = '';
      switch_1.value = false;    // added .value
      switch_2.value = false;
      datetimeInput.value = null;
      qrCodeDataUrl.value = null;
      datetime_isNotified.value = false;
      kolicina_isNotified.value = false;
    };


    const confirm = async () => {

      if (!templejt_ime.value.trim()) {
        templejt_ime.value = props.id;
      }
      let datetime = null;
      if (datetimeInput.value !== null) {
        datetime = datetimeInput.value; // directly assign the value
      }
      const inventarData = {
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
        cena: cena.value,
        kolicina_notifikacija: kolicina_notifikacija.value,
        switch_2_label: switch_2_label.value,
        templejt_ime: templejt_ime.value,
        switch_1: switch_1.value,
        switch_2: switch_2.value,
        datetime: datetimeInput.value,
        kreator: username.value,
        datetime_isNotified: datetime_isNotified.value,
        kolicina_isNotified: kolicina_isNotified.value,
        templejt: [text_1_label.value, text_2_label.value, num_1_label.value, num_2_label.value]
      };

      qrCodeDataUrl.value = await store.dispatch('inventory/generateQRCode', inventarData);

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
        cena: cena.value,
        kolicina_notifikacija: kolicina_notifikacija.value,
        switch_2_label: switch_2_label.value,
        templejt_ime: templejt_ime.value,
        switch_1: switch_1.value,
        switch_2: switch_2.value,
        datetime: datetimeInput.value,
        qr_code: qrCodeDataUrl.value,
        datetime_isNotified: datetime_isNotified.value,
        kolicina_isNotified: kolicina_isNotified.value,
        kreator: username.value,


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
      cena.value = '';
      kolicina_notifikacija.value = '';
      switch_2_label.value = '';
      templejt_ime.value = '';
      switch_1.value = false;
      switch_2.value = false;
      datetimeInput.value = null;
      qrCodeDataUrl.value = null;
      datetime_isNotified.value = false;
      kolicina_isNotified.value = false;

      console.log('switcheviiiii', switch_1.value, switch_2.value, kolicina_isNotified.value);

    };

    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        // resetForm();
      }
    });

    watch(switch_1, (newVal) => {
      console.log(`switch_1 changed to ${newVal}`);
    });

    watch(switch_2, (newVal) => {
      console.log(`switch_2 changed to ${newVal}`);
    });

    watch(kolicina_isNotified, (newVal) => {
      console.log(`kolicina_isNotified changed to ${newVal}`);
    });



    watch(() => props.selectedTemplate, (newVal) => {
      console.log("testtttttt", newVal);
      console.log("testtttttt", props.id);
      if (newVal) {

        deklaracija.value = newVal.deklaracija || "";
        text_1_label.value = newVal.text_1_label || "";
        text_2_label.value = newVal.text_2_label || "";
        num_1_label.value = newVal.num_1_label || "";
        num_2_label.value = newVal.num_2_label || "";
        kolicina.value = newVal.kolicina || 0;
        switch_1_label.value = newVal.switch_1_label || "";
        text_1.value = newVal.text_1 || "";
        text_2.value = newVal.text_2 || "";
        num_1.value = newVal.num_1 || 0;
        num_2.value = newVal.num_2 || 0;
        cena.value = newVal.cena || 0;
        kolicina_notifikacija.value = newVal.kolicina_notifikacija || 0;
        switch_2_label.value = newVal.switch_2_label || "";
        templejt_ime.value = newVal.templejt_ime || "";
        switch_1.value = newVal.switch_1 || false;
        switch_2.value = newVal.switch_2 || false;
        datetimeInput.value = newVal.datetime || null;
        qrCodeDataUrl.value = newVal.qr_code || null;
        datetime_isNotified.value = newVal.datetime_isNotified || false;
        kolicina_isNotified.value = newVal.kolicina_isNotified || false;
      }
    }, { deep: true, immediate: true });




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
      kolicina.value = ((event.target as HTMLInputElement).value);
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
      num_1.value = ((event.target as HTMLInputElement).value);
    };
    const onInputChange11 = (event: Event) => { // New input change handler for the fourth input
      num_2.value = ((event.target as HTMLInputElement).value);
    };
    const onInputChange12 = (event: Event) => { // New input change handler for the fourth input
      kolicina_notifikacija.value = ((event.target as HTMLInputElement).value);
    };
    const onInputChange13 = (event: Event) => { // New input change handler for the fourth input
      switch_2_label.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange14 = (event: Event) => { // New input change handler for the fourth input
      templejt_ime.value = (event.target as HTMLInputElement).value;
    };
    const onInputChange15 = (event: Event) => { // New input change handler for the fourth input
      cena.value = ((event.target as HTMLInputElement).value);
    };


    return {
      // selectedTemplate,
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
      switch_1,
      switch_2,
      datetimeInput,
      datetime_isNotified,
      kolicina_isNotified,
      onInputChange15,
      cena,
      qrCodeDataUrl,
    };
  }
});
</script>

  