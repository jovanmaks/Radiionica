  <template>
    <base-layout page-title="Crtanje" page-default-back-link="/tabs">
      <template v-slot:content>
        <div>
          <canvas ref="chart"></canvas>
        </div>
      </template>
    </base-layout>
  </template>
  
  <script lang="js">
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { useRouter, RouterLink } from "vue-router";
  import { IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { ellipse, square, triangle, star } from 'ionicons/icons';
  
  Chart.register(...registerables);
  
  export default {
    name: 'ProjektiPage',
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
        chart
      }
    }
  };
  </script>