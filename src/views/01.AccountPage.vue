
<template>
<base-layout page-title="Account" page-default-back-link="/tabs">
    <template v-slot:content>

          <!-- <ion-title>{{profile.username}}</ion-title>
          <ion-title>{{ profile.full_name }}</ion-title> -->

      <ion-list>
        <ion-item>
          <ion-label>
            <h3>Korisnik</h3>
            <p>{{profile.username}}</p>
            </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Ime i prezime:</h3>
            <p>{{profile.full_name}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>email:</h3>
            <p>{{profile.email}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Websajt:</h3>
            <p>{{profile.website}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Satnica:</h3>
            <p>{{profile.hour_price}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Zaduzenja:</h3>
            <p>{{profile.user_roles}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Aktivni projekti:</h3>
            <p>{{profile.working_projects}} </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Predhodni projekt:</h3>
            <p>{{profile.past_projects}} </p>
          </ion-label>
        </ion-item>
      </ion-list>

    <!-- <ion-content> -->
      <!-- <avatar v-model:path="profile.avatar_url" @upload="updateProfile"></avatar> -->
      
      <form @submit.prevent="updateProfile">
      </form>

      <!-- <div class="ion-text-center">
        <ion-button fill="clear" @click="signOut">Log Out</ion-button>
      </div>  -->

    <!-- </ion-content> -->
            
    </template>
  </base-layout>
  
  

</template>
  
  <script lang="ts">

    import { useRouter } from "vue-router";
    import {store} from '@/store';
    import { supabase} from '@/supabase';
    import { User } from '@supabase/supabase-js';

  import {
    defineComponent,
    onMounted,
    ref
  } from 'vue';
  
    import { 
        // IonContent,
        IonList,
        IonTitle,
        IonItem,
        IonTabBar,
        IonMenu,
        IonTabButton,
        IonTabs,
        IonLabel,
        IonIcon,
        IonPage,
        IonRouterOutlet ,
        toastController,
        loadingController,
    } from '@ionic/vue';
    import { ellipse, square, triangle, star } from 'ionicons/icons';


    export default{
        name: 'AccountPage',
        components: {
            // IonContent,
        IonList,
        // IonTitle,
        IonItem,
        // IonTabBar,
        // IonMenu,
        // IonTabButton,
        // IonTabs,
        IonLabel,
        // IonIcon,
        // IonPage,
        // IonRouterOutlet ,
        // toastController,
        // loadingController,
        },
        setup() {
      const router = useRouter();

      onMounted(async () => {
        await getCurrentSession();
        await getProfile();
      });

      interface User {
        id: string;
        // username: string;
        // Add any other properties you expect on the user object
      }

      const profile = ref({
        username: '',
        full_name: '',
        email: '',
        website: '',
        user_roles: '',
        hour_price: '',
        working_projects: '',
        past_projects: '',
        // avatar_url: '',
      });


      async function getProfile() {
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser() as {
          data: {
            user: User
          }
        };
        const loader = await loadingController.create({});
        const toast = await toastController.create({
          duration: 5000
        });
        await loader.present();

        try {

          if (user) {
            const {
              data,
              error,
              status
            } = await supabase
              .from('profiles')
              .select(`username, full_name, email, website, user_roles, hour_price, working_projects, past_projects`)
              .eq('id', user.id)
              .single();

            console.log('userid sa getProfile', user.id)
            console.log(data)

            if (error && status !== 406) throw error;

            if (data) {
              profile.value = {
                username: data.username,
                full_name: data.full_name,
                email: data.email,
                website: data.website,
                user_roles: data.user_roles,
                hour_price: data.hour_price,
                working_projects: data.working_projects,
                past_projects: data.past_projects,
              };
            }
          } else {
            throw new Error('No user logged in.');
          }

        } catch (error: any) {
          toast.message = error.message;
          await toast.present();
        } finally {
          await loader.dismiss();
        }
      }



      const updateProfile = async () => {
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser() as {
          data: {
            user: User
          }
        };
        const loader = await loadingController.create({});
        const toast = await toastController.create({
          duration: 5000
        });

        try {
          await loader.present();
          const updates = {
            id: user.id,
            ...profile.value,
            updated_at: new Date(),
          };
          console.log('id sa updata', user.id)


          // ovo ti je dobro. data ti je null
          const {
            error
          } = await supabase.from('profiles').upsert(updates, {});
          //
          if (error) throw error;
        } catch (error: any) {
          toast.message = error.message;
          await toast.present();
        } finally {
          await loader.dismiss();
        }
      };



      async function getCurrentSession() {

        try {
          // Call the getSession() function to get the user's authentication session
          const {
            data: {
              session
            }
          } = await supabase.auth.getSession()
          // Return the session object
          return session
        } catch (error) {
          // Handle any errors that occur
          console.error(error)
        }
      }


      async function signOut() {
        const loader = await loadingController.create({});
        const toast = await toastController.create({
          duration: 5000
        });
        await loader.present();
        try {
          const {
            error
          } = await supabase.auth.signOut();
          router.push({
            name: 'Home'
          });

          if (error) throw error;
        } catch (error: any) {
          toast.message = error.message;
          await toast.present();
        } finally {
          await loader.dismiss();
        }
      }

      // Call the getCurrentSession() function and log the result to the console
      const session = ref(getCurrentSession().then(session => {
        console.log('Current session:', session)
      }))



      return {
        signOut,
        profile,
        session,
        updateProfile
      };
    },

  };


  </script>