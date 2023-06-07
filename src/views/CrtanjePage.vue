<template>
  <base-layout page-title="Crtanje" page-default-back-link="/tabs">
    <template v-slot:content>

      
      <ion-content class="ion-padding">
      
      <div>
        <canvas ref="chart"></canvas>
      </div>
        
      <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button id="open-modal" color="dark">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>


    <p>{{ message }}</p>
    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Sekcija</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
        <ion-label position="stacked">Unesi sekciju</ion-label>
        <ion-input ref="nameInput" type="text" placeholder="Sekcija"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Unesi postotak</ion-label>
        <ion-input ref="valueInput" type="number" placeholder="Postotak"></ion-input>
      </ion-item>
      </ion-content>
    </ion-modal>
  </ion-content>



    </template>
  </base-layout>
</template>
  
  <script lang="js">
  import { 
    IonList, 
    IonTitle,
    IonItem,
    IonTabBar,
    IonMenu,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonButtons,
    IonButton,
    IonModal,
    IonFab,
    IonFabButton,
    IonContent,
    IonToolbar,
    IonInput,
    IonPage,
    IonRouterOutlet } from '@ionic/vue';
    import { OverlayEventDetail } from '@ionic/core/components';
    import { onMounted, ref, defineComponent } from 'vue';
    import { Chart, registerables } from 'chart.js';
    import { useRouter, RouterLink } from "vue-router";
    
  
  Chart.register(...registerables);
  
  import { print, qrCode, checkmarkDone, cloudUpload, share, add } from "ionicons/icons";
  export default {
    name: 'ProjektiPage',
    components: {
      IonButtons,
      IonButton,
      IonModal,
      IonContent,
      IonToolbar,
      IonTitle,
      IonItem,
      IonInput,
      IonLabel,
      IonIcon,
      IonFab,
      IonFabButton,
    },

    data() {
      return {
        sections: [],
        message: 'This modal example uses triggers to automatically open a modal when the button is clicked.',
        colors: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ]
      };
    },
    methods: {
      cancel() {
        this.$refs.modal.$el.dismiss(null, 'cancel');
      },
      confirm() {
        const name = this.$refs.nameInput.$el.value;
        const value = this.$refs.valueInput.$el.value;
        this.sections.push({ name, value });
        this.$refs.modal.$el.dismiss(name, 'confirm');
      },
      // existing methods
    },


    setup() {


   


      const chart = ref(null);
  
      onMounted(() => {
        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            cutout: '50%',
          }
        });
      });
  
  
  return {
    chart,
    add
    };

    }
  };
  </script>


