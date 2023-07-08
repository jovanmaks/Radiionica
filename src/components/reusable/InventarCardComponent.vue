<!-- CardComponent.vue -->
<template>
  <ion-card class="my-card" v-if="card" >
    <ion-card-header>
      <ion-card-title>{{ card.deklaracija }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>{{ card.description }}</ion-card-content>
    <ion-button class="edit-button" fill="clear" @click="$emit('edit-card', card)">
      <ion-icon :icon="documentText"></ion-icon>
    </ion-button>
    <ion-button class="archive-button" fill="clear" @click="$emit('archive-inventar', card.id)" v-if="!card.isArchived">
      <ion-icon :icon="archive"></ion-icon>
    </ion-button>
    <ion-button class="return-button" fill="clear" @click="$emit('return-inventar', card.id)" v-else>
      <ion-icon :icon="arrowUndo"></ion-icon>
    </ion-button>
    <ion-button class="delete-button" fill="clear" @click="$emit('delete-inventar', card.id)" v-if="card.isArchived">
      <ion-icon :icon="trash"></ion-icon>
    </ion-button>
  </ion-card>
</template>

<script lang="ts">
import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent } from '@ionic/vue';
import { documentText, archive, trash, arrowUndo } from 'ionicons/icons';

export default {
  name: 'InventarCardComponent',
  props: ['card'],

  components: {
    IonIcon, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent
  },
  setup() {
    return {
      documentText,
      archive,
      trash,
      arrowUndo,
    }
  }
}
</script>

<style scoped>
</style>
