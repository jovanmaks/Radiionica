  <template>
    <base-layout page-title="Crtanje" page-default-back-link="/tabs">
      <template v-slot:content>
        
        <ion-content class="ion-padding">
        
        <div>
          <canvas ref="chart"></canvas>
        </div>
          
        <ion-fab slot="fixed" vertical="bottom" horizontal="center">
          <ion-fab-button id="open-modal" color="dark"  @click="openModal">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>


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

          <ion-item v-for="(section, index) in modalSections" :key="index">
    <ion-segment :value="section.done ? 'done' : 'notDone'">
      <ion-segment-button value="notDone" @click="updateStatus(index, 'notDone')">
        <ion-label>Not Done</ion-label>
      </ion-segment-button>
      <ion-segment-button value="done" @click="updateStatus(index, 'done')">
        <ion-label>Done</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-item>


        <ion-item>
          <ion-label position="stacked">Biljeska</ion-label>
          <ion-input ref="nameInput" type="text" placeholder="Sekcija"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Postotak</ion-label>
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
      // IonInput,
      IonPage,
      IonSegment, 
      IonSegmentButton,
      IonRouterOutlet } from '@ionic/vue';
      import { OverlayEventDetail } from '@ionic/core/components';
      import { onMounted, ref, defineComponent } from 'vue';
      import { Chart, registerables } from 'chart.js';
      import { useRouter, RouterLink } from "vue-router";
      import { supabase } from '@/supabase';
      
    
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
        // IonInput,
        IonLabel,
        IonIcon,
        IonFab,
        IonFabButton,
        IonSegment, 
        IonSegmentButton,
      },

      data() {
        return {
          sections: [],
          switchCount: 0, // add this new property to keep track of the count
        };
      },
      methods: {

        openModal() {
    // Fetch the latest broj_nacrtanih value from the server here
    supabase
      .from('Projekti')
      .select('broj_nacrtanih')
      .eq('ime_projekta', localStorage.getItem('selectedProject'))
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading count:', error);
        } else {
          this.switchCount = data[0].broj_nacrtanih;
          // Now open the modal
          this.$refs.modal.$el.present();
        }
      });
  },

        cancel() {
          this.$refs.modal.$el.dismiss(null, 'cancel');
        },
        
    
        confirm() {
          console.log(this.$refs);
          const name = this.$refs.nameInput.value;
          const value = this.$refs.valueInput.value;
          const data = {name: name, value: value};
          this.$refs.modal.$el.dismiss(data, 'confirm');


    // updating `broj_nacrtanih` column in `Projekti` table
    supabase
      .from('Projekti')
      .update({ broj_nacrtanih: this.switchCount })
      .eq('ime_projekta', localStorage.getItem('selectedProject'))
      .then(({ data, error }) => {
        if (error) {
          console.error('Error updating count:', error);
        } else {
          console.log('Successfully updated count:', data);
          console.log('switch count:', this.switchCount);
        }
      });

        },

        onWillDismiss: function(ev) {
          if (ev.detail.role === 'confirm') {
          this.message = 'Hello, ' + ev.detail.data.name + ', your value is ' + ev.detail.data.value + '!';
          }
        },


    updateStatus(index, value) {
      console.log('updateStatus called with:', index, value); // Add this
      this.modalSections[index].done = value === 'done';
      if (value === 'done') {
        this.switchCount += 1;
      } else {
        this.switchCount -= 1;
      }
      console.log('switch triggered:', this.switchCount);
      this.saveSwitchCountToBackend();
      // localStorage.setItem('switchCount', this.switchCount);
    },

    
    // Add new method to save to backend
    saveSwitchCountToBackend() {
      supabase
        .from('Projekti')
        .update({ broj_nacrtanih: this.switchCount })
        .eq('ime_projekta', localStorage.getItem('selectedProject'))
        .then(({ data, error }) => {
          if (error) {
            console.error('Error saving switch count:', error);
          } else {
            console.log('Successfully saved switch count:', data);
          }
        });
    },

      },

      setup() {

        const modalSections = ref([]);
        const selectedProjectName = localStorage.getItem('selectedProject');
        const chart = ref(null);
        const chartInstance = ref(null); // reference to hold chart instance

 
    
        const switchCount = ref(0); // initialize switchCount

        const loadSelectedProject = async () => {
        const { data: fetchedData, error } = await supabase
          .from('Projekti')
          .select('*')
          .eq('ime_projekta', selectedProjectName);

        if (error) {
          console.error('Error loading project:', error);
          return;
        }

        return fetchedData[0];
      };



  let myChart; // Declare myChart outside of your function

  onMounted(async () => {
      const selectedProject = await loadSelectedProject();
      const broj_nacrtanih = selectedProject.broj_nacrtanih;

      // this.switchCount = broj_nacrtanih;
      // switchCount.value = broj_nacrtanih;

      // modalSections.value = Array(selectedProject.broj_objekata)
      //     .fill()
      //     .map((_, index) => ({ 
      //       name: `Object ${index + 1}`, 
      //       value: 1, // Replace with real value
      //       done: false 
      //     }));

       switchCount.value = broj_nacrtanih; // update the switchCount

      modalSections.value = Array(selectedProject.broj_objekata)
      .fill()
      .map((_, index) => ({ 
        name: `Object ${index + 1}`, 
        value: 1, // Replace with real value
        done: index < broj_nacrtanih ? true : false // If index is less than broj_nacrtanih, set 'done' to true, otherwise false.
      }));

      const backgroundColor = Array(selectedProject.broj_objekata).fill('rgba(128, 128, 128, 1)');
      for (let i = 0; i < broj_nacrtanih; i++) {
          backgroundColor[i] = 'rgba(255, 0, 0, 1)';
      }

      const ctx = chart.value.getContext('2d');

      // If myChart is not undefined, destroy it before creating a new one
      if (myChart) {
          myChart.destroy();
      }

      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Array(selectedProject.broj_objekata).fill().map((_, i) => `Object ${i + 1}`),
          datasets: [{
            label: '# of Votes',
            data: Array(selectedProject.broj_objekata).fill(1), // Replace with real data
            backgroundColor: backgroundColor,
            borderColor: 'rgba(0, 0, 0, 1)',
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
      add,
      modalSections,
      //  switchCount // add this line
      };

      }
      
    };

    </script>


