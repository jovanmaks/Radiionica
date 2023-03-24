<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

 <!-- <script > -->
<!-- <script > -->
<script stup lang="ts">
import { IonApp, IonRouterOutlet,useIonRouter } from '@ionic/vue';
import MenyPage from './views/MenyPage.vue';
import { defineComponent, ref } from 'vue'


import { store } from './store'
import { supabase } from './supabase'
import { Session } from 'inspector';


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

//       async function getCurrentSession() {
//       try {
//       // Call the getSession() function to get the user's authentication session
//       const { data: { session } } = await supabase.auth.getSession()
//       // Return the session object
//       return session
//       } catch (error) {
//         // Handle any errors that occur
//       console.error(error)
//        }
//       }

//     // Call the getCurrentSession() function and log the result to the console
//     const session = ref (getCurrentSession().then(session => {
//       console.log('Current session:', session)
//     }))



//       async function getCurrentUser() {
//         try {
//         // Call the getSession() function to get the user's authentication session
//         const { data: { session } } = await supabase.auth.getSession()

//         // Extract the user object from the session using destructuring assignment
    

//         //////// OVDJE KAZE DA MI JE SESIJA NULL
//         const { user } = session as any
//     // const { user } = session 
    
//     // Return the user object
//     return user
//   } catch (error) {
//     // Handle any errors that occur
//     console.error(error)
//   }
// }

// const user = ref (getCurrentUser().then(user => {
//   console.log('Current user:', user)
// }))

//       // store.user =  user;

//       // store.user = supabase.auth.user()
//       // store.user =  user
//       // ?? {}
//       console.log(session)

//      store.user =  supabase.auth.onAuthStateChange((_, session) => {
//         store.user = session?.user ?? {}
//         if (session?.user) {
//           router.replace('/account')
//         }
//       })
//     },
//   })

</script>
