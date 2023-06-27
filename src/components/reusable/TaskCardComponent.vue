<template>
  <ion-card class="my-card" :color="computeCardColor(note)">
    <div v-if="!note.isHomescreenArchived">
      <ion-card-header>
        <ion-card-subtitle> {{ note.homescreen }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>{{ note.kreator }}
      </ion-card-content>
      <ion-button class="archive-button" fill="clear" @click="$emit('archive-note', note.id)">
        <ion-icon :icon="archive"></ion-icon>
      </ion-button>
      <!-- <ion-button class="alert-button" fill="clear" @click="$emit('set-open', {state: true, note: note})">
          <ion-icon :icon="alertCircle"></ion-icon>
        </ion-button> -->
      <ion-button class="alert-button" fill="clear" @click="$emit('alert-clicked', note)">
        <ion-icon :icon="alertCircle"></ion-icon>
      </ion-button>
      <!-- <ion-button class="alert-button" fill="clear" @click="alertClicked">
        <ion-icon :icon="alertCircle"></ion-icon>
      </ion-button> -->

      <ion-button class="edit-button" fill="clear" @click="$emit('set-open-edit', { state: true, note: note })">
        <ion-icon :icon="documentText"></ion-icon>
      </ion-button>
    </div>
  </ion-card>
</template>
  
<script lang="ts">
import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { alertCircle, documentText, archive } from 'ionicons/icons';

export default {
  name: 'TaskCardComponent',
  props: ['note', 'computeCardColor'],
  components: {
    IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent
  },
  setup() {
    

    const alertClicked = () => {
    console.log('Alert button clicked');
    // Emit the alert-clicked event here
}

    return {
      alertCircle, documentText, archive,
      alertClicked
    }
  }
}
</script>


  