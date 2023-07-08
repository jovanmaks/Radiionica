

<template>
  <ion-page>
    <!-- <app-header :title="pageTitle" @back="$router.back()" @signOut="signOut">
      <slot name="actions-end" slot="actions-end"></slot>
    </app-header> -->

    <ion-content>
      <slot name="content"></slot>
    </ion-content>

    <app-footer></app-footer>

  </ion-page>
</template>

<script>

import AppHeader from "./HeaderLayout.vue";
import AppFooter from "./FooterLayout.vue";
import CustomModal from "../reusable/addingTasks.vue";

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonBadge,
  IonItem,
  IonPage,
  toastController,
  loadingController,
  IonTitle,
  IonButton,
  IonButtons,
} from "@ionic/vue";

import { checkmark, close, logOutOutline } from "ionicons/icons";

import { Browser } from "@capacitor/browser";
import { isPlatform } from "@ionic/vue";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ExploreContainer from "@/components/ExploreContainer.vue";

import { store } from "@/store"; // Adjust the path according to your project structure
import { useStore } from "vuex";
import { computed } from 'vue';

export default defineComponent({
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    // AppHeader,
    AppFooter,

    IonPage,
    IonContent,
  },

  setup() {
    const store = useStore();
    const user = computed(() => store.state.user.user);
    const username = computed(() => store.state.user.username);
    const router = useRouter();
    const routeName = router.currentRoute.value.name;
    const isOpenRef = ref(false);
    const setOpen = (state) => (isOpenRef.value = state);
    const usernew = ref(supabase.auth.getUser())

    const navigateTo = (route) => {
      setTimeout(() => {
        router.push(route);
      }, 0);
    };

    const confirmChanges = async () => {
      setOpen(false);
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

    return {
      signOut, user, username, routeName, isOpenRef,
      setOpen, confirmChanges, 
      usernew, checkmark,
      close, 
      navigateTo, 
      logOutOutline
    };
  },
});
</script>

<style scoped>
/* .logout-button {
  position: absolute;
  right: 10px;
} */


ion-col {
  /* background-color: #135d54; */
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>


