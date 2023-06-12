<template>
  <base-layout page-title="Home" page-default-back-link="/admin" >
    <template v-slot:content>

        <ion-fab slot="fixed" vertical="top" horizontal="start" >
                <ion-fab-button size="small" color="dark">
                  <ion-icon :icon="hammer"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="bottom">
                  
                  <router-link to="/crtanje">
                    <ion-fab-button size="small">
                      <ion-icon :icon="brush"></ion-icon>
                    </ion-fab-button>
                  </router-link>

                  <router-link to="/programiranje">
                    <ion-fab-button size="small">
                      <ion-icon :icon="desktop"></ion-icon>
                    </ion-fab-button>
                  </router-link>

                  <ion-fab-button>
                    <ion-icon :icon="layers"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="cut"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="create"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="colorFill"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="extensionPuzzle"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
                <ion-fab-list side="end">
                  <ion-fab-button>
                    <ion-icon :icon="cash"></ion-icon>
                  </ion-fab-button>
                 
                  <ion-fab-button>
                    <ion-icon :icon="car"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="camera"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="checkmarkDone"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>

        <ion-fab slot="fixed" vertical="bottom" horizontal="start" >
                  

                <ion-fab-button size="small" color="dark">
                  <ion-icon :icon="easel"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                  <ion-fab-button>
                    <ion-icon :icon="add"></ion-icon>
                  </ion-fab-button>
                  <router-link to="/select">
                  <ion-fab-button size="small">
                    <ion-icon :icon="list"></ion-icon>
                  </ion-fab-button>
                  </router-link>
                </ion-fab-list>
              </ion-fab>
              
        <ion-fab slot="fixed" vertical="bottom" horizontal="center" >
                <ion-fab-button size="small" color="dark">
                  <ion-icon :icon="library"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                  <router-link to="/napraviprojekat">
                    <ion-fab-button size="small">
                      <ion-icon :icon="add"></ion-icon>
                    </ion-fab-button>
                  </router-link>
                  <router-link to="/projektistanje">
                    <ion-fab-button size="small">
                      <ion-icon :icon="list"></ion-icon>
                    </ion-fab-button>
                  </router-link>
                </ion-fab-list>
              </ion-fab>
        
        <ion-fab slot="fixed" vertical="bottom" horizontal="end" >
                <ion-fab-button size="small" color="dark">
                  <ion-icon :icon="server"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                  <router-link to="/magacinStanje">
                    <ion-fab-button size="small">
                      <ion-icon :icon="folder"></ion-icon>
                    </ion-fab-button>
                  </router-link>
                  <ion-fab-button>
                    <ion-icon :icon="construct"></ion-icon>
                  </ion-fab-button>
                  <ion-fab-button>
                    <ion-icon :icon="cart"></ion-icon>
                  </ion-fab-button>
                </ion-fab-list>
              </ion-fab>
  
    </template>
  </base-layout>
</template>
  
  <script  lang="js">

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
      IonRouterOutlet,
      IonFab, 
      IonFabButton,
          IonFabList,
    } from '@ionic/vue';
    import { 
    ellipse,
    square,
    triangle,
    star ,
    library,
    hammer,
    server,
    easel,
    add,
    build,
    construct,
    folder,
    cash,
    brush,
    desktop,
    layers,
    cut,
    extensionPuzzle,
    colorFill,
    create,
    cart,
    camera,
    car,
    checkmarkDone,
    list,
  } from 'ionicons/icons';


  export default{
        name: 'HomePage',
        components: {
          IonFab, 
          IonFabButton,
          IonFabList,
          IonIcon,
            // RouterLink
            // IonList, IonTitle,IonItem, IonTabBar,IonMenu, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
        },
        setup() 
        {
            // const router = useRouter();
            
            return{
              library,
              hammer,
              server,
              easel,
              add,
              build,
              construct,
              folder,
              cash,
              brush,
              desktop,
              layers,
              cut,
              colorFill,
              extensionPuzzle,
              create,
              cart,
              camera,
              car,
              checkmarkDone,
              list,
            }
        },
    };

  </script>
  



<!-- 
        <ion-grid >
          <ion-row>
            <ion-col  size="auto">
              <ion-button expand="full" color="dark" size="large" type="submit" fill="solid">
              <ion-icon slot="start" :icon="library"></ion-icon>
            </ion-button>
           
            </ion-col>
          </ion-row>
          
          <ion-row>
            <ion-col size="auto">
              <ion-button expand="full" color="dark" size="small" type="submit" fill="solid">
              <ion-icon slot="start" :icon="hammer"></ion-icon>  
                Zadaci  
              </ion-button>
              
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size ="5">
              <ion-button  expand="full" color="dark" size="small" type="submit" fill="solid">
              <ion-icon slot="start" :icon="server"></ion-icon>
                Inventar
              </ion-button>
            </ion-col>
          </ion-row>


          <ion-row>
            <ion-col size="5">
              <ion-button  expand="full" color="dark" size="small" type="submit" fill="solid">
              <ion-icon slot="start" :icon="easel"></ion-icon>
                Tabla
              </ion-button>
            </ion-col>
          </ion-row>

        </ion-grid> -->
