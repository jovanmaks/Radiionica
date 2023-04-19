<template>
<base-layout page-title="Napravi projekat" page-default-back-link="/tabs">
    <template v-slot:content>
        
        <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Ime projekta</ion-label>
            <ion-input v-model="ime_projekta" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Pocetak Projekta</ion-label>
            <ion-datetime v-model="pocetak_projekta"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-label>Rok predaja</ion-label>
            <ion-datetime v-model="rok_predaja"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-label>Investitor</ion-label>
            <ion-input v-model="investitor" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Lokacija</ion-label>
            <ion-input v-model="lokacija" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Velicina</ion-label>
            <ion-input v-model="velicina" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Cena</ion-label>
            <ion-input v-model="cena" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Postolje</ion-label>
            <ion-checkbox v-model="postolje"></ion-checkbox>
          </ion-item>

          <ion-item>
            <ion-label>Kolorit</ion-label>
            <ion-checkbox v-model="kolorit"></ion-checkbox>
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
    import { 
        IonList, 
        // IonTitle,
        IonItem, 
        // IonTabBar,
        // IonMenu, 
        // IonTabButton, 
        // IonTabs, 
        IonLabel, 
        // IonIcon, 
        // IonPage, 
        // IonRouterOutlet,
        IonContent,
        IonInput,
        IonButton,
         } from '@ionic/vue';

    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'CreateProjectPage',
        components: {
            // RouterLink,
            IonList,
            // IonTitle,
            IonItem,
            // IonTabBar,
            // IonMenu,
            // IonTabButton,
            // IonTabs,
            IonLabel,
            // IonIcon,
            // IonPage,
            // IonRouterOutlet,
            IonContent,
            IonInput,
            IonButton,
        },
        setup() {
    const ime_projekta = ref("");
    const pocetak_projekta = ref(null);
    const rok_predaja = ref(null);
    const investitor = ref("");
    const lokacija = ref("");
    const velicina = ref(null);
    const cena = ref(null);
    const postolje = ref(false);
    const kolorit = ref(true);
    const zastakljenost = ref(false);
    const rasvjeta = ref(false);
    const pokretni_elementi = ref(false);

    const submitProject = async () => {
      try {
        const { error } = await supabase.from("Projekti").insert([
          {
            ime_projekta: ime_projekta.value,
            pocetak_projekta: pocetak_projekta.value,
            rok_predaja: rok_predaja.value,
            investitor: investitor.value,
            lokacija: lokacija.value,
            velicina: velicina.value,
            cena: cena.value,
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
        velicina.value = null;
        cena.value = null;
        postolje.value = false;
        kolorit.value = true;
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