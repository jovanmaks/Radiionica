<template>
  <base-layout page-title="Унос" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Материјал</ion-label>
            <ion-select v-model="materijal">
              <ion-select-option value="polistirol">Полистирол</ion-select-option>
              <ion-select-option value="poliuretan">Полиуретан</ion-select-option>
              <ion-select-option value="drvo">Дрво</ion-select-option>
              <ion-select-option value="medijapan">Медијапан</ion-select-option>
              <ion-select-option value="iverica">Иверица</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>Облик</ion-label>
            <ion-select v-model="oblik">
              <ion-select-option value="plocasti">Плочасти</ion-select-option>
              <ion-select-option value="kubicni">Кубични</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Ширина</ion-label>
            <ion-input v-model="sirina" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Дужина</ion-label>
            <ion-input v-model="duzina" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Дебљина</ion-label>
            <ion-input v-model="debljina" type="number"></ion-input>
          </ion-item>
        </ion-list>

          <ion-item>
            <ion-label position="floating">Биљешка</ion-label>
            <ion-input v-model="biljeska" type="string"></ion-input>
          </ion-item>

        <ion-row class="button-row">
          <ion-col size="3">
            <ion-button expand="full" size="small" @click="generateQRCode" color="dark">
              <ion-icon :icon="qrCode"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" size="small" @click="submitForm" color="dark">
              <ion-icon :icon="cloudUpload"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button expand="full" size="small" @click="shareQRCode" color="dark">
              <ion-icon :icon="share"></ion-icon>
            </ion-button>
          </ion-col>

          <ion-col size="3">
            <router-link to="/magacinStanje">
              <ion-button expand="full" size="small" @click="finished" color="dark">
                <ion-icon :icon="checkmarkDone"></ion-icon>
              </ion-button>
            </router-link>
          </ion-col>
        </ion-row>

        <div v-if="qrCodeDataUrl" class="qr-code-container">
          <img :src="qrCodeDataUrl" alt="QR Code" />
        </div>

        <!-- Show printing status -->
        <div v-if="isPrinting" class="printing-status">
          Printing...
        </div>

      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonCol,
  IonRow,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
// import { Plugins } from '@capacitor/core';
// const { Share } = Plugins;
import { supabase } from '@/supabase';
import QRCode from 'qrcode';
import { FileSharer } from 'capacitor-plugin-filesharer';
import { print, qrCode, checkmarkDone, cloudUpload, share } from "ionicons/icons";

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
    IonCol,
    IonRow,
  },
  setup() {
    const materijal = ref('');
    const oblik = ref('');
    const sirina = ref(null);
    const duzina = ref(null);
    const debljina = ref(null);
    const biljeska = ref(null);
    const qrCodeDataUrl = ref('');
    const data = ref([]);

    const isPrinting = ref(false);

    const generateQRCode = async () => {
      try {
        const dataObject = {
          materijal: materijal.value,
          oblik: oblik.value,
          sirina: sirina.value,
          duzina: duzina.value,
          debljina: debljina.value,
          biljeska: biljeska.value,
      };

      const dataString = 
        "Materijal: " + materijal.value + "\n" +
        "Oblik: " + oblik.value + "\n" +
        "Sirina: " + sirina.value + "\n" +
        "Duzina: " + duzina.value + "\n" +
        "Debljina: " + debljina.value + "\n" +
        "Biljeska: " + biljeska.value;

    // const dataString = JSON.stringify(dataObject);
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, dataString);
    const dataUrl = canvas.toDataURL('image/jpeg');
    qrCodeDataUrl.value = dataUrl;
    } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

const shareQRCode = async () => {
  try {
    const response = await fetch(qrCodeDataUrl.value);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async function() {
      const base64data = reader.result;
      await FileSharer.share({
        filename: 'qrcode.png',
        base64Data: base64data.split(',')[1], // remove the data url prefix
        contentType: 'image/png',
      });
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Error sharing QR code:', error);
  }
};



  const loadData = async () => {
      try {
        const { data: fetchedData, error } = await supabase
          .from('Magacin')
          .select('*');

        if (error) {
          throw error;
        }

        data.value = fetchedData;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    const finished = () => {
      loadData();
    };

    const submitForm = async () => {
      try {
        const { error } = await supabase
          .from('Magacin')
          .insert([
            {
              materijal: materijal.value,
              oblik: oblik.value,
              sirina: sirina.value,
              duzina: duzina.value,
              debljina: debljina.value,
              biljeska: biljeska.value,
              qr_code: qrCodeDataUrl.value,
            },
          ]);

        if (error) {
          throw error;
        }

        materijal.value = '';
        oblik.value = '';
        sirina.value = null;
        duzina.value = null;
        debljina.value = null;
        biljeska.value = null;
        qrCodeDataUrl.value = '';
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };


    onMounted(() => {
      loadData();
    });

    return {
      materijal,
      oblik,
      sirina,
      duzina,
      debljina,
      biljeska,
      generateQRCode,
      qrCodeDataUrl,
      submitForm,
      shareQRCode,
      finished,
      print,
      qrCode,
      checkmarkDone,
      cloudUpload,
      share,
      isPrinting,
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

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.printing-status {
  margin-top: 1rem;
  text-align: center;
} 
</style>


  

