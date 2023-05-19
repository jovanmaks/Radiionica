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
            
            <!-- <ion-button id="open-modal" expand="block" fill="clear">
              <ion-icon :icon="home-outline"></ion-icon>
            </ion-button> -->
            
            
            
            <ion-modal ref="modalRef" @willDismiss="onWillDismiss">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                  </ion-buttons>
                  <ion-title>Welcome</ion-title>
                  <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <ion-item>
                  <ion-label position="stacked">Enter your name</ion-label>
                  <ion-input ref="inputRef" type="text" placeholder="Your name"></ion-input>
                </ion-item>
              </ion-content>
            </ion-modal>


            <!-- <ion-button fill="clear">Organizacija rada</ion-button> -->
            <ion-button fill="outline" >
              <ion-icon :icon="people"></ion-icon>
            </ion-button>

            <ion-button fill="outline" >
              <ion-icon :icon="build"></ion-icon>
            </ion-button>

            <ion-button fill="outline" >
              <ion-icon :icon="chatbubble"></ion-icon>
            </ion-button>


            
            <ion-button  fill="outline" @click="setOpen(true) ">
              <ion-icon :icon="analytics"></ion-icon>
            </ion-button>
            <ion-action-sheet :is-open="isOpen"
              header="Actions"
              :buttons="actionSheetButtons"
              @didDismiss="setOpen(false)">
            </ion-action-sheet>
            
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

    <!--
            <ion-segment :scrollable="true" value="heart">
    <ion-segment-button value="home">
      <ion-icon :icon="home"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart">
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
       <ion-segment-button value="pin">
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="star">
      <ion-icon :icon="star"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="call">
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="globe">
      <ion-icon :icon="globe"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="basket">
      <ion-icon :icon="basket"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="barbell">
      <ion-icon :icon="barbell"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="trash">
      <ion-icon :icon="trash"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="person">
      <ion-icon :icon="person"></ion-icon>
    </ion-segment-button> 
  </ion-segment>
  -->


          </ion-card>
        </div>
        

      </ion-content>
    </template>
  </base-layout>

</template>
  
  <script lang="js">

    import { trash, flask, diamond, cube, home, heart, pin, analytics, build, chatbubble,people } from "ionicons/icons"; 
    import { ref, computed } from 'vue';
    import { supabase } from '@/supabase'; 


    import {
    IonIcon,
    IonContent,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,

    IonActionSheet,

    // IonSegment,
    // IonSegmentButton,
    
    // IonList,
    // IonItem,
    // IonLabel,
    // IonRefresher,
    // IonRefresherContent,
    // IonButton,
  } from "@ionic/vue";

export default {
  components: {
    IonIcon,
    IonContent,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,

    IonActionSheet,

    // IonSegment,
    // IonSegmentButton,

    // IonList,
    // IonItem,
    // IonLabel,
    // IonRefresher,
    // IonRefresherContent,
    // IonButton,
    // IonIcon,
  },


  setup() {
    
    const data = ref([]);
     // Add references for the modal and input elements
     const modalRef = ref(null);
    const inputRef = ref(null);

    

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
    
    loadData();
    

      const isOpen = ref(false);
      const actionSheetButtons = [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ];

      const setOpen = (state) => {
        isOpen.value = state;
      };


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
      
      actionSheetButtons,
      isOpen,
      setOpen,
    };
  },
};


  
  </script>