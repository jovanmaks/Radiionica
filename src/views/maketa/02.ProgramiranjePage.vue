

<template>
    <base-layout page-title="Programiranje" page-default-back-link="/tabs">
      <template v-slot:content>

        <!-- Inicijalizacija charta -->
        <div>
          <canvas id="myChart" ref="chartRef"></canvas>
        </div>



        <ion-fab slot="fixed" vertical="bottom" horizontal="center">
          <ion-fab-button id="open-modal" color="dark"  @click="openModal">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        
      </template>
    </base-layout>
  </template>
    
    <script lang="js">
  
    import { 
      IonIcon,
      IonFab,
      IonFabButton,
      // IonLabel,
      // IonList, 
      // IonTitle,
      // IonItem,
      // IonTabBar,
      // IonMenu,
      // IonTabButton,
      // IonTabs,
      // IonButtons,
      // IonButton,
      // IonModal,
      // IonContent,
      // IonToolbar,
      // IonInput,
      // IonPage,
      // IonSegment, 
      // IonSegmentButton,
      // IonRouterOutlet 
      } from '@ionic/vue';

      import { OverlayEventDetail } from '@ionic/core/components';
      import { onMounted, ref, defineComponent, watchEffect } from 'vue';
      import { Chart, registerables } from 'chart.js';
      import { useRouter, RouterLink } from "vue-router";
      import { supabase } from '@/supabase';
      
    
      Chart.register(...registerables);
    
      import { print, qrCode, checkmarkDone, cloudUpload, share, add } from "ionicons/icons";



    
    export default {
      name: 'ProgramiranjePage',
      components: {
        IonIcon,
        IonFab,
        IonFabButton,
        // IonButtons,
        // IonButton,
        // IonModal,
        // IonContent,
        // IonToolbar,
        // IonTitle,
        // IonItem,
        // IonInput,
        // IonLabel,
        // IonSegment, 
        // IonSegmentButton,
      },

setup() {

  const chart = ref(null);
  const chartRef = ref(null);

  const chartSize = ref(null);
  const chartData = ref([]);
  const chartColors = ref([]);


  const fetchData = async () => {
    const { data, error } = await supabase
      .from('Projekti')
      .select('objekti');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    data.forEach((record) => {
      if (Array.isArray(record.objekti)) {
        record.objekti.forEach((value) => {
          chartData.value.push(value);
          chartColors.value.push(value ? 'red' : 'gray');
        });
      }
    });
    chartSize.value = chartData.value.length;

    console.log('chartData', chartData.value);
    console.log('chartColors', chartColors.value);
    console.log('chartSize', chartSize.value);
  }; 
  

  
  let myChart; // Declare myChart outside of your function

  onMounted(async () => {
        await fetchData();

        const ctx = chartRef.value.getContext('2d'); // Get the 2d context of the canvas
        const myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Array(chartSize.value).fill().map((_, i) => `Section ${i + 1}`),
            datasets: [{
              label: '# of Votes',
              data: Array(chartSize.value).fill(1),
              backgroundColor:'rgba(0, 0, 0, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 1
            }]
          },
          options: {
            cutout: '30%',
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      });

 


  return{add, chartRef};
}};
  
    </script>