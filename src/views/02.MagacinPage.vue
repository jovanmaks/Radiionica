<!-- <template>
    <base-layout page-title="Magacin" page-default-back-link="/tabs">
      <template v-slot:content>
        <div v-for="page in pages" :key="page.name">
          <router-link :to="`/${page.route}`">
            <ion-button color="dark" size="large" type="submit" fill="solid">{{ page.name }}</ion-button>
          </router-link>
        </div>
        <div class="add-button-container">
          <ion-button @click="presentAlert" color="dark" size="large" fill="solid">
            Add New Page
          </ion-button>
        </div>
      </template>
    </base-layout>
    <ion-alert
      v-if="showAlert"
      header="Please enter your info"
      :buttons="alertButtons"
      :inputs="alertInputs"
      @ionAlertDidDismiss="handleAlertDismiss"
    ></ion-alert>
  </template>
  
  <script lang="ts">
  import { OverlayEventDetail } from '@ionic/core';
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
      showAlert: false,
    };
  },
    methods: {
        presentAlert() {
      this.showAlert = true;
    },
    handleAlertDismiss(event: CustomEvent<OverlayEventDetail>) {
      const detail = event.detail;
      if (detail.role === 'ok') {
        // add new page logic here
      }
      this.showAlert = false;
    },
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
  </style> -->








  <!-- <template>
    <base-layout page-title="Magacin" page-default-back-link="/tabs">
      <template v-slot:content>
        <ion-card v-for="page in pages" :key="page.name">
          <ion-card-header>
            <ion-card-title>{{ page.name }}</ion-card-title>
          </ion-card-header>
  
          <ion-card-content>
            <router-link :to="`/${page.route}`">
              <ion-button color="dark" fill="outline">Enter Page</ion-button>
            </router-link>
            <ion-button color="dark" fill="outline" @click="deletePage(page.name)">Delete Card</ion-button>
            <ion-button color="dark" fill="outline">Add Element</ion-button>
          </ion-card-content>
        </ion-card>
  
        <div class="add-button-container">
          <ion-button @click="presentAlert" color="dark" size="large" fill="solid">
            Add New Page
          </ion-button>
        </div>
      </template>
    </base-layout>
  
    <ion-alert
      v-if="showAlert"
      header="Please enter your info"
      :buttons="alertButtons"
      :inputs="alertInputs"
      @ionAlertDidDismiss="handleAlertDismiss"
    ></ion-alert>
  </template>
  
  <script lang="ts">
  import { OverlayEventDetail } from '@ionic/core';
  import { IonAlert, IonButton } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  
  interface Page {
    name: string;
    route: string;
  }
  
  export default defineComponent({
    name: 'MagacinPage',
    components: {
      IonAlert,
      IonButton,
    },
  
    setup() {
      const alertButtons = [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'ok'
        }
      ];
      const alertInputs = [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Page name'
        }
      ];
  
      return { alertButtons, alertInputs };
    },
  
    data() {
      return {
        pages: [] as Page[],
        showAlert: false,
      };
    },
  
    methods: {
      presentAlert() {
        this.showAlert = true;
      },
  
      handleAlertDismiss(event: CustomEvent<OverlayEventDetail>) {
        const detail = event.detail;
        if (detail.role === 'ok' && detail.data) {
          this.addNewPage(detail.data.name);
        }
        this.showAlert = false;
      },
  
      addNewPage(newPageName: string) {
        const newPage = { name: newPageName, route: `newRoute${this.pages.length + 1}` };
        this.pages.push(newPage);
  
        // Save the current state of pages in localStorage
        localStorage.setItem('pages', JSON.stringify(this.pages));
      },
  
      deletePage(pageName: string) {
        this.pages = this.pages.filter(page => page.name !== pageName);
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
  </style> -->



  <template>

  
    <base-layout page-title="Welcome" page-default-back-link="/admin" >
    </base-layout>
    
  
  </template>
    
    <script setup lang="ts">
  
      import { 
        IonList, 
        IonTitle,
        IonItem,
        IonTabBar,
        IonMenu,
        IonTabButton,
        IonTabs,
        IonLabel,
        IonIcon,
        IonPage,
        IonRouterOutlet 
      } from '@ionic/vue';
      import { ellipse, square, triangle,star } from 'ionicons/icons';
  
    </script>