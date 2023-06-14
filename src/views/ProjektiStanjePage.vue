<template>

  <base-layout page-title="Activity" page-default-back-link="/tabs" >
    <template v-slot:content>

      <ion-content class="content">
        <!-- <ion-refresher slot="fixed" @ionRefresh="loadData">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher> -->

        <div v-for="(item, index) in data" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Projekat: {{ item.ime_projekta }}</ion-card-title>
              <ion-card-subtitle>Investitor: {{ item.investitor }}</ion-card-subtitle>
              <ion-card-subtitle>Lokacija: {{ item.lokacija }}</ion-card-subtitle>
              <ion-card-subtitle>Predaja: {{ item.rok_predaja }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                Opis projekta. Treba unijeti ovo polje u tabelu i dodati pri kreiranju projekta.
            </ion-card-content>
            


            <ion-button fill="outline" >
              <ion-icon :icon="people"></ion-icon>
            </ion-button>

            <ion-button fill="outline" >
              <ion-icon :icon="build"></ion-icon>
            </ion-button>

            <ion-button fill="outline" >
              <ion-icon :icon="chatbubble"></ion-icon>
            </ion-button>


            
            <ion-button  id="open-modal" fill="clear" @click="setOpen(true)">
              <ion-icon :icon="share"></ion-icon>
            </ion-button>
            
            
        
            
            <!-- <ion-button  fill="outline" @click="setOpen(true) ">
              <ion-icon :icon="analytics"></ion-icon>
            </ion-button> -->
            
            <!-- <ion-action-sheet :is-open="isOpen"
              header="Actions"
              :buttons="actionSheetButtons"
              @didDismiss="setOpen(false)">
            </ion-action-sheet> -->
            
            <ion-button fill="clear" @click="removeItem(item.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>

            <ion-item>
            <ion-label>Status</ion-label>
            <!-- <ion-input v-model="velicina" type="number"></ion-input> -->
            <ion-select v-model="velicina" >
              <ion-select-option value="mala">Ceka odgovor</ion-select-option>
              <ion-select-option value="srednja">U toku</ion-select-option>
              <ion-select-option value="velika">Ceka naplatu</ion-select-option>
              <ion-select-option value="specijalna">Zavrseno</ion-select-option>
            </ion-select>
          </ion-item>

          </ion-card>
        </div>

        <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
          <ion-header>
            <ion-toolbar>

              <ion-buttons slot="start">
                <ion-button @click="setOpen(false)">Cancel</ion-button>
              </ion-buttons>
              

              <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirmChanges">Confirm</ion-button>
              </ion-buttons>

            </ion-toolbar>
          </ion-header>
          <Modal :data="data"></Modal>
          <ion-content class="ion-padding">

            <ion-item>
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
  
  <script lang="js">

    import { trash, share, flask, diamond, cube, home, heart, pin, analytics, build, chatbubble,people } from "ionicons/icons"; 
    import { ref, computed, nextTick, onMounted } from 'vue';
    import { supabase } from '@/supabase'; 


    import {
    // IonSearchbar,
    IonContent,
    // IonCheckbox,

    IonIcon,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,


  } from "@ionic/vue";

export default {
  components: {
    // IonSearchbar,
    IonContent,
    // IonCheckbox,
    IonIcon,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,


  },


  setup() {
    
    const data = ref([]);
     // Add references for the modal and input elements
     const modalRef = ref(null);
    const inputRef = ref(null);
    const usernew = ref(supabase.auth.getUser())

    
    const allUsers = ref([]);
    const selectedUserIDs = ref([]);
    const currentUserID  = ref(null);
      
    const setOpen = (state) => {isOpenRef.value = state;};
    const isOpenRef = ref(false);
    
    

    const loadData = async (event = null) => {
      try {
        const { data: fetchedData, error } = await supabase
          .from('Projekti') 
          .select('*');

        if (error) {
          throw error;
        }

        data.value = fetchedData;
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (event) {
          event.target.complete();
        }
      }
    };

    onMounted(async () => {


const usernewResolved = await usernew.value;
  console.log('user', usernewResolved);
  console.log('user id', usernewResolved.data.user.id);
  currentUserID.value  = usernewResolved.data.user.id;

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


    const removeItem = async (id) => {
      try {
        const { error } = await supabase
          .from("Projekti")
          .delete()
          .match({ id });

        if (error) {
          throw error;
        }

        loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };
    
    
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


      try {
        const { error } = await supabase.from("Projekti").insert([
          {
            saradnici: selectedUserIDs.value // add this line to store multiple user ids
          },
        ]);

        if (error) {
          throw error;
        }
        selectedUserIDs.value = []; // clear selectedUserIDs array
      } catch (error) {
        console.error("Error submitting form:", error);
      }

      // Here, selectedUserIDs.value contains the IDs of the selected users
      console.log('sa modalaaaa', selectedUserIDs.value);
      setOpen(false);
    };
    
    
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
    
    loadData();
    fetchUsers();

      const isOpen = ref(false);
      // const actionSheetButtons = [
      //   {
      //     text: 'Delete',
      //     role: 'destructive',
      //     data: {
      //       action: 'delete',
      //     },
      //   },
      //   {
      //     text: 'Share',
      //     data: {
      //       action: 'share',
      //     },
      //   },
      //   {
      //     text: 'Cancel',
      //     role: 'cancel',
      //     data: {
      //       action: 'cancel',
      //     },
      //   },
      // ];



    const message = ref(
      "This modal example uses triggers to automatically open a modal when the button is clicked."
    );

    // ...

    const cancel = () => {
      IonModal.dismiss(null, "cancel", modalRef);
    };

    const confirm = () => {
      const name = inputRef.value.value;
      IonModal.dismiss(name, "confirm", modalRef);
    };

    const onWillDismiss = (ev) => {
      if (ev.detail.role === "confirm") {
        message.value = `Hello, ${ev.detail.data}!`;
      }
    };
    
    return {
      data,
      loadData,
      removeItem,

      trash,
      share,
      home, 
      heart,
      pin,
      analytics,
      build,
      chatbubble,
      people,

      cancel,
      confirm,
      onWillDismiss,
      modalRef,
      inputRef,
      message,
      
      // actionSheetButtons,
      isOpen,
      isOpenRef,
      setOpen,
      allUsers,
      selectedUserIDs,
      currentUserID,
      toggleUser,
      confirmChanges,
    };
  },
};


  
  </script>