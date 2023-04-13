
<template>
<base-layout page-title="Magacin" page-default-back-link="/tabs">
    <template v-slot:content>

        
        <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Materijal</ion-label>
          <ion-select v-model="materijal">
          <!-- <ion-select > -->
            <ion-select-option value="polistirol">Polistirol</ion-select-option>
            <ion-select-option value="poliuretan">Poliuretan</ion-select-option>
            <ion-select-option value="drvo">Drvo</ion-select-option>
            <ion-select-option value="medijapan">Medijapan</ion-select-option>
            <ion-select-option value="iverica">Iverica</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>Oblik</ion-label>
          <ion-select v-model="oblik">
          <!-- <ion-select > -->
            <ion-select-option value="plocasti">Plocasti</ion-select-option>
            <ion-select-option value="kubicni">Kubicni</ion-select-option>
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

      <ion-button expand="block" @click="generateQRCode" color="secondary">Generate QR Code</ion-button>
      <ion-button expand="block" @click="submitForm">Submit</ion-button>

      <div v-if="qrCodeDataUrl" class="qr-code-container">
          <img :src="qrCodeDataUrl" alt="QR Code" />
        </div>

    </ion-content>
    </template>
  </base-layout>
  
  

</template>
  
  <script >
import {   
    IonContent,
    IonList, 
    IonItem, 
    IonLabel, 
    IonSelect, 
    IonSelectOption, 
    IonInput, 
    IonButton 
} from '@ionic/vue';

import { ref } from 'vue';
import { supabase } from '@/supabase'; // assuming you have a 'supabase.js' file in your project for Supabase configuration
import QRCode from "qrcode"; // Import the 'qrcode' library

export default {
  components: {
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

    const qrCodeDataUrl = ref("");

    const generateQRCode = async () => {
      try {
        const data = {
          materijal: materijal.value,
          oblik: oblik.value,
          sirina: sirina.value,
          duzina: duzina.value,
          debljina: debljina.value,
        };
        const dataString = JSON.stringify(data);
        qrCodeDataUrl.value = await QRCode.toDataURL(dataString);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };


    const submitForm = async () => {
  try {
    const { error } = await supabase
      .from("Magacin")
      .insert([
        {
          materijal: materijal.value,
          oblik: oblik.value,
          sirina: sirina.value,
          duzina: duzina.value,
          debljina: debljina.value,
          qr_code: qrCodeDataUrl.value, // Add the QR code data URL if it exists
        },
      ]);

    if (error) {
      throw error;
    }

    // Clear form fields
    materijal.value = "";
    oblik.value = "";
    sirina.value = null;
    duzina.value = null;
    debljina.value = null;
    qrCodeDataUrl.value = ""; // Clear the QR code data URL
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};




    return {
      materijal,
      oblik,
      sirina,
      duzina,
      debljina,
      submitForm,
      generateQRCode,
      qrCodeDataUrl,
    };
  },
};

  </script>
  

  <style scoped>
.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
}
</style>
  

