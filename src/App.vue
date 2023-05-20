<template>
  <!-- <ion-app v-if="appReady"> -->
  
 <ion-app >
    <ion-router-outlet />
  </ion-app>
</template>

<script stup lang="ts">
import { IonApp, IonRouterOutlet,useIonRouter } from '@ionic/vue';
import { defineComponent, ref } from 'vue'

import { store } from './store'
import { supabase } from './supabase'
import { Session } from 'inspector';

  export default defineComponent({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet,
    },
    setup() {
    
      const appReady = ref (null);  

    const user = async () =>{
      const { data: { user } } = await supabase.auth.getUser()
    }
      
      const router = useIonRouter()

      supabase.auth.onAuthStateChange((_, session) => {
  if (session?.user) {
    store.user = session.user;
    router.replace('/entrance');
  } else {
    store.user = {};
  }
});

    },
  })

</script>
