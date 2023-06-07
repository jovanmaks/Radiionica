<template>
  <base-layout page-title="Izaberi" page-default-back-link="/tabs">
    <template v-slot:content>
      <ion-radio-group v-model="selectedProject">
        <ion-item v-for="(project, index) in projects" :key="index">
          <ion-label>{{ project.ime_projekta }}</ion-label>
          <ion-radio  :value="project.ime_projekta"></ion-radio>
        </ion-item>
      </ion-radio-group>
    </template>
  </base-layout>
</template>

<script lang = "js">
import { ref, onMounted , defineComponent} from 'vue';
import { IonList, IonItem, IonLabel,  IonRadio, IonRadioGroup } from '@ionic/vue';
import { supabase } from '@/supabase'; 

export default {
  components: {
    IonItem,
    IonLabel,
    IonRadio, 
    IonRadioGroup
  },

  setup() {
    const projects = ref([]);
    const selectedProject = ref(null);
    const error = ref(null);
    const loading = ref(true); 

    const loadData = async () => {
      try {
        const { data: fetchedData, error: fetchError } = await supabase.from('Projekti').select('*');

        if (fetchError) {
          throw fetchError;
        }
        projects.value = fetchedData;
      } catch (loadError) {
        console.error('Error loading data:', loadError);
        error.value = loadError.message;
      } finally {
        loading.value = false; 
      }
    };

    onMounted(loadData);

    return {
      projects,
      selectedProject,
      error,
      loading 
    };
  }
};
</script>