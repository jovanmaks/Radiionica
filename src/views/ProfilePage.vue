
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- <avatar v-model:path="profile.avatar_url" @upload="updateProfile"></avatar> -->
      <form @submit.prevent="updateProfile">
        <ion-item>
          <ion-label>
            <p>Email</p>
            <!-- <p>{{ session.email }}</p> -->
            <!-- <p>{{ session?.  user?.email }}</p> -->
            <!-- <p>{{   user?.email}}</p> -->
            <!-- <p>{{session.user.emai}}</p> -->
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>{{ profile }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Username</ion-label>
          <ion-input type="text" name="username" v-model="profile.username"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Website</ion-label>
          <ion-input type="url" name="website" v-model="profile.website"></ion-input>
        </ion-item>
        <div class="ion-text-center">
          <ion-button fill="clear" type="submit">Update Profile</ion-button>
        </div>
      </form>

      <div class="ion-text-center">
        <ion-button fill="clear" @click="signOut">Log Out</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">


import { store } from '@/store';
import { supabase } from '@/supabase';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
  loadingController,
  IonInput,
  IonItem,
  IonButton,
  IonLabel,
} from '@ionic/vue';
import { User } from '@supabase/supabase-js';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
// import Avatar from '../components/Avatar.vue';
export default defineComponent({
  name: 'AccountPage',
  components: {
    // Avatar,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
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
      website: '',
      user_roles: '',
      // avatar_url: '',
    });


    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser() as { data: { user: User } };
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });
      await loader.present();

      try {

        if (user) {
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, user_roles`)
            .eq('id', user.id)
            .single();

          console.log('userid sa getProfile', user.id)
          console.log(data)

          if (error && status !== 406) throw error;

          if (data) {
            profile.value = {
              username: data.username,
              website: data.website,
              user_roles: data.user_roles,
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
      const { data: { user } } = await supabase.auth.getUser() as { data: { user: User } };
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });

      try {
        await loader.present();
        const updates = {
          id: user.id,
          ...profile.value,
          updated_at: new Date(),
        };
        console.log('id sa updata', user.id)


        // ovo ti je dobro. data ti je null
        const { error } = await supabase.from('profiles').upsert(updates, {
        });
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
        const { data: { session } } = await supabase.auth.getSession()
        // Return the session object
        return session
      } catch (error) {
        // Handle any errors that occur
        console.error(error)
      }
    }


    async function signOut() {
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });
      await loader.present();
      try {
        const { error } = await supabase.auth.signOut();
        router.push({ name: 'Home' });

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



    return { signOut, profile, session, updateProfile };
  },

});

</script>