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

      <!-- <ion-item v-for="(section, index) in modalSections" :key="index">
      <ion-segment :value="section.done ? 'done' : 'notDone'" @ionChange="updateStatus(index, $event.detail.value)"   >
        <ion-segment-button value="done">
          <ion-label>Done</ion-label>
        </ion-segment-button>
        <ion-segment-button value="notDone">
          <ion-label>Not Done</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-item> -->

    <ion-item v-for="(section, index) in modalSections" :key="index">
  <ion-segment :value="section.done ? 'done' : 'notDone'">
    <ion-segment-button value="done" @click="updateStatus(index, 'done')">
      <ion-label>Done</ion-label>
    </ion-segment-button>
    <ion-segment-button value="notDone" @click="updateStatus(index, 'notDone')">
      <ion-label>Not Done</ion-label>
    </ion-segment-button>
  </ion-segment>
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
      // IonSegment, 
      // IonSegmentButton,
    },

    data() {
      return {
        sections: [],
        message: 'This modal example uses triggers to automatically open a modal when the button is clicked.',
        // colors: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)'
        // ],
        switchCount: 0, // add this new property to keep track of the count
        // modalSections: [] // add modalSections here
      };
    },
    methods: {
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

  //     updateStatus(index, value) {
  //   this.modalSections[index].done = value === 'done';
  //   if (value === 'done') {
  //     this.switchCount += 1;
  //   } else {
  //     this.switchCount -= 1;
  //   }
  //   // save switchCount to your backend here
  //   const { data, error } = await supabase
  //   .from('Projekti')
  //   .update({ broj_nacrtanih: this.switchCount })
  //   .eq('id', your_id);
  // },

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



    
      onMounted(async () => {
    const selectedProject = await loadSelectedProject();
    modalSections.value = Array(selectedProject.broj_objekata)
        .fill()
        .map((_, index) => ({ 
          name: `Object ${index + 1}`, 
          value: 1, // Replace with real value
          done: false 
        }));

 

    const ctx = chart.value.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Array(selectedProject.broj_objekata).fill().map((_, i) => `Object ${i + 1}`),
        datasets: [{
          label: '# of Votes',
          data: Array(selectedProject.broj_objekata).fill(1), // Replace with real data
          backgroundColor: 'rgba(128, 128, 128, 1)', // Gray color
          borderColor: 'rgba(0, 0, 0, 1)', // Gray color
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
     modalSections
    };

    }
    
  };

  </script>


