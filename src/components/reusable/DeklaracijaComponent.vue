<template>
    <ion-input 
      type="text" 
      v-model="inputText"
      placeholder="Enter text here">
    </ion-input>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from "vue";
  
  export default defineComponent({
    name: "DeklaracijaComponent",
    setup() {
      const inputText = ref("");
  
      return {
        inputText
      };
    },
  });
  </script>
  