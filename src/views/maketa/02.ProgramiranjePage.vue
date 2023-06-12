

<template>
    <base-layout page-title="Programiranje" page-default-back-link="/tabs">
      <template v-slot:content>

        <!-- Inicijalizacija charta -->
        <div>
          <canvas id="myChart" ref="chart"></canvas>
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

  const chart = ref(null)

  // onMounted(async () => {
  //     let { data: broj_objekata, error } = await supabase
  //       .from('Projekti') 
  //       .select('broj_objekata')
      
  //     if (error) {
  //       console.error('Error fetching data:', error)
  //       return
  //     }

  //     // Assuming broj_objekata is an array of integers, you might want to aggregate 
  //     // this data somehow to produce your doughnut chart's data, e.g. count frequencies

  //     let aggregatedData = broj_objekata.reduce((counts, obj) => {
  //       if (counts[obj.broj_objekata] === undefined) {
  //         counts[obj.broj_objekata] = 1
  //       } else {
  //         counts[obj.broj_objekata] += 1
  //       }
  //       return counts
  //     }, {})

  //     let labels = Object.keys(aggregatedData)
  //     let data = Object.values(aggregatedData)

  //     // Create your chart
  //     chart.value = new Chart(chart.value.getContext('2d'), {
  //       type: 'doughnut',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           data: data,
  //           // add colors and other chart settings here...
  //         }]
  //       }
  //     })
  //   })



  return{add};
}};

    


  
  
    </script>