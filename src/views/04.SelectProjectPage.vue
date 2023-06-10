<template>
  <base-layout page-title="SelectProject" page-default-back-link="/tabs">
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

<script lang="js">
import { createStore } from 'vuex';
import { ref, onMounted , defineComponent, computed } from 'vue';
import { IonList, IonItem, IonLabel,  IonRadio, IonRadioGroup } from '@ionic/vue';
import { supabase } from '@/supabase'; 

// Vuex Store
const store = createStore({
  state: {
    selectedProject: localStorage.getItem('selectedProject') || null,
  },
  mutations: {
    setSelectedProject(state, selectedProject) {
      state.selectedProject = selectedProject;
      localStorage.setItem('selectedProject', selectedProject);
    },
  },
});

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonRadio, 
    IonRadioGroup
  },

  setup() {
    const projects = ref([]);
    const error = ref(null);
    const loading = ref(true);

    // Create a computed property that reflects the Vuex state
    const selectedProject = computed({
      get: () => store.state.selectedProject,
      set: (value) => store.commit('setSelectedProject', value),
    });

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
});
</script>