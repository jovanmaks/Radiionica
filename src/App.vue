<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script stup lang="ts">
import { IonApp, IonRouterOutlet,useIonRouter } from '@ionic/vue';
import MenyPage from './views/MenyPage.vue';
import { defineComponent } from 'vue'


import { store } from './store'
import { supabase } from './supabase'

console.log('OVDJE-start');
console.log(supabase.auth.admin );
console.log(supabase.auth.getUser() );
console.log('OVDJE-end');

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});

// export default defineComponent({
//     name: 'App',
//     components: {
//       IonApp,
//       IonRouterOutlet,
//     },
//     setup() {
//       const router = useIonRouter()
//       store.user = supabase.auth.user ?? {}
//       supabase.auth.onAuthStateChange((_, session) => {
//         store.user = session?.user ?? {}
//         if (session?.user) {
//           router.replace('/account')
//         }
//       })
//     },
//   })
</script>
