          <!-- <ion-back-button></ion-back-button> -->
<template>
    <ion-page>

      <ion-header>
        <ion-toolbar>
        
          <!-- <ion-router-outlet></ion-router-outlet> -->
          <ion-buttons slot="start">
            <ion-back-button
              :default-href="pageDefaultBackLink">
            </ion-back-button>

            <!-- <ion-button fill="solid" tab="activity"  href="/activity" > </ion-button>  -->

          </ion-buttons> 
          

          <ion-title>{{ pageTitle }}</ion-title>
          
          <ion-buttons slot="end">
            <slot name="actions-end"></slot>

            <!-- <ion-button fill="solid" tab="search"  href="/search" > 
            </ion-button>  -->

            <ion-button fill="clear" @click="signOut">Log Out</ion-button>
            
            <!-- <ion-button fill="outline" tab="meny"  href="/meny" > </ion-button>  -->

             <ion-menu-button auto-hide="false" tab="meny" href="/meny" >
             </ion-menu-button>

          </ion-buttons>

        </ion-toolbar>
      </ion-header>
      
      <ion-content>

        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Ponuda && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Ponuda</ion-button>
          </div>

          <div v-if="selectedLabels.Crtanje && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid" >Crtanje</ion-button>
          </div>

          <div v-if="selectedLabels.Programiranje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Programiranje</ion-button>
          </div>
        </div>
          
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.PripremaZaSjecenje && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Prip(sjecenje)</ion-button>
          </div>

          <div v-if="selectedLabels.Sjecenje && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid">Sjecenje</ion-button>
          </div>
        </div>
          
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.PripremaZaFarbanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Prip(farbanje)</ion-button>
          </div>

          <div v-if="selectedLabels.Farbanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Farbanje</ion-button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Sklapanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Sklapanje</ion-button>
          </div>

          <div v-if="selectedLabels.Predaja && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Predaja</ion-button>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Transport && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Transport</ion-button>
          </div>

          <div v-if="selectedLabels.Fotografisanje && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid">Fotografisanje</ion-button>
          </div>
        </div>

        
        <div style="display: flex; justify-content: space-between;">
          <div v-if="selectedLabels.Nabavka && routeName === 'Welcome' " class="ion-text-left">
            <ion-button color="dark" size="large" type="submit" fill="solid">Nabavka</ion-button>
          </div>

          <div v-if="selectedLabels.Alati && routeName === 'Welcome' " class="ion-text-right">
            <ion-button color="dark" size="large" type="submit" fill="solid">Alati</ion-button>
          </div>

          <div v-if="selectedLabels.Magacin && routeName === 'Welcome' " class="ion-text-center">
            <ion-button color="dark" size="large" type="submit" fill="solid" :router-link="{ path:'/magacin'}">
              Magacin
            </ion-button>
          </div>
        </div>

      
        <slot name="content"></slot>
        

        <ion-grid>
          <ion-row>
            <ion-col size="6" :key="photo" v-for="photo in photos">
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- <ion-fab> markup  -->
        
          <!-- <qrcode :value="qrValue" :options="{ size: 200 }"></qrcode> -->
          <qrcode-reader @decode="onDecode" @init="onInit"></qrcode-reader>
          <!-- <qrcode-stream @init="onInit"></qrcode-stream> -->



      </ion-content>


      <!-- <ion-content>
        <slot />
      </ion-content> -->
     
      <ion-footer>
        <ion-toolbar>

          <ion-button  slot="start" fill="solid" tab="pocetna"  href="/pocetna">Pocetna</ion-button>


          <center>
            <ion-button fill="solid" tab="qr" @click="toggleScanner">QR</ion-button>
            <div v-if="showScanner">
              <qrcode-reader @decode="onDecode" @init="onInit"></qrcode-reader>
            </div>

              <!-- <ion-button  fill="solid" tab="qr"  href="/qr">QR</ion-button> -->
              <!-- <ion-button  fill="solid" tab="photogalery"  href="/photogalery">Photo</ion-button> -->
              <ion-button  fill="solid" @click="takePhoto"> Photo</ion-button>
          </center>
          
          
          <ion-button  slot="end" fill="solid" tab="profile"  href="/profile">Profil</ion-button>

        </ion-toolbar>
      </ion-footer>


    </ion-page>
  </template>
  
  
  <!-- <script lang="ts" > -->
   <script   >
  import {
    IonPage,
    toastController,
    loadingController,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButton,
    IonButtons,
  } from "@ionic/vue";

  import { 
    ellipse, 
    square,
    triangle,
    star, 
    } from 'ionicons/icons';

    import { defineComponent, ref} from 'vue';
    import { useRouter } from "vue-router";
    import { supabase } from '@/supabase';
    import ExploreContainer from '@/components/ExploreContainer.vue';

    import { camera, trash, close } from 'ionicons/icons';
    import { usePhotoGallery,UserPhoto } from '@/composables/usePhotoGallery';
    
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
    import QRCode from "qrcode.vue";
    import QrcodeReader from "vue-qrcode-reader";
    // import VueQrcodeReader from "vue-qrcode-reader";
    

    import { Browser } from '@capacitor/browser';
    import { isPlatform } from '@ionic/vue';

    import { onMounted } from 'vue';

    import { User } from '@supabase/supabase-js';



  export default {
    props: ["pageTitle", "pageDefaultBackLink"],
    components: {
      // QrcodeStream,
      // QrcodeDropZone,
      // QrcodeCapture,

      QrcodeReader,
      // QRCode,

      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonBackButton,
      IonButton,
      IonButtons,
      
    },
    
   

    setup(){
      


      const router = useRouter();
      const routeName = router.currentRoute.value.name;

      const selectedLabels = ref({
        Ponuda: false,
        Crtanje: false,
        Programiranje: false,
        PripremaZaSjecenje: false,
        Sjecenje: false,
        PripremaZaFarbanje: false,
        Farbanje: false,
        Sklapanje: false,
        Predaja: false,
        Transport: false,
        Fotografisanje: false,
        Nabavka: false,
        Magacin: false,
        Alati: false,
      });
      

      async function fetchUserMetadata() {
          const {
            data: { user },
          } = await supabase.auth.getUser()
  // if (error) {
  //   console.error("Error fetching user metadata:", error);
  //   return;
  // }

      Object.keys(selectedLabels.value).forEach((key) => {
        selectedLabels.value[key] = user.user_metadata.selectedLabels[key];
        });
      // selectedLabels.value.Ponuda = user.user_metadata.selectedLabels.Ponuda;
}

      onMounted(() => {
        fetchUserMetadata();
        const urlParams = new URLSearchParams(window.location.search);
        const qrCodeContent = urlParams.get('qrCodeContent');

    if (qrCodeContent) {
      checkQRCodeInDatabase(qrCodeContent);
      }
    });


    const openScannerInBrowser = async () => {
    const scannerUrl = 'your-scanner-url'; // Replace with your QR scanner URL
    await Browser.open({ url: scannerUrl });
    };

      const showScanner = ref(false);

      const toggleScanner = () => {
  if (isPlatform('capacitor')) {
    openScannerInBrowser();
  } else {
    showScanner.value = !showScanner.value;
  }
};


// const onDecode = (content: string) => {
const onDecode = (content) => {
  console.log('Decoded content:', content);
  checkQRCodeInDatabase(content);

  // If running on a mobile device, close the scanner window and navigate back to the app
  if (isPlatform('capacitor')) {
    const returnUrl = 'your-app-url'; // Replace with your app's URL
    const encodedContent = encodeURIComponent(content);
    window.location.href = `${returnUrl}?qrCodeContent=${encodedContent}`;
  }
};

    // const onInit = (promise: Promise<any>) => {
    const onInit = (promise) => {
      promise
        .then(() => {
          console.log('Scanner initialized.');
        })
        .catch((error) => {
          console.error('Error initializing scanner:', error);
        });
    };

    // const checkQRCodeInDatabase = async (qrCodeContent: string) => {
    const checkQRCodeInDatabase = async (qrCodeContent) => {
      try {
        const { data, error } = await supabase
          .from('your-table-name')
          .select('*')
          .eq('qr_code_content', qrCodeContent);

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        if (data.length === 0) {
          console.log('QR code not found in the database.');
        } else {
          console.log('QR code found:', data[0]);
        }
      } catch (err) {
        console.error('Error querying the database:', err);
      }
    };



//   async checkQRCodeInDatabase(qrCodeContent) {
//   try {
//     const { data, error } = await supabase
//       .from('your-table-name')
//       .select('*')
//       .eq('qr_code_content', qrCodeContent);

//     if (error) {
//       console.error('Error fetching data:', error);
//       return;
//     }

//     if (data.length === 0) {
//       console.log('QR code not found in the database.');
//     } else {
//       console.log('QR code found:', data[0]);
//     }
//   } catch (err) {
//     console.error('Error querying the database:', err);
//   }
// }



    



       const { photos, takePhoto } = usePhotoGallery();

      // const routeName = computed(() => router.name);
      
      // watch(router, () => {
      // routeName.value = router.name;
      // });

      // const routeName = computed(() => router.name);
      // console.log('imeeeee',routeName);
      console.log('imeeeeee' , routeName);

      async function signOut() {
        const loader = await loadingController.create({});
        const toast = await toastController.create({ duration: 5000 });
        await loader.present();
        try {
          const { error } = await supabase.auth.signOut();
          router.push( {name: 'Home'});

          if (error) throw error;
        // } catch (error: any) {
        } catch (error) {
          toast.message = error.message;
          await toast.present();
        } finally {
          await loader.dismiss();
        }
      }
      return {signOut, takePhoto, photos,  onDecode, onInit, showScanner, toggleScanner, selectedLabels, routeName  };
    },


  };
  </script>