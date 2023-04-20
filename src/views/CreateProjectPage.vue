<template>
<base-layout page-title="Napravi projekat" page-default-back-link="/tabs">
    <template v-slot:content>
        
        <ion-content>
        <ion-list>

          <ion-item>
            <ion-label>Ime projekta:</ion-label>
            <ion-input v-model="ime_projekta" type="text"></ion-input>
          </ion-item>

          <ion-item>

            <ion-label>Pocetak projekta:</ion-label>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime" v-model="pocetak_projekta"></ion-datetime>
            </ion-modal>

          </ion-item>

          <ion-item>
            <ion-label>Rok za predaju:</ion-label>
            <ion-datetime-button  datetime="datetime2"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime2" v-model="rok_predaja"></ion-datetime>
            </ion-modal>
          </ion-item>

          <ion-item>
            <ion-label>Investitor:</ion-label>
            <ion-input v-model="investitor" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Lokacija:</ion-label>
            <ion-input v-model="lokacija" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Cena:</ion-label>
            <ion-input v-model="cena" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Velicina</ion-label>
            <!-- <ion-input v-model="velicina" type="number"></ion-input> -->
            <ion-select v-model="velicina" >
              <ion-select-option value="mala">Mala</ion-select-option>
              <ion-select-option value="srednja">Srednja</ion-select-option>
              <ion-select-option value="velika">Velika</ion-select-option>
              <ion-select-option value="specijalna">Specijalna</ion-select-option>
            </ion-select>
          </ion-item>


          <ion-item>
            <ion-label>Stil</ion-label>
            <ion-select v-model="kolorit" >
              <ion-select-option value="bijela">Bijela</ion-select-option>
              <ion-select-option value="realisticna">Realisticna</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>Postolje</ion-label>
            <ion-checkbox v-model="postolje"></ion-checkbox>
          </ion-item>


          <ion-item>
            <ion-label>Zastakljenost</ion-label>
            <ion-checkbox v-model="zastakljenost"></ion-checkbox>
          </ion-item>

          <ion-item>
            <ion-label>Rasvjeta</ion-label>
            <ion-checkbox v-model="rasvjeta"></ion-checkbox>
          </ion-item>

          <ion-item>
            <ion-label>Pokretni elementi</ion-label>
            <ion-checkbox v-model="pokretni_elementi"></ion-checkbox>
          </ion-item>
        </ion-list>

        <ion-button expand="block" @click="submitProject" color="secondary">Submit Project</ion-button>
      </ion-content>
    </template>
  </base-layout>
  
  

</template>
  
  <script >

    import { ref } from 'vue';
    import { supabase } from '@/supabase'; // assuming you have a 'supabase.js' file in your project for Supabase configuration
    import { useRouter, RouterLink } from "vue-router";
    import { format } from 'date-fns';
    import { 
        IonList,
        IonDatetime,
        IonDatetimeButton,
        IonModal,
        IonSelect,
        IonSelectOption,
        IonItem, 
        IonLabel, 
        IonContent,
        IonInput,
        IonButton,
        IonCheckbox,
         } from '@ionic/vue';

    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'CreateProjectPage',
        components: {
            IonList,
            IonDatetime,
            IonDatetimeButton,
            IonModal,
            IonSelect,
            IonSelectOption,
            IonItem,
            IonLabel,
            IonContent,
            IonInput,
            IonButton,
            IonCheckbox,
        },
        setup() {
    const ime_projekta = ref("");
    const pocetak_projekta = ref(null);
    const rok_predaja = ref(null);
    const investitor = ref("");
    const lokacija = ref("");
    const velicina = ref('');
    const cena = ref(null);
    const postolje = ref(false);
    const kolorit = ref('');
    const zastakljenost = ref(false);
    const rasvjeta = ref(false);
    const pokretni_elementi = ref(false);

    const submitProject = async () => {
      try {
        const { error } = await supabase.from("Projekti").insert([
          {
            ime_projekta: ime_projekta.value, //radi
            pocetak_projekta: pocetak_projekta.value ,
            rok_predaja: rok_predaja.value , 
            investitor: investitor.value, // radi
            lokacija: lokacija.value, //radi
            velicina: velicina.value, //radi
            cena: cena.value, //radi
            postolje: postolje.value,
            kolorit: kolorit.value,
            zastakljenost: zastakljenost.value,
            rasvjeta: rasvjeta.value,
            pokretni_elementi: pokretni_elementi.value,
          },
        ]);


        if (error) {
          throw error;
        }

        // Clear form fields
        ime_projekta.value = "";
        pocetak_projekta.value = null;
        rok_predaja.value = null;
        investitor.value = "";
        lokacija.value = "";
        velicina.value = "";
        cena.value = null;
        postolje.value = false;
        kolorit.value = "";
        zastakljenost.value = false;
        rasvjeta.value = false;
        pokretni_elementi.value = false;
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    return {
      ime_projekta,
      pocetak_projekta,
      rok_predaja,
      investitor,
      lokacija,
      velicina,
      cena,
      postolje,
      kolorit,
      zastakljenost,
      rasvjeta,
      pokretni_elementi,
      submitProject,
    };
  },
};

  </script>