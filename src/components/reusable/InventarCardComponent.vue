<template>
    <ion-card class="my-card" :color="computeCardColor(note)">
      <ion-card-header>
        <ion-card-subtitle> {{ note.homescreen }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>{{ note.kreator }}</ion-card-content>
      <ion-button class="archive-button" fill="clear" @click="$emit('archive-note', note.id)" v-if="!note.isHomescreenArchived">
        <ion-icon :icon="archive"></ion-icon>
      </ion-button>
      <ion-button class="return-button" fill="clear" @click="$emit('return-note', note.id)" v-else>
        <ion-icon :icon="arrowUndo"></ion-icon> 
      </ion-button>
      <ion-button class="alert-button" fill="clear" @click="$emit('alert-clicked', note)">
        <ion-icon :icon="alertCircle"></ion-icon>
      </ion-button>
      <ion-button class="edit-button" fill="clear" @click="$emit('set-open-edit', { state: true, note: note })">
        <ion-icon :icon="documentText"></ion-icon>
      </ion-button>
      <ion-button class="delete-button" fill="clear" @click="$emit('delete-note', note.id)" v-if="note.isHomescreenArchived">
        <ion-icon :icon="trash"></ion-icon>
      </ion-button>
    </ion-card>
  </template>
  
    
  <script lang="ts">
  import { IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent } from '@ionic/vue';
  import { alertCircle, documentText, archive, trash, arrowUndo } from 'ionicons/icons';
  
  export default {
    name: 'TaskCardComponent',
    props: ['note', 'computeCardColor'],
    components: {
      IonIcon, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardContent
    },
    setup() {
      
  
  // }
  
      return {
        alertCircle, documentText, archive,trash, arrowUndo
      }
    }
  }
  </script>