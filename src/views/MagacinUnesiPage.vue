
<template>
<base-layout page-title="Magacin" page-default-back-link="/tabs">
    <template v-slot:content>

        
        <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Materijal</ion-label>
          <ion-select v-model="materijal">
          <!-- <ion-select > -->
            <ion-select-option value="Polistirol">Polistirol</ion-select-option>
            <ion-select-option value="Poliuretan">Poliuretan</ion-select-option>
            <ion-select-option value="Drvo">Drvo</ion-select-option>
            <ion-select-option value="Medijapan">Medijapan</ion-select-option>
            <ion-select-option value="Iverica">Iverica</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>Oblik</ion-label>
          <ion-select v-model="oblik">
          <!-- <ion-select > -->
            <ion-select-option value="Plocasti">Plocasti</ion-select-option>
            <ion-select-option value="Kubicni">Kubicni</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Širina</ion-label>
          <ion-input v-model="sirina" type="number"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Dužina</ion-label>
          <ion-input v-model="duzina" type="number"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Debljina</ion-label>
          <ion-input v-model="debljina" type="number"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="submitForm">Submit</ion-button>
    </ion-content>
    </template>
  </base-layout>
  
  

</template>
  
  <script >
import {   IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { supabase } from '@/supabase'; // assuming you have a 'supabase.js' file in your project for Supabase configuration

export default {
  components: {
    // IonPage,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
  },
  setup() {
    const materijal = ref('');
    const oblik = ref('');
    const sirina = ref(null);
    const duzina = ref(null);
    const debljina = ref(null);

    const submitForm = async () => {
      try {
        const { error } = await supabase
          .from('Magacin') // replace 'your_table_name' with the actual table name in Supabase
          .insert([
            {
              materijal: materijal.value,
              oblik: oblik.value,
              sirina: sirina.value,
              duzina: duzina.value,
              debljina: debljina.value,
            },
          ]);

        if (error) {
          throw error;
        }

        // Clear form fields
        materijal.value = '';
        oblik.value = '';
        sirina.value = null;
        duzina.value = null;
        debljina.value = null;
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      materijal,
      oblik,
      sirina,
      duzina,
      debljina,
      submitForm,
    };
  },
};

  </script>
  

