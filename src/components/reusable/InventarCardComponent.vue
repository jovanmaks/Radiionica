<!-- CardComponent.vue -->
<template>
  <ion-card class="my-card" v-if="card" >
    <ion-card-header>
      <ion-card-title>{{ card.deklaracija }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>{{ card.description }}</ion-card-content>
    <ion-button class="edit-button" fill="clear" @click="$emit('edit-card', card)">
      <ion-icon :icon="documentTextOutline"></ion-icon>
    </ion-button>
    <ion-button class="archive-button" fill="clear" @click="$emit('archive-inventar', card.id)" v-if="!card.isArchived">
      <ion-icon :icon="archiveOutline"></ion-icon>
    </ion-button>
    <ion-button class="return-button" fill="clear" @click="$emit('return-inventar', card.id)" v-else>
      <ion-icon :icon="arrowUndoOutline"></ion-icon>
    </ion-button>
    <ion-button class="delete-button" fill="clear" @click="$emit('delete-inventar', card.id)" v-if="card.isArchived">
      <ion-icon :icon="trashOutline"></ion-icon>
    </ion-button>
    <ion-button class="qr-button" fill="clear" @click="$emit('qr-inventar', card.id)" >
      <ion-icon :icon="qrCodeOutline"></ion-icon>
      </ion-button>
  </ion-card>
</template>

<script lang="ts">
import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent } from '@ionic/vue';
import { documentTextOutline, archiveOutline, trashOutline, qrCodeOutline, arrowUndoOutline } from 'ionicons/icons';

export default {
  name: 'InventarCardComponent',
  props: ['card'],

  components: {
    IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent
  },
  setup() {
    return {
      documentTextOutline,
      archiveOutline,
      trashOutline,
      arrowUndoOutline,
      qrCodeOutline,
    }
  }
}
</script>

<style scoped>
</style>
