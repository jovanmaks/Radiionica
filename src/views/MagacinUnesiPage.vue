<template>
  <base-layout page-title="Unos" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Materijal</ion-label>
            <ion-select v-model="materijal">
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

        <router-link to="/magacinStanje">
          <ion-button expand="block" @click="finished">Finished</ion-button>
        </router-link>

        <div v-if="qrCodeDataUrl" class="qr-code-container">
          <img :src="qrCodeDataUrl" alt="QR Code" />
        </div>

      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import QRCode from 'qrcode';

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
    const qrCodeDataUrl = ref('');
    const data = ref([]);

    const generateQRCode = async () => {
      try {
        const dataObject = {
          materijal: materijal.value,
          oblik: oblik.value,
          sirina: sirina.value,
          duzina: duzina.value,
          debljina: debljina.value,
        };
        const dataString = JSON.stringify(dataObject);
        qrCodeDataUrl.value = await QRCode.toDataURL(dataString);
      } catch (error) {
        console.error('Error generating QR code:', error);
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
      generateQRCode,
      qrCodeDataUrl,
      submitForm,
      finished,
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

  

