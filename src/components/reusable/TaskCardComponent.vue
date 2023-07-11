<template>
  <ion-card class="my-card" :color="computeCardColor(note)">
    <ion-card-header>
      <ion-card-subtitle> {{ note.homescreen }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>{{ note.kreator }}</ion-card-content>
    <ion-button class="archive-button" fill="clear" @click="$emit('archive-note', note.id)" v-if="!note.isHomescreenArchived">
      <ion-icon :icon="archiveOutline"></ion-icon>
    </ion-button>
    <ion-button class="return-button" fill="clear" @click="$emit('return-note', note.id)" v-else>
      <ion-icon :icon="arrowUndoOutline"></ion-icon> 
    </ion-button>
    <ion-button class="alert-button" fill="clear" @click="$emit('alert-clicked', note)">
      <ion-icon :icon="alertCircleOutline"></ion-icon>
    </ion-button>
    <ion-button class="edit-button" fill="clear" @click="$emit('edit-note', { state: true, note: note })">
      <ion-icon :icon="documentTextOutline"></ion-icon>
    </ion-button>
    <ion-button class="delete-button" fill="clear" @click="$emit('delete-note', note.id)" v-if="note.isHomescreenArchived">
      <ion-icon :icon="trashOutline"></ion-icon>
    </ion-button>
    <ion-button class="assign-button" fill="clear" @click="$emit('assign-note', note.id)" >
      <ion-icon :icon="peopleOutline"></ion-icon>
    </ion-button>
  </ion-card>
</template>

  
<script lang="ts">
import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { alertCircleOutline, documentTextOutline, archiveOutline, trashOutline, arrowUndoOutline, peopleOutline } from 'ionicons/icons';


export default {
  name: 'TaskCardComponent',
  props: ['note', 'computeCardColor'],
  components: {
    IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent
  },
  setup() {
    
    return {
      alertCircleOutline, documentTextOutline, archiveOutline,trashOutline, arrowUndoOutline, peopleOutline
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px; /* adjust as needed */
  margin-left: 0; /* this removes the left margin */
}
</style>