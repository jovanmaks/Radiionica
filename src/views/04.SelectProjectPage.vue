<!-- <template>
    <base-layout page-title="Izaber projekat" page-default-back-link="/admin" >
      <IonList>
        <IonItem v-for="(project, index) in projects.value" :key="index" @click="handleItemClick(project)">
          <IonLabel>{{ project.ime_projekta }}</IonLabel>
        </IonItem>
      </IonList>
    </base-layout>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue';
    import { IonList, IonItem, IonLabel } from '@ionic/vue';
    // import { supabase } from '../services/supabase'; // change this to your actual path
    import { supabase } from '@/supabase'; 
  
    export default {
      components: {
        IonList,
        IonItem,
        IonLabel
      },
  
      setup() {
        const projects = ref([]);
  
        const loadData = async () => {
          try {
            const { data, error } = await supabase.from('Projekti').select('*');
            if (error) {
              throw error;
            }
  
            projects.value = data;
          } catch (error) {
            console.error('Error loading data:', error);
          }
        };
  
        onMounted(loadData);
  
        const handleItemClick = (project) => {
          console.log(project);
          // Handle the click event here
          // You could navigate to a different route, open a modal, etc.
        };
  
        return {
          projects,
          handleItemClick
        }
      }
    };
  </script> -->
    
    


    <template>
          <base-layout page-title="Izaber projekat" page-default-back-link="/admin">
          
          <ion-item >
    <ion-label>Button Item</ion-label>
  </ion-item>


            <IonList>
              <IonItem v-for="(project, index) in projects.value" :key="index" @click="handleItemClick(project)">
                <IonLabel>{{ project.ime_projekta }}</IonLabel>
              </IonItem>
            </IonList>
          </base-layout>
      </template>
      
      <script>
        import { ref, onMounted } from 'vue';
        import { IonList, IonItem, IonLabel } from '@ionic/vue';
        // import { supabase } from '../services/supabase'; // change this to your actual path
    import { supabase } from '@/supabase'; 
      
        export default {
          components: {
            IonList,
            IonItem,
            IonLabel
          },
      
          setup() {
            const projects = ref([
              { ime_projekta: 'Mock Project' }
            ]);
      
            const error = ref(null);
      
            const loadData = async () => {
              try {
                const { data, error: loadError } = await supabase.from('Projekti').select('*');
                if (loadError) {
                  throw loadError;
                }
                projects.value = data;
              } catch (loadError) {
                console.error('Error loading data:', loadError);
                error.value = loadError.message;
              }
            };
      
            onMounted(loadData);
      
            const handleItemClick = (project) => {
              console.log(project);
            };
      
            return {
              projects,
              handleItemClick,
              error
            };
          }
        };
      </script>
      