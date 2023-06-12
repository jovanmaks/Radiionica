

<template>
    <base-layout page-title="Programiranje" page-default-back-link="/tabs">
      <template v-slot:content>

 <ion-content class="ion-padding">
        
        <div>
          <canvas id="myChart" ref="chartRef"></canvas>
        </div>

        <ion-fab slot="fixed" vertical="bottom" horizontal="center">
          <ion-fab-button id="open-modal" color="dark"  @click="setOpen(true)">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>

            
      <ion-modal :is-open="isOpenRef" css-class="my-custom-class" @didDismiss="setOpen(false)">
        <!-- <ion-button @click="setOpen(false)">Close</ion-button> -->
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="setOpen(false)">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Sekcija</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true"  @click="confirmChanges">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <Modal :data="data"></Modal>
        <ion-content class="ion-padding">

          
 <ion-item v-for="(section, index) in modalSections" :key="index">
  <ion-segment :value="section.done ? 'done' : 'notDone'">
    <ion-segment-button value="notDone" @click="updateStatus(index, 'notDone')">
      <ion-label>{{index + 1}}</ion-label> 
    </ion-segment-button>
    <ion-segment-button value="done" @click="updateStatus(index, 'done')">
      <ion-label>Done</ion-label>
    </ion-segment-button>
  </ion-segment>
</ion-item> 



        <!-- <ion-item>
          <ion-label position="stacked">Biljeska</ion-label>
          <ion-input ref="nameInput" type="text" placeholder="Sekcija"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Postotak</ion-label>
          <ion-input ref="valueInput" type="number" placeholder="Postotak"></ion-input>
        </ion-item> -->

        </ion-content>

      </ion-modal>
    </ion-content>
     
      </template>
    </base-layout>
  </template>
    
    <script lang="js">
  
    import { 
      IonIcon,
      IonFab,
      IonFabButton,
      IonModal,
      IonList, 
      IonTabBar,
      IonMenu,
      IonTabButton,
      IonTabs,
      IonContent,
      IonPage,
      IonRouterOutlet ,
      IonButton,
      IonToolbar,
      IonHeader,
      
      // IonInput,
      IonItem,
      IonLabel,
      // IonTitle,
      IonButtons,
      IonSegment, 
      IonSegmentButton,
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
        IonModal,
        IonContent,
        IonButton,
        IonToolbar,
        IonHeader,
        IonItem,
        // IonInput,
        IonLabel,
        IonButtons,
        // IonTitle,
        IonSegment, 
        IonSegmentButton,
      },

setup() {

  const chart = ref(null);
  const chartRef = ref(null);

  const chartSize = ref(null);
  const chartData = ref([]);
  const chartColors = ref([]);
  

  // modal
  const isOpenRef = ref(false);
  const setOpen = (state) => (isOpenRef.value = state);
  const data = { content: 'New Content' };

  const modalSections = ref([]); 
  const originalModalSections = ref([]);

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
          modalSections.value.push({ done: value });
          originalModalSections.value.push({ done: value });
          chartData.value.push(value);
          chartColors.value.push(value ? 'green' : 'gray');

        });
      }
    });
    chartSize.value = chartData.value.length;

    console.log('chartData', chartData.value);
    console.log('chartColors', chartColors.value);
    console.log('chartSize', chartSize.value);
  }; 
  
  const updateStatus = (index, status) => {
      modalSections.value[index].done = status === 'done';
    };
  
  let myChart; // Declare myChart outside of your function

  onMounted(async () => {
  await fetchData();

  const ctx = chartRef.value.getContext('2d'); // Get the 2d context of the canvas
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Array(chartSize.value).fill().map((_, i) => `Section ${i + 1}`),
      datasets: [{
        label: '# of Votes',
        data: Array(chartSize.value).fill(1),
        backgroundColor: chartColors.value, // Use the color array here
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


const confirmChanges = async () => {
  const ime_projekta = localStorage.getItem('selectedProject');

  const { error } = await supabase
    .from('Projekti')
    .update({ objekti: modalSections.value.map(section => section.done) })
    .eq('ime_projekta', ime_projekta);

  if (error) {
    console.error('Error updating data:', error);
    return;
  }

  // Update was successful, copy the changes to the original data
  originalModalSections.value = [...modalSections.value];

  // Update chart colors and re-render the chart
  chartColors.value = modalSections.value.map(section => section.done ? 'green' : 'gray');
  myChart.data.datasets[0].backgroundColor = chartColors.value;
  myChart.update();

  setOpen(false);
};

  return{   add,chartRef, isOpenRef, setOpen, data, modalSections, updateStatus,confirmChanges  };
}};
  
    </script>