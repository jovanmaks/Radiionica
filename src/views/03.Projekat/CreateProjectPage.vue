<template>
  <base-layout page-title="Нови пројекат" page-default-back-link="/tabs">
    <template v-slot:content>

      <ion-content>

        <ion-list>

          <ion-item>
            <ion-label>Име пројекта:</ion-label>
            <ion-input v-model="ime_projekta" type="text"></ion-input>
          </ion-item>

          <ion-item>

            <ion-label>Почетак пројекта:</ion-label>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime" v-model="pocetak_projekta"></ion-datetime>
            </ion-modal>

          </ion-item>

          <ion-item>
            <ion-label>Рок за предају:</ion-label>
            <ion-datetime-button datetime="datetime2"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime2" v-model="rok_predaja"></ion-datetime>
            </ion-modal>
          </ion-item>

          <ion-item>
            <ion-label>Инвеститор:</ion-label>
            <ion-input v-model="investitor" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Локација:</ion-label>
            <ion-input v-model="lokacija" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Цијена:</ion-label>
            <ion-input v-model="cena" type="number"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Број објеката:</ion-label>
            <ion-input v-model="broj_objekata" type="number" @ionChange="updateObjekti"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Величина</ion-label>
            <ion-select v-model="velicina">
              <ion-select-option value="mala">Мала</ion-select-option>
              <ion-select-option value="srednja">Средња</ion-select-option>
              <ion-select-option value="velika">Велика</ion-select-option>
              <ion-select-option value="specijalna">Специјална</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>Стил</ion-label>
            <ion-select v-model="kolorit">
              <ion-select-option value="bijela">Бијела</ion-select-option>
              <ion-select-option value="realisticna">Реалистична</ion-select-option>
            </ion-select>
          </ion-item>




          <!-- <ion-item>
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
          </ion-item> -->

        </ion-list>

        <ion-button expand="block" id="open-modal" color="dark" @click="setOpen(true)">Сарадници</ion-button>
        <ion-button expand="block" @click="submitProject" color="secondary">Сачувај</ion-button>

        <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="setOpen(false)">
                  <ion-icon slot="icon-only" name="close"></ion-icon>
                  <!-- Cancel -->
                </ion-button>
              </ion-buttons>

              <!-- <ion-title>Saradnici</ion-title> -->
              <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirmChanges">
                  <!-- Confirm -->
                  <ion-icon slot="end" :icon="checkmark"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <Modal :data="data"></Modal>
          <ion-content class="ion-padding">
            <ion-item>
              <!-- <ion-searchbar  @ionInput="handleInput($event)"></ion-searchbar> -->
              <ion-searchbar></ion-searchbar>

            </ion-item>

            <ion-list>
              <ion-item v-for="(user, index) in allUsers" :key="index">
                <ion-checkbox slot="start" v-model="user.selected"
                  @ionChange="toggleUser(user.id, $event.target.checked)"></ion-checkbox>

                <ion-label>{{ user.username }}</ion-label>
              </ion-item>
            </ion-list>

          </ion-content>
        </ion-modal>

      </ion-content>
    </template>
  </base-layout>
</template>
  
<script >

import { ref, watch, onMounted, nextTick } from 'vue';
import { supabase } from '@/supabase'; // assuming you have a 'supabase.js' file in your project for Supabase configuration
import { useRouter, RouterLink } from "vue-router";
import { format } from 'date-fns';
import {
  IonSearchbar,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  // IonTitle,
  IonList,
  IonDatetime,
  IonDatetimeButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonContent,
  IonInput,
  IonButton,
  IonCheckbox,
  // IonIcon,
  // IonFab,
  // IonFabButton,
} from '@ionic/vue';

import { ellipse, square, triangle, star, add, close, checkmark } from 'ionicons/icons';


export default {
  name: 'CreateProjectPage',
  components: {
    IonSearchbar,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    // IonTitle,
    IonList,
    IonDatetime,
    IonDatetimeButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonContent,
    IonInput,
    IonButton,
    IonCheckbox,
    // IonIcon,
    // IonFab,
    // IonFabButton,
  },
  setup() {
    const setOpen = (state) => (isOpenRef.value = state);
    const isOpenRef = ref(false);


    const ime_projekta = ref("");
    const pocetak_projekta = ref(null);
    const rok_predaja = ref(null);
    const investitor = ref("");
    const lokacija = ref("");
    const velicina = ref('');
    const cena = ref(null);
    // const postolje = ref(false);
    const broj_objekata = ref(null);
    const objekti = ref([]);

    const objekti_crtanje = ref([]);
    const objekti_programiranje = ref([]);
    const objekti_pripremaSjecenje = ref([]);
    const objekti_sjecenje = ref([]);
    const objekti_pripremaFarbanje = ref([]);
    const objekti_farbanje = ref([]);
    const objekti_sklapanje = ref([]);

    // const objekti = computed(() => new Array(broj_objekata.value).fill(false)); // added this line
    const kolorit = ref('');
    const zastakljenost = ref(false);
    const rasvjeta = ref(false);
    const pokretni_elementi = ref(false);


    const allUsers = ref([]);

    // const { data: { user } } =  supabase.auth.getUser();
    // const currentUserID = session ? session.user.id : null;
    const session = ref(supabase.auth.getSession())
    const usernew = ref(supabase.auth.getUser())

    // const { data, error } = await supabase.auth.getSession()

    const currentUserID = ref(null);


    const selectedUserIDs = ref([]);


    const fetchUsers = async () => {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
      // .neq('id', currentUserID)

      allUsers.value = users;
      console.log('USERIIII', allUsers.value);

      if (error) console.log('Error: ', error)
      else {
        allUsers.value = users;
        console.log('USERIIII', allUsers.value);
      }
    };


    const confirmChanges = async () => {
      // Here, selectedUserIDs.value contains the IDs of the selected users
      console.log('sa modalaaaa', selectedUserIDs.value);
      setOpen(false);
    };


    fetchUsers();


    onMounted(async () => {


      const usernewResolved = await usernew.value;
      console.log('user', usernewResolved);
      console.log('user id', usernewResolved.data.user.id);
      currentUserID.value = usernewResolved.data.user.id;

      try {


        const { data: users, error } = await supabase
          .from('profiles')
          .select('*')

        if (error) throw error;

        allUsers.value = users.map(user => ({ ...user, selected: false }));
        console.log('USERIIII', allUsers.value);
        console.log('trenutniii', currentUserID);
      } catch (error) {
        console.log('Error: ', error)
      }
    });


    const toggleUser = (userId, isChecked) => {
      console.log(`toggleUser called with userId=${userId} and isChecked=${isChecked}`);
      nextTick(() => {
        if (isChecked && !selectedUserIDs.value.includes(userId)) {
          selectedUserIDs.value.push(userId);
        } else if (!isChecked && selectedUserIDs.value.includes(userId)) {
          selectedUserIDs.value = selectedUserIDs.value.filter(id => id !== userId);
        }
      });
    };


    const updateObjekti = () => {
      const count = Number(broj_objekata.value) + 1;  // Increase the number of objects by 1

      objekti.value = new Array(count).fill(false);

      objekti_crtanje.value = new Array(count).fill(false);
      objekti_programiranje.value = new Array(count).fill(false);
      objekti_pripremaSjecenje.value = new Array(count).fill(false);
      objekti_sjecenje.value = new Array(count).fill(false);
      objekti_pripremaFarbanje.value = new Array(count).fill(false);
      objekti_farbanje.value = new Array(count).fill(false);
      objekti_sklapanje.value = new Array(count).fill(false);

    };


    const submitProject = async () => {
      try {
        const { data: projectData, error: error1 } = await supabase.from("Projekti").insert([
          {
            ime_projekta: ime_projekta.value, //radi
            pocetak_projekta: pocetak_projekta.value,
            rok_predaja: rok_predaja.value,
            investitor: investitor.value, // radi
            lokacija: lokacija.value, //radi
            velicina: velicina.value, //radi
            // cena: cena.value, //radi
            broj_objekata: broj_objekata.value,
            objekti: objekti.value,

            objekti_crtanje: objekti_crtanje.value,
            objekti_programiranje: objekti_programiranje.value,
            objekti_pripremaSjecenje: objekti_pripremaSjecenje.value,
            objekti_sjecenje: objekti_sjecenje.value,
            objekti_pripremaFarbanje: objekti_pripremaFarbanje.value,
            objekti_farbanje: objekti_farbanje.value,
            objekti_sklapanje: objekti_sklapanje.value,


            kolorit: kolorit.value,
            zastakljenost: zastakljenost.value,
            rasvjeta: rasvjeta.value,
            pokretni_elementi: pokretni_elementi.value,
            user_id: currentUserID.value, // add this line to store logged user id
            saradnici: selectedUserIDs.value, // add this line to store multiple user ids


          },
        ], { returning: "minimal" })
          .select();


        const projectId = projectData[0].id;
        // const test  = data;
        // console.log('test', test);



        const { error: error2 } = await supabase.from("sensitiveData").insert([
          {
            projekti_id: projectId, // this is assuming your foreign key in the sensitiveData table is named 'projekti_id'
            cijena_projekta: cena.value,
          },
        ]);

        const error = error1 || error2; // Consider either error as an error.



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
        broj_objekata.value = null;
        objekti.value = []; // clear objekti array

        objekti_crtanje.value = [];
        objekti_programiranje.value = [];
        objekti_pripremaSjecenje.value = [];
        objekti_sjecenje.value = [];
        objekti_pripremaFarbanje.value = [];
        objekti_farbanje.value = [];
        objekti_sklapanje.value = [];

        kolorit.value = "";
        zastakljenost.value = false;
        rasvjeta.value = false;
        pokretni_elementi.value = false;
        selectedUserIDs.value = []; // clear selectedUserIDs array
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
      broj_objekata,
      objekti,
      close,
      checkmark,

      objekti_crtanje,
      objekti_programiranje,
      objekti_pripremaSjecenje,
      objekti_sjecenje,
      objekti_pripremaFarbanje,
      objekti_farbanje,
      objekti_sklapanje,

      kolorit,
      zastakljenost,
      rasvjeta,
      pokretni_elementi,
      submitProject,
      updateObjekti,
      add,
      isOpenRef,
      setOpen,
      allUsers,
      selectedUserIDs,
      currentUserID,
      toggleUser,
      confirmChanges,
      session,
    };
  },
};

</script>