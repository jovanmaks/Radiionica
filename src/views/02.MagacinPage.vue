<template>
    <base-layout page-title="Magacin" page-default-back-link="/tabs">
      <template v-slot:content>
        <div v-for="page in pages" :key="page.name">
          <router-link :to="`/${page.route}`">
            <ion-button color="dark" size="large" type="submit" fill="solid">{{ page.name }}</ion-button>
          </router-link>
        </div>
        <div class="add-button-container">
          <ion-button @click="addNewPage('New Page')" color="dark" size="large" fill="solid">
            <ion-alert
                trigger="present-alert"
                header="Please enter your info"
                :buttons="alertButtons"
                :inputs="alertInputs"
                ></ion-alert>
            <!-- <ion-icon :icon="addIcon"></ion-icon> -->
            
          </ion-button>
        </div>
      </template>
    </base-layout>
  </template>
  
  <script lang="ts">
  import { IonAlert, IonButton, 
    // IonIcon
} from '@ionic/vue';
  import { add } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  interface Page {
  name: string;
  route: string;
}
  
  export default defineComponent({
    name: 'MagacinPage',
    components: {
      IonAlert,
      IonButton,
    //   IonIcon,
    },

    setup() {
      const alertButtons = ['OK'];
      const alertInputs = [
        {
          placeholder: 'Name',
        },
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Age',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'A little about yourself',
        },
      ];

      return { alertButtons, alertInputs };
    },


    data() {
    return {
      pages: [] as Page[],
      newPageName: '',
      addIcon: add,
    };
  },
    methods: {
      addNewPage(newPageName: string) {
        const newPage = { name: newPageName, route: `newRoute${this.pages.length + 1}` };
        this.pages.push(newPage);
  
        // Save the current state of pages in localStorage
        localStorage.setItem('pages', JSON.stringify(this.pages));
      },
    },
    created() {
      // Fetch pages from localStorage when the component is created
      const savedPages = localStorage.getItem('pages');
      if (savedPages) {
        this.pages = JSON.parse(savedPages);
      }
    },
  });
  </script>
  
  <style scoped>
  .add-button-container {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
  </style>