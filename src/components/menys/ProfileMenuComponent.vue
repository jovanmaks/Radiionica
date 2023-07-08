
<template>
    <ion-menu content-id="main-content" menu-id="sideMenu-profile" side="start">
        <form @submit.prevent="updateProfile">
            <div class="logout-button-container">
                <ion-menu-toggle>
                    <ion-button @click="signOut" fill="clear" size="large">
                        <ion-icon :icon="logOutOutline"></ion-icon>
                    </ion-button>
                </ion-menu-toggle>
            </div>
            <ion-list>
                <ion-item>
                    <ion-label>
                        <ion-input v-model="profile.username" placeholder="Корисник"></ion-input>
                    </ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>
                        <ion-input v-model="profile.full_name" placeholder="Име и презиме:"></ion-input>
                    </ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>
                        <h3>Имејл:</h3>
                        <p>{{ profile.email }} </p>
                    </ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>
                        <ion-input v-model="profile.website" placeholder="Вебсајт"></ion-input>
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-button fill="solid" type="submit" color="dark">Сачувај</ion-button>
        </form>

    </ion-menu>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuToggle, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonItem, IonLabel, IonInput, loadingController, toastController } from '@ionic/vue';
import { layersOutline, logOutOutline } from 'ionicons/icons';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import store from '@/store';
import { supabase } from '@/supabase';
import { User } from '@supabase/supabase-js';

export default {
    components: {
        IonMenu,
        IonMenuToggle,
        IonItem,
        IonLabel,
        IonInput,
        IonButton
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        onMounted(async () => {
            await getCurrentSession();
            await getProfile();
        });


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
            const { data: { user } } = await supabase.auth.getUser() as { data: { user: User } };
            const loader = await loadingController.create({});
            const toast = await toastController.create({ duration: 5000 });

            try {
                await loader.present();

                const updates = {
                    id: user.id,  // Only include the id in the updates object
                    username: profile.value.username, // use the updated username
                    full_name: profile.value.full_name,
                    // email: profile.value.email,
                    email: user.email,
                    website: profile.value.website,
                    user_roles: profile.value.user_roles,
                    hour_price: profile.value.hour_price,
                    working_projects: profile.value.working_projects,
                    past_projects: profile.value.past_projects,
                    updated_at: new Date(),
                };
                console.log('id sa updata', user.id);

                const { error } = await supabase.from('profiles').upsert(updates, {});

                if (error) throw error;
            } catch (error: any) {
                toast.message = error.message;
                await toast.present();
            } finally {
                await loader.dismiss();
            }
        };

        const signOut = async () => {
            store.dispatch('user/signOut')
                .then(() => {
                    router.push({ name: "Entrance" });
                })
                .catch((error) => {
                    // handle the error as you see fit
                    console.error("Error signing out:", error);
                });
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

        const session = ref(getCurrentSession().then(session => {
            console.log('Current session:', session)
        }))


        return {
            signOut,
            logOutOutline,
            profile,
            updateProfile
        }
    }
}
</script>

<style scoped>
.button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.logout-button-container {
    display: flex;
    justify-content: flex-end;
}
</style>
