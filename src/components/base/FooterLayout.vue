<template>
  <ProfileMenu ref="sideMenu-profile" />

  <ion-footer>
    <ion-toolbar>
      <ion-button slot="start" fill="solid" tab="pocetna" @click="navigateTo('/home')" color="medium">
        <ion-icon :icon="home"></ion-icon>
      </ion-button>

      <center>
        <ion-button color="medium">
          <ion-icon :icon="searchOutline"></ion-icon>
        </ion-button>
      </center>

      <ion-button slot="end" fill="solid" tab="account" @click="navigateTo('/account')" color="medium">
        <ion-icon :icon="person"></ion-icon>
      </ion-button>
      <ion-button slot="end" fill="solid" tab="account" @click="() => openMenu('sideMenu-profile')" color="medium">
        <ion-icon :icon="person"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-footer>
</template>
  
<script lang="ts">
import ProfileMenu from '@/components/menys/ProfileMenuComponent.vue';
import { IonMenu } from '@ionic/vue';
import { menuController } from '@ionic/vue';
import {
  IonFooter,
  IonToolbar,
  IonButton,
} from "@ionic/vue";
import {
  home,
  person,
  documentAttachOutline,
  searchOutline,
} from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonFooter,
    IonToolbar,
    IonButton,
    ProfileMenu,
  },
  setup() {
    const router = useRouter();
    const navigateTo = (route: string) => {
      setTimeout(() => {
        router.push(route);
      }, 0);
    };


    const openMenu = async (menuId: string) => {
      await menuController.enable(true, menuId);
      await menuController.open(menuId);
    };


    return {
      navigateTo,
      openMenu,
      home,
      person,
      searchOutline,
    };
  },
});
</script>