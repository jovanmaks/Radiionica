<!-- CardComponent.vue -->
<template>
  <ion-card class="my-card">
    <ion-card-header>
      <ion-card-title>{{ card.deklaracija }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>{{ card.description }}</ion-card-content>
    <ion-button class="view-button" fill="clear" @click="$emit('view-card', card.name)">
      <ion-icon :icon="documentText"></ion-icon>
    </ion-button>
  </ion-card>
</template>

<script lang="ts">
import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent } from '@ionic/vue';
import { documentText } from 'ionicons/icons';

export default {
  name: 'InventarCardComponent',
  props: ['card'],
  components: {
    IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent
  },
  setup() {
    return {
      documentText,
    }
  }
}
</script>

<style scoped>
</style>
