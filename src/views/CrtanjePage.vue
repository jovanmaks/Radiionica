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
          <ion-title>Welcome</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Enter your name</ion-label>
          <ion-input ref="input" type="text" placeholder="Your name"></ion-input>
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
    // IonAlert,
    // useIonAlert,
    IonPage,
    IonRouterOutlet } from '@ionic/vue';
    import { OverlayEventDetail } from '@ionic/core/components';
    import { onMounted, ref, defineComponent } from 'vue';
    import { Chart, registerables } from 'chart.js';
    import { useRouter, RouterLink } from "vue-router";
    
  // import { ellipse, square, triangle, star, add } from 'ionicons/icons';
  
  Chart.register(...registerables);
  
  import { print, qrCode, checkmarkDone, cloudUpload, share, add } from "ionicons/icons";
  export default {
    name: 'ProjektiPage',
    components: {
      IonButtons,
      IonButton,
      IonModal,
      // IonHeader,
      IonContent,
      IonToolbar,
      IonTitle,
      IonItem,
      IonInput,
      IonLabel,
      // IonList,
      // IonTitle,
      // IonItem,
      // IonTabBar,
      // IonMenu,
      // IonTabButton,
      // IonTabs,
      // IonLabel,
      IonIcon,
      // IonButton,
      IonFab,
      IonFabButton,
      // IonAlert,
      // IonPage,
      // IonRouterOutlet,
      // RouterLink
    },

    data() {
      return {
        message: 'This modal example uses triggers to automatically open a modal when the button is clicked.',
      };
    },
    methods: {
      cancel() {
        this.$refs.modal.$el.dismiss(null, 'cancel');
      },
      confirm() {
        const name = this.$refs.input.$el.value;
        this.$refs.modal.$el.dismiss(name, 'confirm');
      },
      onWillDismiss(ev) {
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}
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




  <!-- <template>
    <base-layout page-title="Crtanje" page-default-back-link="/tabs">
      <template v-slot:content>
        <div>
          <canvas ref="chart"></canvas>
          <ion-button @click="addData">Add Data</ion-button>
        </div>
      </template>
    </base-layout>
  </template>
  
  <script lang="js">
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { IonButton } from '@ionic/vue';
  
  Chart.register(...registerables);
  
  export default {
    name: 'ProjektiPage',
    components: {
      IonButton
    },
    setup() {
      const chart = ref(null);
      const chartInstance = ref(null);
      const total = ref(0);
  
      const addData = () => {
        const value = parseInt(prompt("Enter a number:"));
        if (isNaN(value)) {
          alert("Invalid input. Please enter a number.");
          return;
        }
        if (total.value + value > 100) {
          alert("Total cannot exceed 100.");
          return;
        }
        total.value += value;
        chartInstance.value.data.datasets[0].data.push(value);
        chartInstance.value.update();
      };
  
      onMounted(() => {
        const ctx = chart.value.getContext('2d');
        chartInstance.value = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [],
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
        addData
      }
    }
  };
  </script> -->
  